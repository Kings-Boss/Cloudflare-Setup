
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
    let userInfo = "";
    const data = await getKV("AllUsers");

    for (const user of data) {
      if (user.userId === targetUserId) {
        if (user.Name) {
            userInfo += "*Name :* " + user.Name + "\n";
        }
        userInfo += "*UserId :* `" + user.userId + "`\n";
        userInfo += "*FirstName :* " + (user.firstName || "") + "\n";
        userInfo += "*LastName :* " + (user.lastName || "") + "\n";
        if (user.username) {
          userInfo += `*UserName :* @${user.username}` + "\n";
        } else {
          userInfo += "*UserName :* " + "undefined" + "\n";
        }
        userInfo += "*isBot :* " + "False" + "\n";
        break;
      }
    }
    return userInfo
}
