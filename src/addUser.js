
import { getKV } from "./getFun.js";

export async function addUser(update) {
  const userInfo = {
    userId: update.message.chat.id,
    firstName: update.message.chat.firstName,
    lastName: update.message.chat.lastName,
    username: update.message.from.username,
    isBot: update.message.from.isBot
  };

  const Allusers = await getKV("AllUsers");
  let userIndex = Allusers.length;

  if (!userInfo.firstName && !userInfo.lastName) {
    userInfo.Name = `User${userIndex}`;
  }
  if (!Allusers.some(user => user.userId === userInfo.userId)) {
    Allusers.push(userInfo);
  }
  
  await KV.put("AllUsers", JSON.stringify(Allusers));
}
