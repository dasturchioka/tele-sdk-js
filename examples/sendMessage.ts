import { TelegramBot } from '../src/bot'

const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN')

/**
 * Example of sending a message using the TelegramBot class.
 */
;(async () => {
	try {
		const message = await bot.sendMessage({
			chat_id: 'CHAT_ID',
			text: 'Hello from your new SDK!',
		})
		console.log('Message sent:', message)
	} catch (error) {
		console.error('Failed to send message:', error)
	}
})()
