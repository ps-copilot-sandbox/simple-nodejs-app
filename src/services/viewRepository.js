// src/services/viewRepositoryService.js
import dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
dotenv.config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function viewRepository(org) {
    if (!org) {
        console.warn('Organization name is empty. Returning an empty array.');
        return [];
    }
    try {
        const response = await octokit.rest.repos.listForOrg({
            org,
        });

        return response.data;

    } catch (error) {
        console.error(`Error viewing repositories: ${error.message}`);
        throw error;
    }
}