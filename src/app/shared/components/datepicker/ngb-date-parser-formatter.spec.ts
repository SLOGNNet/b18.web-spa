import { NgbDateISOParserFormatter } from './ngb-date-parser-formatter';

describe('ngb-date parsing and formatting', () => {
  let pf: NgbDateISOParserFormatter;
  const format = 'YYYY-MM-DD';
  beforeEach(() => { pf = new NgbDateISOParserFormatter(); });

  describe('parsing', () => {

    it('should parse null undefined and empty string as null', () => {
      expect(pf.parse(null, format)).toBeNull();
      expect(pf.parse(undefined, format)).toBeNull();
      expect(pf.parse('', format)).toBeNull();
      expect(pf.parse('   ', format)).toBeNull();
    });

    it('should parse valid date', () => { expect(pf.parse('2016-05-12', format)).toEqual({year: 2016, month: 5, day: 12}); });

    it('should parse non-date as null', () => {
      expect(pf.parse('foo-bar-baz', format)).toBeNull();
      expect(pf.parse('2014-bar', format)).toBeNull();
      expect(pf.parse('2014-11-12-15', format) === null).toBeTruthy();
    });

    it('should do its best parsing incomplete dates',
       () => { expect(pf.parse('2011-5', format)).toBe(null);
    });
  });

  describe('formatting', () => {

    it('should format null and undefined as an empty string', () => {
      expect(pf.format(null, format)).toBe('');
      expect(pf.format(undefined, format)).toBe('');
    });

    it('should format a valid date', () => { expect(pf.format({year: 2016, month: 10, day: 15}, format)).toBe('2016-10-15'); });

    it('should format a valid date with padding',
       () => { expect(pf.format({year: 2016, month: 10, day: 5}, format)).toBe('2016-10-05'); });

    xit('should try its best with invalid dates', () => {
      expect(pf.format({year: 2016, month: NaN, day: undefined}, format)).toBe('2016--');
      expect(pf.format({year: 2016, month: null, day: 0}, format)).toBe('2016--00');
    });
  });

});
