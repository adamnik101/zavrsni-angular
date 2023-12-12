import { HumanizeDatePipe } from './humanize-date.pipe';

describe('HumanizeDatePipe', () => {
  it('create an instance', () => {
    const pipe = new HumanizeDatePipe();
    expect(pipe).toBeTruthy();
  });
});
