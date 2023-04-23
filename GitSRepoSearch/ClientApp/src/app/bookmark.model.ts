import { v4 as uuidv4 } from 'uuid';

export class Bookmark {
  public id: string;

  public name: string;
  public avatar_url: string;
  public imagePath: string;
  public date = new Date();

  constructor(name: string, avatar_url: string, imagePath: string, date: Date) {
    this.id = uuidv4();
    this.name = name;
    this.avatar_url = avatar_url;
    this.imagePath = imagePath;
    this.date = date;
  }
}
