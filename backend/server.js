const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  const prompt = `
You are "Self-Satisfaction Office".
You listen, not fix.
Respond warmly in 2–3 sentences.
Then write ONE short soothing card line.
Do not give advice.

Format strictly like this:

RESPONSE:
<response>

CARD:
<card>
`;

  const ollama = spawn("ollama", [
    "run",
    "phi3:mini",
    `${prompt}\nUser: ${userMessage}`
  ]);

  let output = "";

  ollama.stdout.on("data", (data) => {
    output += data.toString();
  });

  ollama.stderr.on("data", (data) => {
    console.error("Ollama error:", data.toString());
  });

  ollama.on("close", () => {
    const responseMatch = output.match(/RESPONSE:\s*([\s\S]*?)CARD:/);
    const cardMatch = output.match(/CARD:\s*([\s\S]*)/);

    res.json({
      reply: responseMatch
        ? responseMatch[1].trim()
        : "I'm here with you.",
      card: cardMatch
        ? cardMatch[1].trim()
        : "Your feelings are allowed."
    });
  });
});

app.listen(3000, () => {
  console.log("🌿 Self-Satisfaction Office running at http://localhost:3000");
});
