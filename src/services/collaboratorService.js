// services/addCollaboratorService.js
import dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
dotenv.config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function addCollaborator(owner, repo, username, permissions) {
    try {
        const response = await octokit.rest.repos.addCollaborator({
            owner,
            repo,
            username,
            permissions
        });
        
        return response.status;

    } catch (error) {
        console.error(`Error adding collaborator: ${error}`);
    }
}