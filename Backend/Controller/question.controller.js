import { GoogleGenerativeAI } from "@google/generative-ai";
import { Session } from "../models/session.model.js";
import { Question } from "../models/question.model.js";

const ai = new GoogleGenerativeAI(process.env.GEN_AI);

const fallbackQuestions = [
  { question: "What is React?", answer: "React is a JS library for building UIs." },
  { question: "Explain closures in JS.", answer: "A closure is..." },
  { question: "What is Node.js?", answer: "Node.js is a JS runtime." },
  { question: "What is MongoDB?", answer: "MongoDB is a NoSQL database." },
  { question: "Explain Promises in JS.", answer: "Promises handle async operations." }
];

const generateWithRetry = async (model, prompt, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (err) {
      console.log(`Attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, sessionId } = req.body;

    const prompt = `
You are an interview question generator.
Return ONLY a valid JSON array. Do not include explanations, extra text, or formatting.

Example format:
[
  {"question": "What is React?", "answer": "React is a JS library for building UIs."}
]

Now generate 5 questions for a ${role} with ${experience} years experience.
Focus on topics: ${topicsToFocus}.
`;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    let data;
    try {
      const result = await generateWithRetry(model, prompt);
      let rawText = result.response.text();
      rawText = rawText.replace(/```json|```/gi, "").trim();
      const match = rawText.match(/\[([\s\S]*?)\]/);
      if (match) rawText = match[0];
      data = JSON.parse(rawText);
    } catch (err) {
      console.warn("AI generation failed, using fallback questions.", err.message);
      data = fallbackQuestions;
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      data.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    if (session.questions) {
      session.questions.push(...createdQuestions.map((q) => q._id));
      await session.save();
    }

    return res.status(201).json({
      message: "Questions created successfully",
      questions: createdQuestions,
    });

  } catch (error) {
    console.error("Error in generateInterviewQuestion:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};

export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(401).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save({ validateBeforeSave: false });

    return res.status(201).json({ message: "Question pinned successfully" });
  } catch (error) {
    console.log(`Error in togglePinQuestion: ${error}`);
    res.status(500).json({ message: "Failed to toggle pin" });
  }
};
