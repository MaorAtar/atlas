import { OpenAI } from 'openai';
import { AI_PROMPT } from '@/constants/options';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Only use this in controlled environments
});

// Utility function to replace placeholders in the prompt
const populatePrompt = (location, totalDays, traveler, budget) => {
    return AI_PROMPT
        .replace('{location}', location)
        .replace('{totalDays}', totalDays)
        .replace('{traveler}', traveler)
        .replace('{budget}', budget);
};

// Call OpenAI API
const callOpenAI = async (prompt, maxTokens) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.5,
            top_p: 1,
        });

        const content = response.choices[0]?.message?.content;
        return JSON.parse(content || '{}');
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Rate limit exceeded or credit limit reached. Check your OpenAI account.');
        } else if (error.response && error.response.status === 401) {
            console.error('Invalid API key. Please verify your OpenAI API key.');
        } else {
            console.error('Error with OpenAI API:', error);
        }
        return { error: 'Failed to generate the response. Please try again later.' };
    }
};

// Generate a travel plan
const generateTravelPlan = async (location, totalDays, traveler, budget) => {
    try {
        // Populate the prompt dynamically
        const prompt = populatePrompt(location, totalDays, traveler, budget);

        // Call OpenAI API
        const travelPlan = await callOpenAI(prompt, 3000);
        console.log('Generated Travel Plan:', travelPlan);
        return travelPlan;
    } catch (error) {
        console.error('Error generating travel plan:', error);
        return { error: 'Something went wrong while generating the travel plan.' };
    }
};

export { generateTravelPlan };
