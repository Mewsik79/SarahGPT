export class OllamaClient {
      constructor() {
        // Update base URL to the new endpoint
        this.baseUrl = 'http://localhost:3000';
      }

      async checkServerStatus() {
        try {
          const response = await fetch(`${this.baseUrl}/health`, {
            method: 'GET',
            timeout: 5000
          });
          return response.ok;
        } catch (error) {
          console.error('Server status check failed:', error);
          return false;
        }
      }

      async checkModelAvailability() {
        try {
          const response = await fetch(`${this.baseUrl}/models`, {
            method: 'GET'
          });
          
          if (!response.ok) return false;
          
          const data = await response.json();
          return data.available_models.includes('llama2');
        } catch (error) {
          console.error('Model check failed:', error);
          return false;
        }
      }

      async generateResponse(prompt) {
        try {
          const response = await fetch(`${this.baseUrl}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: prompt,
              model: 'llama2',
              max_tokens: 150,
              temperature: 0.7
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Model response:', data);
          return data.response;
        } catch (error) {
          console.error('API error:', error);
          return "Oops, something went wrong. Let's try that again!";
        }
      }
    }
