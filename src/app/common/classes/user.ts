import { Article } from './article';
import { Comment } from './comment';

export class User {
  constructor(public _id: string, public name: string, public email: string, public rank: number,
              public articles: Article[], public comments: Comment[], public date_created: Date) {}

  get rankName() {
    switch (this.rank) {
      case 0:
        return 'Admin';
      case 1:
        return 'Moderator';
      case 2:
        return 'Member';
    }
  }
}
