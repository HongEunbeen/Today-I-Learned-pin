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

async function main() {
    //const stats = await wakatime.getMyStats({ range: RANGE.LAST_7_DAYS });
    await updateGist();
}

// Function to update the gist contents
async function updateGist() {
    let gist;
    try {
        // Get the gist you made using the gist id
        gist = await octokit.gists.get({ gist_id: gistId });
    } catch (error) {
        console.error(`Unable to get gist\n${error}`);
    }
    if (!gist) return;


    //core development
    const lines = [];

    lines.push("🌑");
    lines.push("🌑");
    lines.push("🌑");
    lines.push("🌑");
    
    //if (lines.length == 0) return;

    // Only one file was created, so fetch it's filename
    const filename = Object.keys(gist.data.files)[0];
 
    try {
        // Update the gist
        // The description is displayed when the gist is pinned
        // so we can update the description along with the contents
        // to show more information when it's pinned
        await octokit.gists.update({
            gist_id: gistId,
            files: {
                [filename]: {
                    filename: "Week I Learned ✨",
                    content:  wrapAnsi(lines.join("\n"), 60, { hard: true, trim: false }),
                }
            }
        });
    } catch (error) {
        console.error(`Unable to update gist\n${error}`);
    }
}
 
(async () => {
    await main();
})();