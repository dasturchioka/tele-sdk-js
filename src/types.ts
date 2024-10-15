/**
 * Represents a message object inside of the Result object returned by the Telegram API.
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
 * Represents a result object returned by the Telegram API.
 */
export interface DefaultResponse {
	ok: boolean
	result: Message | any
}

/**
 * Parameters for sending a message via the Telegram API.
 */
export interface SendMessageParams {
	chat_id: number | string
	text: string
	[key: string]: any
}
