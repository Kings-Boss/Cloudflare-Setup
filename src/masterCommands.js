

import { sendMessage } from "./message";
import { BanUser, UnbanUser } from "./banCmds";
import { getIdFromMsg } from "./getFun.js";

export async function masterCommands(update) {

    const chatId = update.message.chat.id;
    const masterText = update.message.text;
    const messageId = update.message.message_id;
  
    if (masterText === "/start") {
      const specialMessage = "Welcome back, Master! How can I assist you today?";
      await sendMessage(chatId, specialMessage);
  
    } else if (masterText.startsWith("/ban ")) {
      const regex = /^\/ban (\d+)/;
      const ID = await getIdFromMsg(masterText, regex);
      await BanUser(ID, messageId);
  
    } else if (masterText.startsWith("/unban ")) {
      const regex = /^\/unban (\d+)/;
      const ID = await getIdFromMsg(masterText, regex);
      await UnbanUser(ID, messageId);
    } 
  }