import React from 'react'

export const CreateNote = (): React.ReactElement => {
	const [note, setNote] = React.useState<string>('')
	const handleOnSubmit = (): void => {
		console.log('note', note)
	}

	return (
		<form onSubmit={handleOnSubmit}>
			<input
				value={note}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
				type="text"
				placeholder="Enter your note here"
			/>
			<button type="submit">Add Note</button>
		</form>
	)
}
