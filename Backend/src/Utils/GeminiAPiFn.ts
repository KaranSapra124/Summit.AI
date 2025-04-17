import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API as string });


export const geminiSummarize = async (text: string): Promise<string> => {
    const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Summarize the following in 5 sentences & only return summary:\n\n${text}`
    });
    return result.text as string;
};

export const geminiCorrect = async (text: string): Promise<string> => {
    const result = await genAI.models.generateContent({ model: "gemini-2.0-flash", contents: `Correct the grammar and spelling mistakes in the following and only return corrected sentence with mistakes and corrections:\n\n${text}` });
    return result.text as string;
};

export const geminiDetectLang = async (text: string): Promise<string> => {
    const result = await genAI.models.generateContent({ model: "gemini-2.0-flash", contents: `Detect the language of this text:\n\n${text}` });
    return result.text as string;
};
