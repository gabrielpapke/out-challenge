import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  it('create an instance', () => {
    const pipe = new YesNoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "Yes" description', () => {
    const pipe = new YesNoPipe();

    const result = pipe.transform(true);
    expect(result).toEqual('Yes');
  });

  it('should return "No" description', () => {
    const pipe = new YesNoPipe();

    const result = pipe.transform(false);
    expect(result).toEqual('No');
  });
});
