const messages = document.getElementById("messages");
const input = document.getElementById("input");

// LOCAL MEMORY (SESSION)
let chatHistory = [];

function add(text, type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function send(){

  const text = input.value.trim();
  if(!text) return;

  add(text, "user");
  input.value = "";

  const botDiv = add("thinking...", "bot");

  // ADD USER MESSAGE TO MEMORY
  chatHistory.push({
    role: "user",
    content: text
  });

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: chatHistory
    })
  });

  const data = await res.json();

  const reply = data.reply || "error";

  botDiv.innerText = reply;

  // ADD AI RESPONSE TO MEMORY
  chatHistory.push({
    role: "assistant",
    content: reply
  });
}
