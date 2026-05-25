const chatBox =
document.getElementById("chatBox");

const userInput =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendBtn");

sendBtn.addEventListener(
  "click",
  sendMessage
);

async function sendMessage(){

  const message =
  userInput.value.trim();

  if(!message) return;

  document.querySelector(".welcome")
  ?.remove();

  addMessage(message, "user");

  userInput.value = "";

  const botDiv =
  addMessage("Thinking...", "bot");

  try{

    const response =
    await fetch("/api/chat", {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"
      },

      body:JSON.stringify({
        message
      })
    });

    const data =
    await response.json();

    botDiv.innerText =
      data.reply ||
      data.error ||
      "No response.";

  }

  catch(error){

    console.log(error);

    botDiv.innerText =
    "Server error.";
  }
}

function addMessage(text, type){

  const div =
  document.createElement("div");

  div.classList.add(
    "message",
    type
  );

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop =
  chatBox.scrollHeight;

  return div;
}
