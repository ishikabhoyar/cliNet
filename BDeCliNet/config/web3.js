const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Web3 with BNB Smart Chain provider
const web3 = new Web3(process.env.BSC_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545/');

// Load contract ABI
let contractAbi;
let patientDataRegistry;
let contractAddress;

try {
  // Make the path relative to this file
  const contractPath = path.join(__dirname, '../contracts/PatientDataRegistry.json');
  const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  contractAbi = contractJson.abi;

  // Contract address from environment variables
  contractAddress = process.env.PATIENT_DATA_REGISTRY_ADDRESS;

  // Create contract instance
  patientDataRegistry = new web3.eth.Contract(contractAbi, contractAddress);
} catch (error) {
  console.error('Error loading contract:', error.message);
  // Initialize with empty defaults to prevent further errors
  contractAbi = [];
  patientDataRegistry = null;
}

module.exports = {
  web3,
  patientDataRegistry,
  contractAddress
};