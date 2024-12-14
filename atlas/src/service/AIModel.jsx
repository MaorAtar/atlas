import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const generateTravelPlan = async (prompt) => {
    try {
      // Make sure you're calling the correct method according to the version you're using
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1500,
      });
  
      const travelPlan = response.choices[0].message.content;
      console.log('Generated Travel Plan:', travelPlan);
      return JSON.parse(travelPlan);  // Parse the response if it's in JSON format
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return { error: 'Sorry, something went wrong!' };
    }
  };
  
  export { generateTravelPlan };