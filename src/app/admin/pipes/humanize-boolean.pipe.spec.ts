import { HumanizeBooleanPipe } from './humanize-boolean.pipe';

describe('HumanizeBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanizeBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
