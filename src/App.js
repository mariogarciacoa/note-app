import "./App.css"
import { getAllNotes, createNotes } from "./services"
import { useEffect, useState } from "react"
import { Note } from "./Note"

function App() {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState("")
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		
		getAllNotes().then(result => {
			setNotes( (prevNotes) => prevNotes.concat(result) )
		})
	
	}, [])

	const handleNoteChange = (e) => {
		setNewNote(e.target.value)
	}

	const addNote = (e) => {
		e.preventDefault()

		if (newNote.length !== 0) {
			const noteObject = {
				id: notes.length + 1,
				content: newNote,
				date: new Date().toISOString(),
				important: Math.random() < 0.5,
			}

			setNewNote("")
			createNotes(noteObject)
				.then((newNote) => {
				setNotes( (prevNotes) => prevNotes.concat(newNote))
			})
			
		}

	}

	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>
				Show {showAll ? "Important!" : "All"}
			</button>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} />
				))}
				<form onSubmit={addNote}>
					<input type='text' onChange={handleNoteChange} value={newNote} />
					<button>Create New Note</button>
				</form>
			</ul>
		</div>
	)
}

export default App
