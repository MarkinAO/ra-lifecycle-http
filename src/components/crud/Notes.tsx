import { Note } from "./models";

interface NotesProps {
    notes: Note[]
    deleteNote: Function
}

export default function Notes(props: NotesProps) {
    const { notes, deleteNote } = props;

    return(
        <div className="notes-box">
            {
                notes.map(note => {
                    return(
                        <div className="note" key={ note.id }>
                            <p>{ note.content }</p>
                            <span className="note-cross" data-id={ note.id } onClick={() => deleteNote(note.id)}></span>
                        </div>
                    )
                })
            }            
        </div>
        
    )
}