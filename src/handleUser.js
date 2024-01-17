
import { sendMessage, copyMessage, deleteMessage, buildInlineKeyboard, buildButtons } from "./message";
import { isBanned } from "./banCmds";
import { isSub } from "./fsub.js";

export async function handleUser(update) {

    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const userText = update.message.text;
    const messageId = update.message.message_id;
    const channel = await getdb('vars/channel');
    const Banned = await isBanned(userId.toString());
    const data = `https://api.telegram.org/bot${telegramAuthToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data);
    const datajson = await response.json();
    const masterChatId = await KV.get("masterChatId");

    if (!Banned) {
        if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
            if (userText === "/start") {
                await sendMessage(chatId, "Hello There! I am Distinct Contact Bot!");
                } else {
                    const inlineKeyboard = buildInlineKeyboard(
                        "UserInfo",
                        `userinfo_${userId}_${messageId}`,
                        [
                            {
                                text: "Profile",
                                url: `tg://user?id=${userId}`,
                            },
                        ]
                        );                  
                    await copyMessage(chatId, messageId, masterChatId, inlineKeyboard);
                }
          } else {
            await sendMessage(chatId, "*TO USE ME YOU HAD TO JOIN THE FOLLOWING CHANNEL*");
          }

    } else {
        await deleteMessage(chatId, messageId);
    }
}