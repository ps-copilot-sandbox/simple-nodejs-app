// src/routes.js
import express from 'express';
import { addCollaborator } from './services/collaboratorService.js';
import { viewRepository } from './services/viewRepository.js';

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

// router.get('/viewRepository', (req, res) => {
//     res.render('viewRepository');
// });

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