import axios from "axios"

export const getAllNotes = () => {
	return axios.get("http://localhost:3001/notes").then((result) => {
		const { data } = result
		console.log(data)
		return data
	})
}

export const createNotes = ({ content, date, important }) => {
	return axios
		.post("http://localhost:3001/notes", { content, date, important })
		.then((response) => {
			const { data } = response
			return data
		})
}
