import { useState } from 'react'
import { TelegramBot } from 'tele-sdk-js'

const bot = new TelegramBot('YOUR_BOT_TOKEN')

function SendPhotoComponent() {
	const [chatId, setChatId] = useState('')
	const [photoUrl, setPhotoUrl] = useState('')
	const [message, setMessage] = useState('')

	const sendPhoto = async () => {
		try {
			const response = await bot.sendPhoto({
				chat_id: chatId,
				photo: photoUrl,
				caption: message,
			})
			console.log('Photo sent:', response)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div>
			<input
				type='text'
				placeholder='Chat ID'
				value={chatId}
				onChange={e => setChatId(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Photo URL'
				value={photoUrl}
				onChange={e => setPhotoUrl(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Caption'
				value={message}
				onChange={e => setMessage(e.target.value)}
			/>
			<button onClick={sendPhoto}>Send Photo</button>
		</div>
	)
}

export default SendPhotoComponent
