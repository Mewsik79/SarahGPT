export class KnowledgeBase {
      constructor() {
        this.allowedTopics = new Set([
          // Music
          'Silverchair', 'Powderfinger', 'Oasis', 'Blur', 'Nirvana',
          // Technology
          'Nokia 6110', 'Windows 95', 'Tamagotchi', 'PlayStation',
          // Events
          'Princess Diana', 'Hong Kong handover', 'Mars Pathfinder',
          // Australian Culture
          'Neighbours', 'Home and Away', 'AC/DC', 'INXS'
        ]);
      }

      validateTopic(topic) {
        return this.allowedTopics.has(topic);
      }

      getRandomFact() {
        const facts = [
          "Did you know Silverchair just released their new album?",
          "I'm saving up for a Nokia 6110 - it's got Snake!",
          "Mum's been watching Neighbours every night",
          "I can't believe Princess Diana died this year"
        ];
        return facts[Math.floor(Math.random() * facts.length)];
      }
    }
