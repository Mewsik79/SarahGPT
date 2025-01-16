import { OllamaClient } from './ollama-client.js';
    import { StorySystem } from './story-system.js';
    import { Timeline } from './timeline.js';
    import { KnowledgeBase } from './knowledge-base.js';

    export class SarahAI {
      constructor() {
        this.ollama = new OllamaClient();
        this.storySystem = new StorySystem();
        this.timeline = new Timeline();
        this.knowledgeBase = new KnowledgeBase();
        this.conversationLog = [];
        this.context = {
          lastTopics: [],
          emotionalState: 'neutral',
          userInterests: new Set(),
          storyProgress: 0
        };
      }

      getRandomGreeting() {
        const greetings = [
          "G'day mate! How's it going?",
          "Hey there! What's the goss?",
          "Yo! What's up?",
          "Hello! [shouting in the background] Yeah, I'm on the phone!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      }

      updateContext(userMessage) {
        const topics = this.extractTopics(userMessage);
        this.context.lastTopics = topics.slice(0, 3);
        topics.forEach(topic => this.context.userInterests.add(topic));
      }

      extractTopics(message) {
        const words = message.toLowerCase().split(/\s+/);
        const pathTriggers = Object.values(this.storySystem.paths)
          .flatMap(path => path.triggers);
        
        return words.filter(word => 
          this.knowledgeBase.validateTopic(word) || 
          pathTriggers.includes(word)
        );
      }

      createPrompt(userMessage, storyPrompt) {
        return `You are Sarah, a 17-year-old Australian girl in 1997. Respond to this message in character:
        Current Date: ${this.timeline.getFormattedDate()}
        Current Story Path: ${this.storySystem.getCurrentPath()}
        Recent Topics: ${this.context.lastTopics.join(', ')}
        Story Progress: ${this.context.storyProgress}
        ${storyPrompt ? `Story Prompt: ${storyPrompt}` : ''}
        User Message: ${userMessage}

        Respond using 1990s Australian slang and speak with a Queensland accent. 
        Be expressive and candid. Keep responses under 150 words. 
        If appropriate, subtly steer the conversation towards current story path topics.`;
      }

      // Add missing logConversation method
      logConversation(userMessage, response) {
        this.conversationLog.push({
          date: this.timeline.getFormattedDate(),
          userMessage,
          response,
          storyPath: this.storySystem.getCurrentPath(),
          topics: this.context.lastTopics,
          progress: this.context.storyProgress
        });
      }

      async generateResponse(userMessage) {
        this.updateContext(userMessage);
        this.storySystem.updateProbabilities(this.context.lastTopics);
        this.timeline.advance();
        this.context.storyProgress += 1;

        const currentPath = this.storySystem.getCurrentPath();
        const storyPrompt = this.storySystem.getStoryPrompt(
          currentPath,
          this.context.storyProgress
        );

        const prompt = this.createPrompt(userMessage, storyPrompt);
        const response = await this.ollama.generateResponse(prompt);
        
        this.logConversation(userMessage, response);
        return response;
      }
    }
