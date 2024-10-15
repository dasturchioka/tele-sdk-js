import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Message, SendMessageParams } from './types'

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
	async sendMessage(params: SendMessageParams): Promise<Message> {
		return this.request<Message>('sendMessage', params)
	}
}
