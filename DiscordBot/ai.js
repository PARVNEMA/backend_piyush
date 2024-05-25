//In ai.js
// require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI({
    // apiKey: "use api",
});

// const openai = new OpenAIApi(configuration);
async function ask(prompt) {
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo", // Updated to the latest model
            prompt,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        const answer = response.data.choices[0].text;
        return answer;
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        throw error; // Rethrow the error to handle it further up the call stack
    }
}
//Export the "ask" function
module.exports = {
    ask,
};
