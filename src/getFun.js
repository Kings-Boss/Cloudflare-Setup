
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

export async function getUserInfo(repliedMessage) {
  for (const row of repliedMessage.reply_markup.inline_keyboard) {
    for (const button of row) {
      if (button.text === "UserInfo") {
        const callbackData = button.callback_data;
        const [, user] = callbackData.split('_');
        const [userId, firstName, lastName, username] = JSON.parse(user)
        const userInfo = [
          `*UserId :* \`${userId}\``,
          `*FirstName :* ${firstName}`,
          `*LastName :* ${lastName}`,
          `*UserName :* ${username}`,
          "*isBot :* False\n",
        ].join("\n");
        return userInfo;
      }
    }
  }
}
