import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../style/Note.css"
import Note from "./Note"
import CreateNote from "./CreateNote"

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);

    //get text typed and store in inputText
    const handleText = (e) => {
        setInputText(e.target.value)
    };

    //add new note
    const addNote = () => {
        setNotes((prevState) => [
            ...prevState,
            {
                id: uuid(),
                text: inputText
            }
        ]);

        //clear textarea
        setInputText("");
    };

    const deleteNote = (id) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if(Array.isArray(data) && data.length > 0){
            setNotes(data);
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        if(!loading){
            localStorage.setItem("Notes", JSON.stringify(notes))
        }
    }, [notes, loading]);

    return (
        <div className="notes">
            {notes.length > 0 && notes.map((note) => (
                    <Note 
                        key={note.id} 
                        id={note.id} 
                        text={note.text} 
                        deleteNote={deleteNote}
                    />
                ))
            }
            <CreateNote 
                handleText={handleText} 
                addNote={addNote} 
                inputText={inputText}
            />
        </div>
    );
}

export default Notes