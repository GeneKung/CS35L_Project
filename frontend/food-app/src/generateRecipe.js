import OpenAI from "openai";
var gptKey = require("./keys/private.json");

const openai = new OpenAI({
  apiKey: gptKey.key,
  dangerouslyAllowBrowser: true,
});

const generateRecipe = async (ingredients, dietaryList, allergyList) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a chef who creates recipes. Respond in Markdown format. \
        Don't send any Headers larger than ##. For example, don't use a # header. The first line should be a ## Header\
        The first line of your repsonse must be a title for the recipe, and the 2nd line onwards should be the recipe. \
        Make the very last line of output 10 one-word tags seperated by commas. No 'tags: ' label on the last line, just plaintext csv style. All lowercase tags.",
        },
        {
          role: "user",
          content: `I have these ingredients: ${ingredients}. What can I make with them?
        I have these dietary restrictions: ${dietaryList} , and these allergies: ${allergyList}`,
        },
      ],
      stop: ["Human:", "AI:"],
      temperature: 0.5,
    });

    console.log(response.choices[0].message.content);
    console.log("Response Logged");

    // Extract the recipe from the response
    const rawRecipe = response.choices[0].message.content;
    let rawRecipeArr = rawRecipe.split("\n");

    const tagLine = rawRecipeArr.pop();
    const recipe = rawRecipeArr.join("\n");

    return [recipe, tagLine];
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
  }
};

export default generateRecipe;
