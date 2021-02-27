require('dotenv').config()
const { Octokit } = require("@octokit/rest");

// Get the environment variables
const {
    GIST_ID: gistId,
    GH_TOKEN: githubToken,
    DEV_USERNAME: devUsername
} = process.env;

// Authentication
const octokit = new Octokit({
    auth: `token ${githubToken}`
});

// Function to update the gist contents
async function updateGist() {
    let gist;
    try {
        // Get the gist you made using the gist id
        gist = await octokit.gists.get({ gist_id: gistId });
    } catch (error) {
        console.error(`Unable to get gist\n${error}`);
    }

    // Only one file was created, so fetch it's filename
    const filename = Object.keys(gist.data.files)[0];

    try {
        // Update the gist
        // The description is displayed when the gist is pinned
        // so we can update the description along with the contents
        // to show more information when it's pinned
        await octokit.gists.update({
            gist_id: gistId,
            description: `Today I Learned🌈`,
            files: {
                [filename]: {
                    content: `todotodotodot`
                }
            }
        });
    } catch (error) {
        console.error(`Unable to update gist\n${error}`);
    }
}

(async () => {
    await updateGist();
})(); 