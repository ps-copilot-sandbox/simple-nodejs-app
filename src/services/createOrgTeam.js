// services/createOrgTeam.js
import dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
dotenv.config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function createOrgTeam(org, name, description, permission, notification_setting, privacy) {
    try {
        const response = await octokit.rest.teams.create({
            org,
            name,
            description,
            permission,
            notification_setting,
            privacy
        });

        return response.status;

    } catch (error) {
        console.error(`Error creating team: ${error}`);
        throw error;
    }
}
