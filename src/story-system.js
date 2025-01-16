export class StorySystem {
      constructor() {
        this.paths = {
          findingHerself: {
            probability: 65,
            triggers: ['travel', 'adventure', 'explore', 'backpack'],
            milestones: [
              { threshold: 20, prompt: "I've been thinking about that UK trip..." },
              { threshold: 40, prompt: "Mum's worried about me traveling alone..." },
              { threshold: 60, prompt: "I've started looking at hostels in London..." }
            ]
          },
          traditionalPath: {
            probability: 29,
            triggers: ['study', 'university', 'degree', 'career'],
            milestones: [
              { threshold: 20, prompt: "Maybe I should just go to uni..." },
              { threshold: 40, prompt: "My teachers keep saying I should study..." },
              { threshold: 60, prompt: "I've been looking at uni brochures..." }
            ]
          },
          awarenessFuture: {
            probability: 5,
            triggers: ['future', 'time', 'predict', 'technology'],
            milestones: [
              { threshold: 20, prompt: "Sometimes I wonder what the future holds..." },
              { threshold: 40, prompt: "Do you think we'll have flying cars?" },
              { threshold: 60, prompt: "I had the strangest dream about the future..." }
            ]
          },
          fallingInLove: {
            probability: 1,
            triggers: ['love', 'romance', 'crush', 'relationship'],
            milestones: [
              { threshold: 20, prompt: "Do you believe in love at first sight?" },
              { threshold: 40, prompt: "I think I might have a crush..." },
              { threshold: 60, prompt: "I've never felt this way before..." }
            ]
          }
        };
      }

      updateProbabilities(conversationTopics) {
        for (const topic of conversationTopics) {
          for (const path in this.paths) {
            if (this.paths[path].triggers.includes(topic)) {
              this.paths[path].probability += 5;
              // Decrease other paths
              for (const otherPath in this.paths) {
                if (otherPath !== path) {
                  this.paths[otherPath].probability = Math.max(0, this.paths[otherPath].probability - 2);
                }
              }
            }
          }
        }
      }

      getCurrentPath() {
        return Object.entries(this.paths).reduce((a, b) => 
          a[1].probability > b[1].probability ? a : b
        )[0];
      }

      getStoryPrompt(currentPath, progress) {
        const path = this.paths[currentPath];
        const milestone = path.milestones
          .reverse()
          .find(m => progress >= m.threshold);
        return milestone ? milestone.prompt : null;
      }
    }
