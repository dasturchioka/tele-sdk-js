/**
 * Represents a message object returned by the Telegram API.
 */
export interface Message {
	message_id: number
	text?: string
	chat: {
		id: number
		type: string
	}
	from?: {
		id: number
		first_name: string
	}
}

/**
 * Parameters for sending a message via the Telegram API.
 */
export interface SendMessageParams {
	chat_id: number | string
	text: string
}
