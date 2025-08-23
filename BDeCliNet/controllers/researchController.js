const jwt = require('jsonwebtoken');
const db = require('../db');

// Create a new research project
exports.createResearch = async (req, res) => {
  try {
    const { title, description, goals, methodology, expectedOutcomes, fundingAmount, category, duration, keywords } = req.body;
    const researcherId = req.user.id;
    
    // Insert the research project into the database
    const result = await db.query(
      `INSERT INTO research_projects 
      (researcher_id, title, description, goals, methodology, expected_outcomes, funding_amount, category, duration, keywords, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`,
      [
        researcherId, 
        title, 
        description, 
        goals, 
        methodology, 
        expectedOutcomes, 
        fundingAmount, 
        category, 
        duration, 
        keywords, 
        'draft'
      ]
    );
    
    const project = result.rows[0];
    
    res.status(201).json({
      error: false,
      message: 'Research project created successfully',
      projectId: project.id,
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        goals: project.goals,
        methodology: project.methodology,
        expectedOutcomes: project.expected_outcomes,
        fundingAmount: project.funding_amount,
        category: project.category,
        duration: project.duration,
        keywords: project.keywords,
        status: project.status,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        researcherId: project.researcher_id
      }
    });
  } catch (error) {
    console.error('Error creating research:', error);
    res.status(500).json({ error: true, message: 'Server error during project creation' });
  }
};

// Get research project by ID
exports.getResearchProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const researcherId = req.user.id;
    
    const result = await db.query(
      `SELECT * FROM research_projects WHERE id = $1 AND researcher_id = $2`,
      [projectId, researcherId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Research project not found' });
    }
    
    const project = result.rows[0];
    
    // Get feedback if any
    const feedbackResult = await db.query(
      `SELECT f.*, u.name as reviewer_name 
       FROM research_feedback f 
       JOIN users u ON f.reviewer_id = u.id 
       WHERE f.project_id = $1`,
      [projectId]
    );
    
    const feedbacks = feedbackResult.rows.map(row => ({
      id: row.id,
      message: row.message,
      createdAt: row.created_at,
      reviewerId: row.reviewer_id,
      reviewerName: row.reviewer_name
    }));
    
    res.status(200).json({
      error: false,
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        goals: project.goals,
        methodology: project.methodology,
        expectedOutcomes: project.expected_outcomes,
        fundingAmount: project.funding_amount,
        category: project.category,
        duration: project.duration,
        keywords: project.keywords,
        status: project.status,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        researcherId: project.researcher_id,
        feedbacks
      }
    });
  } catch (error) {
    console.error('Error fetching research project:', error);
    res.status(500).json({ error: true, message: 'Server error fetching project' });
  }
};

// Get all research projects for a researcher
exports.getResearchProjects = async (req, res) => {
  try {
    const researcherId = req.user.id;
    const { status, category, sort, search } = req.query;
    
    let query = `SELECT * FROM research_projects WHERE researcher_id = $1`;
    const queryParams = [researcherId];
    
    // Add filters
    if (status) {
      query += ` AND status = $${queryParams.length + 1}`;
      queryParams.push(status);
    }
    
    if (category) {
      query += ` AND category = $${queryParams.length + 1}`;
      queryParams.push(category);
    }
    
    if (search) {
      query += ` AND (title ILIKE $${queryParams.length + 1} OR description ILIKE $${queryParams.length + 1})`;
      queryParams.push(`%${search}%`);
    }
    
    // Add sorting
    if (sort) {
      switch (sort) {
        case 'newest':
          query += ` ORDER BY created_at DESC`;
          break;
        case 'oldest':
          query += ` ORDER BY created_at ASC`;
          break;
        case 'funding_high':
          query += ` ORDER BY funding_amount DESC`;
          break;
        case 'funding_low':
          query += ` ORDER BY funding_amount ASC`;
          break;
        case 'title_az':
          query += ` ORDER BY title ASC`;
          break;
        case 'title_za':
          query += ` ORDER BY title DESC`;
          break;
        default:
          query += ` ORDER BY created_at DESC`;
      }
    } else {
      query += ` ORDER BY created_at DESC`;
    }
    
    const result = await db.query(query, queryParams);
    
    const projects = result.rows.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      fundingAmount: project.funding_amount,
      category: project.category,
      duration: project.duration,
      keywords: project.keywords,
      status: project.status,
      createdAt: project.created_at,
      updatedAt: project.updated_at
    }));
    
    res.status(200).json({
      error: false,
      projects
    });
  } catch (error) {
    console.error('Error fetching research projects:', error);
    res.status(500).json({ error: true, message: 'Server error fetching projects' });
  }
};

// Update a research project
exports.updateResearchProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const researcherId = req.user.id;
    const { title, description, goals, methodology, expectedOutcomes, fundingAmount, category, duration, keywords, status } = req.body;
    
    // Check if project exists and belongs to researcher
    const checkResult = await db.query(
      `SELECT * FROM research_projects WHERE id = $1 AND researcher_id = $2`,
      [projectId, researcherId]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Research project not found' });
    }
    
    // Update the project
    const result = await db.query(
      `UPDATE research_projects 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           goals = COALESCE($3, goals),
           methodology = COALESCE($4, methodology),
           expected_outcomes = COALESCE($5, expected_outcomes),
           funding_amount = COALESCE($6, funding_amount),
           category = COALESCE($7, category),
           duration = COALESCE($8, duration),
           keywords = COALESCE($9, keywords),
           status = COALESCE($10, status),
           updated_at = NOW()
       WHERE id = $11 AND researcher_id = $12
       RETURNING *`,
      [title, description, goals, methodology, expectedOutcomes, fundingAmount, 
       category, duration, keywords, status, projectId, researcherId]
    );
    
    const project = result.rows[0];
    
    res.status(200).json({
      error: false,
      message: 'Research project updated successfully',
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        goals: project.goals,
        methodology: project.methodology,
        expectedOutcomes: project.expected_outcomes,
        fundingAmount: project.funding_amount,
        category: project.category,
        duration: project.duration,
        keywords: project.keywords,
        status: project.status,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        researcherId: project.researcher_id
      }
    });
  } catch (error) {
    console.error('Error updating research project:', error);
    res.status(500).json({ error: true, message: 'Server error updating project' });
  }
};

// Delete a research project
exports.deleteResearchProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const researcherId = req.user.id;
    
    // Check if project exists and belongs to researcher
    const checkResult = await db.query(
      `SELECT * FROM research_projects WHERE id = $1 AND researcher_id = $2`,
      [projectId, researcherId]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: true, message: 'Research project not found' });
    }
    
    // Delete the project
    await db.query(
      `DELETE FROM research_projects WHERE id = $1 AND researcher_id = $2`,
      [projectId, researcherId]
    );
    
    res.status(200).json({
      error: false,
      message: 'Research project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting research project:', error);
    res.status(500).json({ error: true, message: 'Server error deleting project' });
  }
};