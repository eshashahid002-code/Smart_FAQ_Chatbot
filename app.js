// ================= FAQ DATA =================

const faqs = [
    { q: ["hello", "hi", "hey"], a: "Hello! How can I help you today? 😊" },
    { q: ["how are you", "hru", "how r u", "how are u doing"], a: "I am fine 😊 Thank you for asking! How can I help you?" },
    { q: ["what is translator", "translator meaning"], a: "A translator converts text from one language to another language." },
    { q: ["what is ocr"], a: "OCR extracts text from images." },
    { q: ["what is voice input"], a: "Voice input converts speech into text." },
    { q: ["how to translate"], a: "Enter text and click the translate button." }
];

// ================= CLEAN TEXT =================

function clean(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .trim();
}

// ================= RANKED MATCH SYSTEM =================

function getBestMatch(input) {

    let userInput = clean(input);

    let bestScore = 0;
    let bestAnswer = "Sorry, I don't understand that yet. Try asking differently 😊";

    faqs.forEach(item => {

        item.q.forEach(keyword => {

            let key = clean(keyword);

            let score = similarity(userInput, key);

            if (score > bestScore) {
                bestScore = score;
                bestAnswer = item.a;
            }
        });

    });

    // strict filter (no wrong answers)
    if (bestScore < 0.4) {
        return "Sorry, I don't understand that yet. Try asking differently 😊";
    }

    return bestAnswer;
}

// ================= SIMILARITY =================

function similarity(a, b) {

    let A = a.split(" ");
    let B = b.split(" ");

    let match = A.filter(word => B.includes(word));

    return match.length / Math.max(A.length, B.length);
}

// ================= CHAT UI =================

function addMessage(sender, text) {

    let chatbox = document.getElementById("chatbox");

    let msg = document.createElement("div");

    msg.style.margin = "8px 0";
    msg.style.padding = "10px";
    msg.style.borderRadius = "10px";

    if (sender === "You") {
        msg.style.background = "#0ea5e9";
        msg.style.textAlign = "right";
    } else {
        msg.style.background = "#1e293b";
    }

    msg.innerHTML = `<b>${sender}:</b> ${text}`;

    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// ================= SEND MESSAGE =================

function sendMessage() {

    let inputBox = document.getElementById("userInput");
    let input = inputBox.value.trim();

    if (!input) return;

    addMessage("You", input);

    let reply = getBestMatch(input);

    addMessage("Bot", reply);

    inputBox.value = "";
}

// ================= ENTER KEY =================

document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

// ================= VOICE INPUT =================

function startVoice() {

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
        sendMessage();
    };
}