import { User } from './user';

export class Article {
  constructor(public _id: string, public title: string, public body: string,
              public author: User, public date_created: Date, public date_updated: Date) { }
}
