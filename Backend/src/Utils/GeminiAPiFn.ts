import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API as string);

export const geminiSummarize = async (text: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(`Summarize the following in 5 sentences & only return summary:\n\n${text}`);
  const response = await result.response;
  return response.text();
};

export const geminiCorrect = async (text: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(`Correct the grammar and spelling mistakes in the following and only return corrected sentence with mistakes and corrections in seperate lines:\n\n${text}`);
  const response = await result.response;
  return response.text();
};

export const geminiDetectLang = async (text: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(`Detect the language of this text & only return language:\n\n${text}`);
  const response = await result.response;
  return response.text();
};

export const geminiEnhanceEssayWriting = async (text: string): Promise<string> => {
  const prompt = `
You are an AI writing assistant for students.

Your task is to:
1. Correct the given English essay (grammar, clarity, tone).
2. List grammar issues (with what’s wrong and the fix).
3. Provide suggestions to improve vocabulary, tone, or structure.

Return your response ONLY in JSON format with the following structure:

{
  "correctedEssay": "<string>",
  "grammarIssues": [
    {
      "issue": "<what was wrong>",
      "correction": "<how to fix it>"
    }
  ],
  "suggestions": [
    "<tip 1>",
    "<tip 2>"
  ]
}

Here is the student’s essay:
"""
${text}
"""
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
