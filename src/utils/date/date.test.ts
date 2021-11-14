import { getNextYear } from '.';

const TODAY = new Date('2020-01-01');

describe('getNextYear', () => {
  beforeAll(() => jest.useFakeTimers().setSystemTime(TODAY.getTime()));

  it('will return the next year', () => {
    const NEXT_YEAR = new Date('2021-01-01');
    expect(getNextYear()).toBe(NEXT_YEAR.toUTCString());
  });
});
