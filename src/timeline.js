export class Timeline {
      constructor() {
        this.startDate = new Date(1997, 10, 17);
        this.currentDate = new Date(1997, 10, 17);
        this.endDate = new Date(1998, 2, 15);
      }

      advance(days = 1) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
        return this.currentDate;
      }

      isEndDateReached() {
        return this.currentDate >= this.endDate;
      }

      getFormattedDate() {
        return this.currentDate.toLocaleDateString('en-AU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
