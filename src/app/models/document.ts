export class Document {
  id: number = 0;
  type: string = '';
  issueDate: string = '';
  url: string = '';
  file: File;

  static create(): Document{
    const result = new Document();
    return result;
  }

  constructor() {

  }
}
