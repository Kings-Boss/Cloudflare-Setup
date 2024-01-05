
import { sendMessage, replyMessage, buildInlineKeyboard } from "./message";
import { getKV } from "./getFun.js";
import { putdb, deldb } from "./database.js";
var BanKeyboard;
var masterChatId;

export async function BanUser(userId, replymessageId) {
    const Banned = await isBanned(userId);
    const BanMsg = `[THIS USER](tg://user?id=${userId}) *IS #BANNED*`;
    masterChatId = await KV.get("masterChatId");
    if (!Banned) {
      BanKeyboard = buildInlineKeyboard(
        "Unban",
        `unban_${userId}`,
        [
          {
            text: "Profile",
            url: `tg://user?id=${userId}`,
          },
        ]
      );
  
      const bannedUsers = await getKV("BannedUsers");
      bannedUsers.push(userId)
      await KV.put("BannedUsers", JSON.stringify(bannedUsers));
      await putdb(`users/${userId}/banned`, true);
      await sendMessage(userId, `*YOU HAVE BEEN BANNED*`);
      await replyMessage(masterChatId, replymessageId, BanMsg, BanKeyboard);
    } else {
      await replyMessage(masterChatId, replymessageId,`[THIS USER](tg://user?id=${userId}) *IS ALREADY BANNED*`);
    }
  }
  
export async function UnbanUser(userId, replymessageId) {
    masterChatId = await KV.get("masterChatId");
    const Banned = await isBanned(userId);
    const USER = `[THIS USER](tg://user?id=${userId})`
    if (Banned) {
      await Unbanlist(userId);
      await replyMessage(masterChatId, replymessageId, `${USER} *IS #UNBANNED NOW*`);      
    } else {
      await replyMessage(masterChatId, replymessageId,`${USER} *WAS NEVER BANNED*`);   
    }
  }
  
export async function Unbanlist(userId) {
    const Banned = await isBanned(userId);
    const bannedUsers = await getKV("BannedUsers");
    if (Banned) {
      const newList = bannedUsers.filter(item => item !== userId);
      await KV.put("BannedUsers", JSON.stringify(newList));
      await deldb(`users/${userId}/banned`);
      await sendMessage(userId, `*YOU HAVE BEEN UNBANNED*`);
    }
  }

export async function isBanned(userId) {
    const bannedUsers = await getKV("BannedUsers");
    return (bannedUsers.includes(userId))
  }
