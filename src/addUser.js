
import { getKV } from "./getFun.js";

export async function addUser(update) {
  const userInfo = {
      userId: update.message.from.id,
      firstName: update.message.from.firstName,
      lastName: update.message.from.lastName,
      username: update.message.from.username
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
