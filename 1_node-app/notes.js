const fs = require("fs");
const chalk = require("chalk");

getNote = (messages) => {
    return messages;
};

addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) =>note.title === title);
    //debugger;
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes)
        console.log("added new notes")
    }
    else {
        console.log("Note title taken")
    }
}

deleteNote =(title) => {
    const notes = loadNotes();
    const data = notes.filter(note => {
        return note.title !== title;
    });
    if(data.length === notes.length) {
        console.log(chalk.green("no record found"))
    } else {
        console.log(chalk.red("record deleted"))
        saveNotes(data);
    }
     
    
};

listNote = () => {
    const notes = loadNotes();  
    console.log("TITLE");
    notes.forEach(note => {
        console.log(note.title);
    })
}

readNote = (title) => {
    const notes = loadNotes();  
    const data = notes.find((note) => note.title === title);
    console.log(data)
    if(data !== undefined) {
        console.log(`Title: ${data.title}`);
        console.log(`Body: ${data.body}`);
    }
}
saveNotes =(notes) => {
    const jsonString = JSON.stringify(notes);
    fs.writeFileSync("notes.json", jsonString);
}

loadNotes =() => {
    try 
    {
        const jsonBuffer = fs.readFileSync("notes.json");
        const jsonData = jsonBuffer.toString();
        return JSON.parse(jsonData);
    } 
    catch(e) {
        return [];
    }
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    deleteNote: deleteNote,
    listNote: listNote,
    readNote: readNote

}