// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
{
    type: "input",
    name: "title",
    message: "what is your project name?"
},
{
    type: "input",
    name: "description",
    message: "Briefing describe your application?"
},
{
    type: "input",
    name: "installation",
    message: "Explain how to install the application"
},
{
    type: "input",
    name: "usage",
    message: "Provide examples how the application is used"
},
{
    type: "list",
    name: "license",
    message: "Which license will you use for your project?",
    choices: ['mit', 'GPLv2', 'Apache', 'no license']
},
{
    type: "confirm",
    name: "confirmContributers",
    message: "Will there be any contributors to this application?",
    default: true
},

{
    type: 'input',
    name: 'contribute',
    message: 'Please provide guidelines for contributing.',

    when: ({ confirmContributers }) => {
        if (confirmContributers) {
            return true;
        } else {
            message: 'No contributions';
         return false;
        }
    },
    validate: contributerInput => {
        if (contributerInput) {
            return true;
        } else {
            return false;
        }
    }
},
{
    type: 'input',
    name: 'test',
    message: 'Provide instructions and examples of how the code is tested:',
},
{
    type: 'input',
    name: 'githubUsername',
    message: 'What is your GitHub Username? (Required)',
},
{
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required)',
},


];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const content = generateMarkdown(data)
    fs.writeFile(fileName, content, data, (err) => {
        if (err) throw err;
    });
    // console.log(`File "${fileName}" has been successfully written.`);
}
// TODO: Create a function to initialize app
async function init() {
    const answers = await inquirer.prompt(questions);

    writeToFile('./FinalOUTPUT/readme.md', answers);
}

// Function call to initialize app
init();
