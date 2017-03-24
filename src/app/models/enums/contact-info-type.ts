export enum ContactInfoType {
  NONE = 0,
  PHONE = 1,
  FAX = 2,
  EMAIL = 3
};


let displayTexts = {
  [ContactInfoType.NONE]: 'None',
  [ContactInfoType.PHONE]: 'Phone',
  [ContactInfoType.FAX]: 'Fax',
  [ContactInfoType.EMAIL]: 'Email'
};

export namespace ContactInfoType {
  export function displayText(type: ContactInfoType): string {
    return displayTexts[type];
  }
}
