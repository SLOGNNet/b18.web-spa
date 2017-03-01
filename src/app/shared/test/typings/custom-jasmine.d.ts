declare namespace jasmine {
  interface Matchers {
    toHaveCssClass(expected: any): boolean;
    toDeepEqual(actual: any, expected: any): boolean;
  }
}
