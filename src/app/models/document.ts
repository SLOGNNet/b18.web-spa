import { generateNewId } from './utils';
import { JsonMember, JsonObject } from 'typedjson-npm/src/typed-json';

@JsonObject
export class Document {
  @JsonMember
  id: number = 0;
  @JsonMember
  type: string = '';
  @JsonMember
  issueDate: string = '';
  @JsonMember
  url: string = '';
  file: File;

  static create(): Document{
    const result = new Document();
    result.id = generateNewId();
    return result;
  }

  constructor() {

  }
}
