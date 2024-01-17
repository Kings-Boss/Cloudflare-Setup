
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
    const Fsub = isSub(userId);
    const masterChatId = await KV.get("masterChatId");

    if (!Banned) {
        if (Fsub) {
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
            const inline = buildButtons(
                [
                    {
                        text: "Join Channel",
                        url: `https://t.me/${channel}`,
                    },
                ],
                {
                    text: "Check ✅",
                    callback_data: `check_${userId}`,
                }
            );
            await sendMessage(chatId, "*TO USE ME YOU HAD TO JOIN THE FOLLOWING CHANNEL*", "Markdown", inline);
        }

    } else {
        await deleteMessage(chatId, messageId);
    }
}