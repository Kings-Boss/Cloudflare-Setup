
export async function getKV(keyname) {
    // @ts-ignore
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