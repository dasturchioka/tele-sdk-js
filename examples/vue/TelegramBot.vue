<template>
  <div class="telegram-bot">
    <div class="messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" class="message">
        {{ msg.text }}
      </div>
    </div>

    <div class="controls">
      <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message...">
      <button @click="sendMessage">Send</button>
      <button @click="sendLocation">Share Location</button>
      <input type="file" @change="handleFileUpload" ref="fileInput">
      <button @click="sendFile">Send File</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TelegramBot } from 'tele-sdk-js'

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'
const CHAT_ID = 'YOUR_CHAT_ID'

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN)
const messages = ref([])
const messageText = ref('')
const fileInput = ref(null)
const selectedFile = ref(null)

const sendMessage = async () => {
  if (!messageText.value) return

  try {
    const response = await bot.sendMessage({
      chat_id: CHAT_ID,
      text: messageText.value
    })

    messages.value.push({
      id: Date.now(),
      text: messageText.value
    })

    messageText.value = ''
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const sendLocation = async () => {
  try {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await bot.sendLocation({
          chat_id: CHAT_ID,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })

        messages.value.push({
          id: Date.now(),
          text: '📍 Location shared'
        })
      })
    }
  } catch (error) {
    console.error('Error sending location:', error)
  }
}

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const sendFile = async () => {
  if (!selectedFile.value) return

  try {
    await bot.sendDocument({
      chat_id: CHAT_ID,
      document: selectedFile.value,
      caption: `Sending file: ${selectedFile.value.name}`
    })

    messages.value.push({
      id: Date.now(),
      text: `📎 File sent: ${selectedFile.value.name}`
    })

    selectedFile.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    console.error('Error sending file:', error)
  }
}
</script>

<style scoped>
.telegram-bot {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.messages {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.message {
  background-color: #f0f2f5;
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 8px;
  max-width: 80%;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #006699;
}
</style>
