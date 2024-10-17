import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { DefaultResponse, Message, SendMessageParams, SendPhotoOptions } from './types'

/**
 * A class to interact with the Telegram Bot API.
 */
export class TelegramBot {
	private api: AxiosInstance

	/**
	 * Initializes the Telegram bot with the API token.
	 * @param token - The bot's API token provided by Telegram.
	 */
	constructor(private token: string) {
		this.api = axios.create({
			baseURL: `https://api.telegram.org/bot${token}/`,
		})
	}

	/**
	 * Sends a request to the Telegram Bot API.
	 * @template T - The expected response type.
	 * @param method - The Telegram Bot API method name (e.g., 'sendMessage').
	 * @param params - Optional parameters for the API method.
	 * @returns A promise that resolves to the API response of type `T`.
	 * @throws Error if the request fails.
	 */
	private async request<T>(method: string, params?: object): Promise<T> {
		try {
			const response: AxiosResponse<T> = await this.api.post(method, params)
			return response.data
		} catch (error) {
			throw new Error(`Telegram API request failed: ${error}`)
		}
	}

	/**
	 * Sends a message to a chat.
	 * @param params - The parameters for sending a message.
	 * @returns A promise that resolves to the sent message object.
	 */
	async sendMessage(params: SendMessageParams): Promise<DefaultResponse> {
		return this.request<DefaultResponse>('sendMessage', params)
	}

	/**
	 * Sends a photo to a chat.
	 * @param options Options for sending a photo.
	 * @returns The sent message.
	 */
	public async sendPhoto(options: SendPhotoOptions): Promise<DefaultResponse> {
		const formData = new FormData()
		formData.append('chat_id', String(options.chat_id))
		formData.append('photo', options.photo)

		if (options.caption) formData.append('caption', options.caption)
		if (options.parse_mode) formData.append('parse_mode', options.parse_mode)
		if (options.disable_notification !== undefined) {
			formData.append('disable_notification', String(options.disable_notification))
		}
		if (options.reply_to_message_id) {
			formData.append('reply_to_message_id', String(options.reply_to_message_id))
		}
		if (options.protect_content) {
			formData.append('protect_content', String(options.protect_content))
		}
		if (options.reply_to_message_id) {
			formData.append('reply_to_message_id', String(options.reply_to_message_id))
		}
		if (options.allow_sending_without_reply) {
			formData.append('allow_sending_without_reply', String(options.allow_sending_without_reply))
		}
		if (options.reply_markup) {
			formData.append('reply_markup', JSON.stringify(options.reply_markup))
		}
			const response: AxiosResponse<DefaultResponse> = await this.api.post('sendPhoto', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

		return response.data
	}
}
