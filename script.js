let userFeeling = "";
let knowsWhy = false;

function goToScreen(num) {
    document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
    document.getElementById("screen" + num).classList.add("active");
}

function processFeeling() {
    userFeeling = document.getElementById("feelingInput").value.trim();
    if (userFeeling === "") return alert("Just type something. Anything.");

    goToScreen(3);
}

function setWhy(answer) {
    knowsWhy = answer;
    generateCard();
    goToScreen(4);
}

function detectEmotion(text) {
    text = text.toLowerCase();
    if (text.includes("tired")) return "Tired";
    if (text.includes("confused")) return "Confused";
    if (text.includes("sad")) return "Sad";
    if (text.includes("stress")) return "Pressured";
    if (text.includes("anxious")) return "Anxious";
    return "Human emotions";
}

function generateCard() {
    const emotion = detectEmotion(userFeeling);

    let response = `
        <h3>🌸 Self-Satisfaction Card</h3>
        <p><strong>Emotion observed:</strong> ${emotion}</p>
        <p>
    `;

    if (knowsWhy) {
        response += `
            You were able to name a reason.<br>
            That takes awareness — not strength, not weakness.
        `;
    } else {
        response += `
            Not knowing why is okay.<br>
            Some feelings arrive without explanations.
        `;
    }

    response += `
        </p>
        <p>
            This feeling is allowed to exist without being solved.<br>
            You don’t owe clarity right now.
        </p>
        <p>
            <strong>Status:</strong> Accepted 🤍<br>
            No action required.
        </p>
        <p>
            Take a breath.<br>
            Close this when you’re ready.
        </p>
    `;

    document.getElementById("resultCard").innerHTML = response;
}

function restart() {
    document.getElementById("feelingInput").value = "";
    goToScreen(1);
}
