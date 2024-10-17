const { TelegramBot } = require('your-telegram-sdk') // Replace with actual SDK import

const bot = new TelegramBot('YOUR_BOT_TOKEN')

async function sendPhotoExample() {
	try {
		const response = await bot.sendPhoto({
			chat_id: 'CHAT_ID',
			photo: 'https://example.com/photo.jpg', // URL or file ID
			caption: 'Check out this cool photo!',
		})
		console.log('Photo sent successfully:', response)
	} catch (error) {
		console.error('Error sending photo:', error)
	}
}

sendPhotoExample()
