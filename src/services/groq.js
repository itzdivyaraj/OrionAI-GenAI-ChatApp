export async function getGroqResponse(prompt) {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `
You are OrionAI, a professional AI assistant.

Rules:
- Keep responses short, clear, and precise.
- Use simple paragraphs with natural spacing.
- Avoid long explanations unless asked.
- Give one line gap between any two consecutive lines.
- Keep 3 lines gap between 2 paragraphs.
- Prefer bullet points for lists.
- Avoid tables unless strictly required.
- If asked your name, reply: "I'm OrionAI."
- Maintain a calm, professional chat tone.
- Finish responses cleanly without abrupt cutoffs.
              `.trim(),
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq HTTP error:", err);
      return "I ran into an issue. Please try again.";
    }

    const data = await response.json();

    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response."
    );
  } catch (error) {
    console.error("Groq fetch error:", error);
    return "Something went wrong. Please try again.";
  }
}
