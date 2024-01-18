
import { sendMessage, copyMessage, deleteMessage, buildInlineKeyboard } from "./message.js";
import { isSub } from "./forceSub.js";
import { isBanned } from "./banCmds.js";

export async function handleUser(update) {

    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const userText = update.message.text;
    const messageId = update.message.message_id;
    const channel = await getdb('vars/channel');
    const Banned = await isBanned(userId.toString());
    const notSub = await isSub(userId);

    if (!Banned) {
        if (notSub) {
            const inline = buildInlineKeyboard(
                "Check ✅",
                `check_${userId}`,
                [
                    {
                        text: "Join Channel",
                        url: `https://t.me/${channel}`,
                    },
                ]
                );
            await sendMessage(chatId, "*TO USE ME YOU HAD TO JOIN THE FOLLOWING CHANNEL*", "Markdown", inline);
        } else {
            await sendToMaster();
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