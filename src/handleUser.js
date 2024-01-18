
import { sendMessage, copyMessage, deleteMessage, buildInlineKeyboard } from "./message";
import { getdb } from "./database";
import { isBanned } from "./banCmds";

var telegramAuthToken = "1861934584:AAFoRVzflmY9dTRkMZT8E4e9FJN0apqgbyw";

export async function handleUser(update) {

    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const userText = update.message.text;
    const messageId = update.message.message_id;
    const Banned = await isBanned(userId.toString());
    const masterChatId = await KV.get("masterChatId");
    const channel = await getdb('vars/channel');
    const data = `https://api.telegram.org/bot${telegramAuthToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data);
    const datajson = await response.json();

    if (!Banned) {
        if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
            await sendMessage(chatId, "FIRSTLY JOIN THE CHANNEL");
        } else {
            await sendMessage(chatId, "Already Joined");
        }
    } else {
        await deleteMessage(chatId, messageId);
    }
}

async function sendToMaster() {
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