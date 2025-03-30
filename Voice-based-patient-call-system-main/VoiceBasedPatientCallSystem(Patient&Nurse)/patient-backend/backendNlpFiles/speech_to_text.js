const { exec } = require('child_process');
const path = require('path');

function process_audio_file(audioFilePath) {
    return new Promise((resolve, reject) => {
        const pythonProcess = exec(`python ${path.join(__dirname, 'main.py')} "${audioFilePath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`Python stderr: ${stderr}`);
                return reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
}

module.exports = { process_audio_file };
