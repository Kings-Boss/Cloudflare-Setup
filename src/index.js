
import { handleUser } from "./handleUser";
import { masterCommands } from "./masterCommands";
import { handleCallbackQuery } from "./handleCallbackQuery.js";
import { handleMasterReply } from "./handleMasterReply.js";
import { getKV } from "./getFun.js";
import { addUser } from "./addUser.js";

var telegramAuthToken = "1861934584:AAFoRVzflmY9dTRkMZT8E4e9FJN0apqgbyw";
var webhookEndpoint = "/endpoint";

addEventListener("fetch", (event) => {
  event.respondWith(handleIncomingRequest(event));
});

async function handleIncomingRequest(event) {
  let url = new URL(event.request.url);
  let path = url.pathname;
  let method = event.request.method;
  let workerUrl = `${url.protocol}//${url.host}`;
  if (method === "POST" && path === webhookEndpoint) {
    const update = await event.request.json();
    event.waitUntil(processUpdate(update));
    return new Response("Ok");
  } else if (method === "GET" && path === "/setup") {
    const url2 = `https://api.telegram.org/bot${telegramAuthToken}/setWebhook?url=${workerUrl}${webhookEndpoint}`;
    const response = await fetch(url2);
    if (response.ok) {
      return new Response("Webhook set successfully", { status: 200 });
    } else {
      return new Response("Failed to set webhook", { status: response.status });
    }
  } else {
    return new Response("Not found", { status: 404 });
  }
}

async function processUpdate(update) {
  if ("message" in update) {
    const userId = update.message.from.id;
    const masters = await getKV("masters");
    const isMaster = (masters.includes(userId));
    await addUser(update);

    if (isMaster) {
      await KV.put("masterChatId", userId);
      await masterCommands(update);
      await handleMasterReply(update);
    } else if (!isMaster) {
      await handleUser(update);
    }
  } else if ("callback_query" in update) {
    await handleCallbackQuery(update)
  }
}
