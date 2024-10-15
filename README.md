# tele-sdk-js

**tele-sdk-js** is a Vanilla JavaScript client SDK for the Telegram Bot API, designed to simplify the process of building bots for Telegram using TypeScript.

## Installation

To install the package, use npm:

```bash
npm install tele-sdk-js
```

## Features

- Easy-to-use TypeScript-based API.
- Supports all major Telegram Bot API methods. 
- Provides examples and detailed documentation.

## Basic Usage
Here's a simple example of how to use the SDK to send a message:
```javascript
import { TelegramBot } from 'tele-sdk-js';

const bot = new TelegramBot('YOUR_BOT_TOKEN');

bot.sendMessage(chatId, 'Hello, World!');
```
For more examples, see the <a href="https://github.com/dasturchioka/tele-sdk-js/tree/master/examples">examples</a> directory.

## Requirements
- Node.js version 14 or higher.

## Contribution
Contributions are always welcome! Please follow these steps:
1. Fork the repo
2. Create a new branch `(git checkout -b <branch-name>)` <br>
**Please note that** if you want to add a new method of Telegram Bot API (sendFile, sendMedia, sendAudio, etc.), your new creating branch name should be exactly like that.
3. Commit your changes `(git commit -m 'Add new feature')`
4. Push to the branch `(git push origin <branch-name>)`
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
