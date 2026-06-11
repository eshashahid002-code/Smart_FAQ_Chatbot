// ================= FAQ DATA =================

const faqs = [
    {
        q: "what is translator",
        a: "A translator converts text from one language to another language."
    },
    {
        q: "what is ocr",
        a: "OCR extracts text from images."
    },
    {
        q: "what is voice input",
        a: "Voice input converts speech into text."
    },
    {
        q: "how to translate",
        a: "Enter text and click the translate button."
    }
];

// ================= CLEAN TEXT =================

function clean(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(" ");
}

// ================= SIMILARITY =================

function similarity(a, b) {

    let A = clean(a);
    let B = clean(b);

    let match = A.filter(word => B.includes(word));

    return match.length / Math.sqrt(A.length * B.length);
}

// ================= MATCH ENGINE =================

function getBestMatch(input) {

    let best = "Sorry, I don't know the answer to that question.";
    let score = 0;

    faqs.forEach(faq => {

        let currentScore = similarity(input, faq.q);

        if (currentScore > score) {
            score = currentScore;
            best = faq.a;
        }

    });

    return best;
}

// ================= CHATBOT =================

function sendMessage() {

    let input = document.getElementById("userInput").value.trim();

    if (!input) return;

    let chatbox = document.getElementById("chatbox");

    chatbox.innerHTML += `
        <div><b>You:</b> ${input}</div>
    `;

    chatbox.innerHTML += `
        <div><b>Bot:</b> ${getBestMatch(input)}</div>
        <hr>
    `;

    document.getElementById("userInput").value = "";

    chatbox.scrollTop = chatbox.scrollHeight;
}