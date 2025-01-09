/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';


import fs from 'fs';
import qr from 'qr-image';

inquirer
    .prompt([
        {
            type: 'input', // Type of question (e.g., input, confirm, list)
            name: 'username', // Key for the response object
            message: 'What is your name?', // Question to display
        },
    ])
    .then((answers) => {
        console.log('User answers:', answers); // Example usage of answers

        var qr_svg = qr.image(answers.username, { type: 'svg' });
        qr_svg.pipe(fs.createWriteStream('i_love_qr.svg'));

        fs.writeFile("message.txt", answers.username, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error('Prompt couldn’t be rendered in the current environment.');
        } else {
            console.error('Something went wrong:', error);
        }
    });

