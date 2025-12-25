function send() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  const responseBox = document.getElementById("officeResponse");
  const card = document.getElementById("card");
  const cardText = document.getElementById("cardText");

  if (!text) return;

  // Show listening state
  responseBox.innerText = "Listening...";
  card.classList.add("hidden");

  setTimeout(() => {
    const lower = text.toLowerCase();

    let reply = "";
    let cardMessage = "";

    // --- Emotion Detection ---
    if (lower.includes("happy") || lower.includes("good") || lower.includes("fine")) {
      reply =
        "I can sense a lightness in what you wrote. You don’t have to hold it tightly—just let it exist.";
      cardMessage =
        "Even calm happiness deserves to be noticed. You allowed yourself that today.";
    } 
    else if (
      lower.includes("lazy") ||
      lower.includes("inconsistent") ||
      lower.includes("tired") ||
      lower.includes("exhausted")
    ) {
      reply =
        "It sounds like your energy dipped today. That doesn’t cancel your effort—it just shows you’re human.";
      cardMessage =
        "Some days move slowly. They still count. Especially the quiet ones.";
    } 
    else if (
      lower.includes("sad") ||
      lower.includes("low") ||
      lower.includes("empty") ||
      lower.includes("down")
    ) {
      reply =
        "I’m here with you. You didn’t need to shape this feeling into words—it was already valid.";
      cardMessage =
        "You are allowed to feel without fixing. That alone is enough right now.";
    } 
    else if (lower.length < 10) {
      reply =
        "You didn’t say much—and that’s okay. Silence can also be a way of speaking.";
      cardMessage =
        "Not every thought needs a paragraph. This was enough.";
    } 
    else {
      reply =
        "I hear a lot between your lines. You’re processing, not failing.";
      cardMessage =
        "Your thoughts don’t need to be clear to be real. They were heard.";
    }

    // --- Show response ---
    responseBox.innerText = reply;

    // --- Show card ---
    cardText.innerText = cardMessage;
    card.classList.remove("hidden");

    input.value = "";
  }, 1200);
}
