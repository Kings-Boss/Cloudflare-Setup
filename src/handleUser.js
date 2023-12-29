
import { sendMessage, copyMessage, deleteMessage, buildInlineKeyboard } from "./message";
import { isBanned } from "./banCmds";

export async function handleUser(update) {

    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const userText = update.message.text;
    const messageId = update.message.message_id;
    const Banned = await isBanned(userId.toString());
    const masterChatId = await KV.get("masterChatId");

    if (!Banned) {
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
        await deleteMessage(chatId, messageId);
    }
}