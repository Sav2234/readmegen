// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require("./utils/generateMarkdown")

// TODO: Create an array of questions for user input
const questions = [
{
type: 'input',
message: "What is your GitHub username?",
name: 'Gusername',
//function to validate answer
validate: function (answer) {
if (answer.length < 1) {
    return console.log("A valid GitHub username is required.");
}
return true;
}
},


{
type: 'input',
message: "What would you like to call your GitHub repo?",
name: 'repository_name',
//function to validate answer
validate: function (answer) {
if (answer.length < 3) {
    return console.log("You must create a valid name for your GitHub repo in order to proceed.");
}
return true;
}
},


{
type: 'input',
message: "What name would you like to give to your project?",
name: 'project_title',
//function to validate answer
validate: function (answer) {
if (answer.length < 3) {
    return console.log("You must create a valid project title in order to proceed.");
}
return true;
}
},


{
type: 'input',
message: "Please write a description for your project.",
name: 'project_description',
//function to validate answer
validate: function (answer) {
if (answer.length < 3) {
    return console.log("You must create a valid project description in order to proceed.");
}
return true;
}
}
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
fs.writeFile(fileName, data, err => {
if (err) {
return console.log(err);
}

console.log("Your README.md file has been created")
});
}

const writeFileAsync = util.promisify(writeToFile);

// Function call to initialize app

async function init() {
try {

// Prompt Inquirer questions
const userResponses = await inquirer.prompt(questions);
console.log("Your responses: ", userResponses);
console.log("Now attempting to pull your GitHub data...");

// Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
console.log()
const markdown = generateMarkdown(userResponses);
console.log(markdown);

// Write markdown to file
await writeFileAsync('READMEex.md', markdown);

} catch (error) {
console.log(error);
}
};

init();