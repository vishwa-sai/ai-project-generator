const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 STORE API KEY HERE (SAFE)
const API_KEY = "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";

app.post("/generate", async (req, res) => {
  try {

    const { branch, sub, level, count } = req.body;

    const prompt = `
Generate ${count} unique engineering project ideas.

Branch: ${branch}
Domain: ${sub}
Level: ${level}

For EACH idea give:
Title:
Description:
Features:
Tech Stack:
Roadmap:
Resume Value:
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    const data = await response.json();

    res.json({
      output: data[0]?.generated_text || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("AI Backend Running 🚀");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
