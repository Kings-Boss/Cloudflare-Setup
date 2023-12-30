
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

export async function getUserInfo(targetUserId) {
    const data = await getKV("AllUsers");
  
    for (const user of data) {
      if (user.userId === targetUserId) {
        const userInfo = [
            user.Name ? `*Name :* ${user.Name}\n` : "",
          `*UserId :* \`${user.userId}\``,
          `*FirstName :* ${user.firstName?.("" || "")}`,
          `*LastName :* ${user.lastName?.("" || "")}`,
          user.username ? `*UserName :* @${user.username}\n` : `*UserName :* undefined\n`,
          "*isBot :* False\n",
        ].join("\n");
        return userInfo;
      }
    }
    return "User not found";
  }
