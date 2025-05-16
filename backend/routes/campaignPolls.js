import express from 'express';
import { createPoll, getCampaignPolls, getPollDetails } from '../controller/CampaignPolls.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new poll (requires auth)
router.post('/', authMiddleware, createPoll);

// Get all polls for a campaign
router.get('/campaign/:campaignId', getCampaignPolls);

// Get single poll details
router.get('/:pollId', getPollDetails);

export default router;