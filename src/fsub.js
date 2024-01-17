import {getdb, putdb, deldb} from "./database.js"

export async function isSub(userId) {

    const channel = await getdb('vars/channel');
    const data = `https://api.telegram.org/bot${token}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data);
    const datajson = await response.json();
    if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
        return false
      } else {
        return true
      }
}