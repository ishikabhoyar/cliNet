// Import research controller
const researchController = require('../controllers/researchController');

// Research routes
router.post('/researcher/research/create', authMiddleware, researchController.createResearch);
router.get('/researcher/research/projects', authMiddleware, researchController.getResearchProjects);
router.get('/researcher/research/projects/:id', authMiddleware, researchController.getResearchProject);
router.put('/researcher/research/projects/:id', authMiddleware, researchController.updateResearchProject);
router.delete('/researcher/research/projects/:id', authMiddleware, researchController.deleteResearchProject);