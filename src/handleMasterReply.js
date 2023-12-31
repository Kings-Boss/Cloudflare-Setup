
import { sendMessage, copyMessage, replyMessage, buildInlineKeyboard, deleteMessage } from "./message";
import { BanUser, UnbanUser } from "./banCmds";
import { getUserId, getIdFromMsg, getUserInfo } from "./getFun.js";
var masterChatId;

export async function handleMasterReply(update) {
    if ("message" in update && update.message.reply_to_message) {
      const repliedMessage = update.message.reply_to_message;
      const replyText = update.message.text;
      const messageId = update.message.message_id;
      const replymessageId = update.message.reply_to_message.message_id;
      masterChatId = await KV.get("masterChatId");
  
      if (replyText.startsWith("/dm ")) {
        const regex = /^\/dm (\d+)/;
        const ID = await getIdFromMsg(replyText, regex);
        const response = await copyMessage(masterChatId, replymessageId, ID);
        const inlineKeyboard = buildInlineKeyboard(
          "Delete Message", 
          `delete_${ID}_${response.result.message_id}`,[]);
          
        await replyMessage(masterChatId, replymessageId, `*MESSAGE #SENT SUCCESSFULLY*`, inlineKeyboard);
  
      } else if ("reply_markup" in repliedMessage && "inline_keyboard" in repliedMessage.reply_markup) {
          const userId = await getUserId(repliedMessage);
          if (replyText === "/id"){
            await replyMessage(masterChatId, replymessageId, `*UserId :* \`${userId}\``);
            await deleteMessage(masterChatId, messageId);

          } else if (replyText === "/info") {
              const userInfo = await getUserInfo(repliedMessage);
              await replyMessage(masterChatId, replymessageId, userInfo);
              await deleteMessage(masterChatId, messageId);

          } else if (replyText === "/ban") {
              await BanUser(userId, replymessageId);
              await deleteMessage(masterChatId, messageId);

          } else if (replyText === "/unban") {
              await UnbanUser(userId, replymessageId);
              await deleteMessage(masterChatId, messageId);

          } else {
            await sendMessage(userId, replyText);
          }
      }
    }
  }
