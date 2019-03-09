const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");

const notes = require("./notes.js");

yargs.version('1.0.0');

//ADD FUNCTIONALITY
yargs.command({
    command: "add",
    describe: "add notes",
    builder: {
        title: {
            describe: "note's title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "note's body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (args) => {
        //console.log(`(Add Note) Title: ${args.title}`);
        //console.log(`(Add Note) Body: ${args.body} `);
        notes.addNote(args.title,args.body);
    }
});

yargs.command({
    command: "delete",
    describe: "delete notes",
    builder: {
        title: {
            describe: "title to be deleted",
            type: "string",
            demandOption: true
        }
    },
    handler: (argv) => {
        console.log(chalk.yellow.bold(`${argv.title} will be deleted`))
        notes.deleteNote(argv.title);
    }
});

yargs.command({
    command: "list",
    describe: "list all notes",
    handler: () => {
        //console.log("list all notes")
        notes.listNote();
    }
});

yargs.command({
    command: "read",
    describe: "read note",
    builder: {
        title: {
            describe: "note's title",
            type: "string",
            demandOption: true
        }
    },
    handler: (args) => {
        notes.readNote(args.title);
    }
})
//console.log(yargs.argv)
yargs.parse();
//call getNote from notes.js
//const notes = getNote("this is my first message");
//console.log(notes);
//console.log(chalk.green.inverse.bold("success"));

//fs.writeFileSync("note.txt","this is the first line");
//fs.appendFileSync("note.txt","\nthis will be the second line");
