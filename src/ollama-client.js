export class OllamaClient {
      constructor() {
        this.baseUrl = 'http://localhost:11434';
      }

      async generateResponse(prompt) {
        try {
          const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama2',
              prompt: prompt,
              stream: false,
              options: {
                temperature: 0.7,
                top_p: 0.9,
                max_tokens: 150,
                repeat_penalty: 1.1
              }
            })
          });
          const data = await response.json();
          return data.response;
        } catch (error) {
          console.error('Ollama error:', error);
          return "Oops, something went wrong. Let's try that again!";
        }
      }
    }
