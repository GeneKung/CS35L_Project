import OpenAI from 'openai';
var gptKey = require("./keys/private.json");

const openai = new OpenAI({
  apiKey: gptKey.key,
  dangerouslyAllowBrowser : true
});

const generateRecipe = async (ingredients, dietaryList, allergyList) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a chef who creates recipes." },
        { role: "user", content: `I have these ingredients: ${ingredients}. What can I make with them?
        I have these dietary restrictions: ${dietaryList} , and these allergies: ${allergyList}` }
      ],
      stop: ["Human:", "AI:"],
      temperature: 0.5,
    });

    console.log(response);
    console.log("Response Logged");

    // Extract the recipe from the response
    const recipe = response.choices[0].message.content;

    return recipe;
  } catch (error) {
    	if (error instanceof OpenAI.APIError) {
    		console.error(error.status);  // e.g. 401
    		console.error(error.message); // e.g. The authentication token you passed was invalid...
    		console.error(error.code);  // e.g. 'invalid_api_key'
    		console.error(error.type);  // e.g. 'invalid_request_error'
  	} else {
    		// Non-API error
    		console.log(error);
  	}
  }
};

export default generateRecipe;
