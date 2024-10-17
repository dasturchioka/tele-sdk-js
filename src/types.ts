/**
 * Represents a message object inside of the Result object returned by the Telegram API.
 */
export interface Message {
	message_id: number
	text?: string
	chat: {
		id: number
		type: string
		[key: string]: any
	}
	from?: {
		id: number
		first_name: string
		[key: string]: any
	}
	[key: string]: any
}
/**
 * Represents a result object returned by the Telegram API.
 */

export interface DefaultResponse<T = any> {
	ok: boolean
	result: T
}
/**
 * Parameters for sending a message via the Telegram API.
 */
export interface SendMessageParams {
	chat_id: number | string
	text: string
	[key: string]: any
}
/**
 * Parameters for sending a photo via the Telegram API.
 */
export interface SendPhotoOptions {
	chat_id: number | string
	photo: string | Blob // File_id or direct URL, or file upload
	caption?: string
	parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML' | any
	caption_entities?: Array<any>
	disable_notification?: boolean
	protect_content?: boolean
	reply_to_message_id?: number
	allow_sending_without_reply?: boolean
	reply_markup?: any
}
/**
 * Parameters for sending a video via the Telegram API.
 */
export interface SendVideoOptions extends Omit<SendPhotoOptions, 'photo'> {
	video: string | Buffer | Blob
	duration?: number
	width?: number
	height?: number
	supports_streaming?: boolean
}
