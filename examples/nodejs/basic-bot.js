const { TelegramBot } = require('tele-sdk-js');

// Initialize the bot with your token
const bot = new TelegramBot('YOUR_BOT_TOKEN');

// Basic message handling
async function handleMessage(chatId, text) {
    try {
        // Send a text message
        await bot.sendMessage({
            chat_id: chatId,
            text: `You said: ${text}`
        });

        // Send a location
        await bot.sendLocation({
            chat_id: chatId,
            latitude: 37.7749,
            longitude: -122.4194,
            // Optional: live location for 1 hour
            live_period: 3600
        });

        // Create a poll
        await bot.sendPoll({
            chat_id: chatId,
            question: "How do you like this bot?",
            options: ["It's great!", "It's okay", "Need improvements"],
            is_anonymous: false
        });

    } catch (error) {
        console.error('Error handling message:', error);
    }
}

// Example: Send a document
async function sendDocument(chatId, filePath) {
    try {
        await bot.sendDocument({
            chat_id: chatId,
            document: filePath, // Can be a file path or file_id
            caption: "Here's your document!",
            parse_mode: 'HTML'
        });
    } catch (error) {
        console.error('Error sending document:', error);
    }
}

// Example usage
handleMessage(123456789, "Hello, bot!");
sendDocument(123456789, './document.pdf');
