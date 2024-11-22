<template>
  <div>
    <input v-model="chatId" placeholder="Chat ID" />
    <input v-model="photoUrl" placeholder="Photo URL" />
    <input v-model="caption" placeholder="Caption" />
    <button @click="sendPhoto">Send Photo</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {TelegramBot} from 'tele-sdk-js';

const bot = new TelegramBot('YOUR_BOT_TOKEN');

const chatId = ref('');
const photoUrl = ref('');
const caption = ref('');

const sendPhoto = async () => {
  try {
    const response = await bot.sendPhoto({
      chat_id: chatId.value,
      photo: photoUrl.value,
      caption: caption.value,
    });
    console.log('Photo sent:', response);
  } catch (error) {
    console.error('Error sending photo:', error);
  }
};
</script>
