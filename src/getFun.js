
import { getdb } from "./database";

export async function getKV(keyname) {
    const valueString = await KV.get(keyname);
    const valueJSON = JSON.parse(valueString)
    return valueJSON 
  }
  
export async function getUserId(repliedMessage) {
    for (const row of repliedMessage.reply_markup.inline_keyboard) {
        for (const button of row) {
          if (button.text === "UserInfo") {
            const callbackData = button.callback_data;
            const [, userId,] = callbackData.split('_');
            return userId
          }
        }
      }
  }
  
export async function getIdFromMsg(replyText ,regex) {
    const match = regex.exec(replyText);
    if (match) {
      const ID = match[1];
      return ID
    }
  }

export async function getUserInfo(userId) {
  const data = await getdb(`users/${userId}`);
  let userInfo = "";
  let username = "undefined";
  if (data.username) {
    username = `@${data.username}`;
  }
  userInfo += "*UserId:* `" + data.id + "`\n";
  userInfo += "*FirstName :* " + (data.first_name || "") + "\n";
  userInfo += "*LastName :* " + (data.last_name || "") + "\n";
  userInfo += "*UserName :* " + username + "\n";
  userInfo += "*isBot :* " + data.is_bot + "\n";
  userInfo += "*isBanned? :* " + (data.banned || "false") + "\n";
  
  return userInfo;
  }