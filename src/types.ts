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

export interface User {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
}

export interface GetMeResponse extends DefaultResponse<User> {}

export interface ForwardMessageParams {
    chat_id: number | string;
    from_chat_id: number | string;
    message_id: number;
    disable_notification?: boolean;
    protect_content?: boolean;
}

export interface SendVoiceOptions {
    chat_id: number | string;
    voice: string | Blob;
    caption?: string;
    parse_mode?: string;
    duration?: number;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: any;
}

export interface SendDocumentOptions {
    chat_id: number | string;
    document: string | Blob;
    thumbnail?: string | Blob;
    caption?: string;
    parse_mode?: string;
    disable_content_type_detection?: boolean;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: any;
}

export interface SendLocationOptions {
    chat_id: number | string;
    latitude: number;
    longitude: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: any;
}

export interface SendContactOptions {
    chat_id: number | string;
    phone_number: string;
    first_name: string;
    last_name?: string;
    vcard?: string;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: any;
}

export interface BanChatMemberOptions {
    chat_id: number | string;
    user_id: number;
    until_date?: number;
    revoke_messages?: boolean;
}

export interface UnbanChatMemberOptions {
    chat_id: number | string;
    user_id: number;
    only_if_banned?: boolean;
}

export interface SendPollOptions {
    chat_id: number | string;
    question: string;
    options: string[];
    is_anonymous?: boolean;
    type?: 'regular' | 'quiz';
    allows_multiple_answers?: boolean;
    correct_option_id?: number;
    explanation?: string;
    explanation_parse_mode?: string;
    open_period?: number;
    close_date?: number;
    is_closed?: boolean;
    disable_notification?: boolean;
    reply_to_message_id?: number;
    reply_markup?: any;
}
