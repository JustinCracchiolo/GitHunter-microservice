import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function analyzeProfile(profileData) {
    const prompt = `You are an API that ONLY returns valid JSON. 
                    Do NOT include explanations, markdown, or extra text.
                    Return a JSON object with the following fields:
                    {
                        "strengths": [string],
                        "weaknesses": [string],
                        "skill_summary": [string],
                        "recommended_roles": [string]
                    }

                    Analyze the GitHub profile data below and fill in the fields.

                    GitHub Data:
                    ${JSON.stringify(profileData)}`
    ;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini JSON parse error:", err);
        return { error: "Invalid JSON returned from AI" };
    }
}
