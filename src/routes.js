// src/routes.js
import express from 'express';
import { addCollaborator } from './services/collaboratorService.js';
import { viewRepository } from './services/viewRepository.js';
import { createOrgTeam } from './services/createOrgTeam.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/addCollaborator', (req, res) => {
    res.render('addCollaborator');
});

router.post('/addCollaborator', async (req, res) => {
    const { owner, repo, username, permissions } = req.body;

    try {
        const response = await addCollaborator(owner, repo, username, permissions);
        if (response === 201 || response === 204) {
            res.json({ messageType: 'Success', message: 'Collaborator added successfully' });
        }
        else {
            res.json({ messageType: 'Failure', message: 'There has been an error adding the collaborator' });
        }
    } catch (error) {
        console.error(error);
        res.json({ messageType: 'Failure', message: `An error occurred while adding the collaborator: ${error.message}` });
    }
});

router.post('/createOrgTeam', async (req, res) => {
    const { org, name, description, permission, teamNotificationSetting, privacy } = req.body;

    if (!org) {
        return res.render('createOrgTeam', { messageType: 'Failure', message: 'Organization ID is required' });
    }

    console.log(`Received org: ${org}, name: ${name}, description: ${description}, permission: ${permission}, teamNotificationSetting: ${teamNotificationSetting}, privacy: ${privacy}`);

    try {
        const response = await createOrgTeam(org, name, description, permission, teamNotificationSetting, privacy);
        if (response === 201 || response === 204) {
            res.render('createOrgTeam', { messageType: 'Success', message: 'Team created successfully' });
        } else {
            res.render('createOrgTeam', { messageType: 'Failure', message: 'There has been an error creating the team' });
        }
    } catch (error) {
        console.error(error);
        res.render('createOrgTeam', { messageType: 'Failure', message: `An error occurred while creating the team: ${error.message}` });
    }
});

// Ensure the GET route also passes the variables
router.get('/createOrgTeam', (req, res) => {
    res.render('createOrgTeam', { messageType: null, message: null });
});

router.get('/viewRepository', async (req, res) => {
    try {
        const repos = await viewRepository(req.query.organization);
        res.render('viewRepository', { repos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;