import { getdb } from "./database";

export async function isSub(userId) {
    const channel = await getdb('vars/channel');
    const data = `https://api.telegram.org/bot${telegramAuthToken}/getChatMember?chat_id=@${channel}&user_id=${userId}`;
    const response = await fetch(data);
    const datajson = await response.json();
    if (datajson.result.status === 'left' || datajson.result.status === 'kicked') {
        return true
    } else {
        return false
    }
}