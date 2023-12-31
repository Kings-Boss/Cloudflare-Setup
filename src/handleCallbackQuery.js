
import { editMessageText, deleteMessage, answerCallbackQuery } from "./message";
import { Unbanlist } from "./banCmds";
var masterChatId;

export async function handleCallbackQuery(update) {
    masterChatId = await KV.get("masterChatId");
    const callbackData = update.callback_query.data;
    const parts = callbackData.split('_');

    if (parts[0] === "userinfo") {
      const popupText = `User ID: ${parts[1]}\nMessage ID: ${parts[2]}`;
      await answerCallbackQuery(update.callback_query.id, popupText);

    } else if (parts[0] === "delete") {
      await deleteMessage(parts[1], parts[2]);
      await editMessageText(masterChatId, update.callback_query.message.message_id, `*MESSAGE #DELETED \nFROM UserID : ${parts[1]} \nMessageID : ${parts[2]}*`);
      
    } else if (parts[0] === "unban") {
      await Unbanlist(parts[1]);
      await editMessageText(masterChatId, update.callback_query.message.message_id , `[THIS USER](tg://user?id=${parts[1]}) *IS #UNBANNED NOW*`)

    }
  }