import {getdb, putdb, deldb} from "./database.js"
var telegramAuthToken = "1861934584:AAFoRVzflmY9dTRkMZT8E4e9FJN0apqgbyw";

export async function isSub(userId) {

    const channel = await getdb('vars/channel');
    const data = `https://api.telegram.org/bot${telegramAuthToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data);
    const datajson = await response.json();
    if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
      return false
    } else {
      return true
    }
}