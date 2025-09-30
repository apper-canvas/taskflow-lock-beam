// Generate task description using OpenAI API

// Cloudflare Worker globals
/* global apper, Response */
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Method not allowed'
      }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const { title } = await request.json();
      
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Task title is required'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const openaiApiKey = await apper.getSecret('OPENAI_API_KEY');
      if (!openaiApiKey) {
        return new Response(JSON.stringify({
          success: false,
          message: 'OpenAI API key not configured'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates clear, actionable task descriptions from task titles. Create a concise but detailed description that explains what needs to be done, why it\'s important, and any key considerations. Keep it professional and under 200 words.'
            },
            {
              role: 'user',
              content: `Generate a task description for: "${title.trim()}"`
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return new Response(JSON.stringify({
          success: false,
          message: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`
        }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const data = await response.json();
      const generatedDescription = data.choices?.[0]?.message?.content?.trim();

      if (!generatedDescription) {
        return new Response(JSON.stringify({
          success: false,
          message: 'No description generated'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        description: generatedDescription
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: `Error generating description: ${error.message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};