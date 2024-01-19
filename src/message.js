
var masterChatId;

export async function sendMessage(to_chatId, text, parsemode = "Markdown", replyMarkup) {
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: to_chatId,
      text: text,
      parse_mode: parsemode,
    });
  
    if (replyMarkup) {
      params.append("reply_markup", JSON.stringify(replyMarkup));
    }
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    return response.json();
  }
  
export async function forwardMessage(chatId, messageId) {
    masterChatId = await KV.get("masterChatId");
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/forwardMessage`;
    const params = new URLSearchParams({
      chat_id: masterChatId,
      from_chat_id: chatId,
      message_id: messageId,
    });
  
     await fetch(`${apiUrl}?${params.toString()}`);
  }
  
export async function copyMessage(from_chatId, messageId, to_chat, replyMarkup) {

    if (!to_chat) {
      masterChatId = await KV.get("masterChatId");
    }
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/copyMessage`;
    const params = new URLSearchParams({
      chat_id: to_chat,
      from_chat_id: from_chatId,
      message_id: messageId,
    });
  
      if (replyMarkup) {
        params.append("reply_markup", JSON.stringify(replyMarkup));
      }
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    return response.json();
  }
  
export async function answerCallbackQuery(queryId, text) {
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/answerCallbackQuery`;
    const params = new URLSearchParams({
      callback_query_id: queryId,
      text: text,
      show_alert: true,
    });
  
    await fetch(`${apiUrl}?${params.toString()}`);
  }
  
export async function editMessageText(chatId, messageId, newText, replyMarkup) {
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/editMessageText`;
    const params = new URLSearchParams({
      chat_id: chatId,
      message_id: messageId,
      text: newText,
      parse_mode: "Markdown",
    });
  
    if (replyMarkup) {
      params.append("reply_markup", JSON.stringify(replyMarkup));
    }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
  }
  
export async function replyMessage(to_chatId, messageId, text, replyMarkup) {
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: to_chatId,
      text: text,
      parse_mode: "Markdown",
      reply_to_message_id: messageId,
    });
  
    if (replyMarkup) {
      params.append("reply_markup", JSON.stringify(replyMarkup));
    }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
  }
  
export async function deleteMessage(chatId, messageId) {
    const apiUrl = `https://api.telegram.org/bot${telegramAuthToken}/deleteMessage`;
    const params = new URLSearchParams({
      chat_id: chatId,
      message_id: messageId,
    });
  
    await fetch(`${apiUrl}?${params.toString()}`);
  }

export function buildInlineKeyboard(buttonText, callbackData, urlButtons) {
  const inlineKeyboard = [
    [
      {
        text: buttonText,
        callback_data: callbackData,
      },
      ...urlButtons,  // Include additional URL buttons
    ],
  ];

  return { inline_keyboard: inlineKeyboard };
}
