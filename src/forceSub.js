
import { getdb } from "./database.js";

export async function checkSub(userId) {
    const channel = await getdb('vars/channel');
    const response = await fetch(`https://api.telegram.org/bot${telegramAuthToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`);
    const datajson = await response.json();
    if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
        return false
    } else {
        return true
    }
}