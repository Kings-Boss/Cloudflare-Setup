
import { handleUser } from "./handleUser";
import { masterCommands } from "./masterCommands";
import { handleCallbackQuery } from "./handleCallbackQuery.js";
import { handleMasterReply } from "./handleMasterReply.js";
import { getKV } from "./getFun.js";

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
    const isMaster = (userId === 1818824488);
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

async function addUser(update) {
  const userInfo = {
    Name: "",
    firstName: update.message.from.firstName,
    userId: update.message.from.id,
    lastName: update.message.from.lastName,
    username: update.message.from.username || '',  // Handle optional username
    isBot: update.message.from.isBot,
    languageCode: update.message.from.languageCode,
  };

  const Allusers = await getKV("AllUsers");
  let userIndex = Allusers.length;

  if (!userInfo.firstName && userInfo.lastName) {
    userInfo.Name = userInfo.lastName
  } else if (!userInfo.lastName && userInfo.firstName) {
    userInfo.Name = userInfo.firstName
  } else if (!userInfo.firstName && !userInfo.lastName) {
    userInfo.Name = `User${userIndex}`;
  }

  if (!Allusers.some(user => user.userId === userInfo.userId)) {
    Allusers.push(userInfo);
  }
  // @ts-ignore
  await KV.put("AllUsers", JSON.stringify(Allusers));
}