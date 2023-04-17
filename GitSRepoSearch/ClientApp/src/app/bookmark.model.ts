export class Bookmark {
  public name: string;
  public avatar_url: string;
  public imagePath: string;
  public date = new Date();

  constructor(name: string, avatar_url: string, imagePath: string, date: Date) {
    this.name = name;
    this.avatar_url = avatar_url;
    this.imagePath = imagePath;
    this.date = date;
  }
}
