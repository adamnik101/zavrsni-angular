import { IsPlaylistOwnerPipe } from './is-playlist-owner.pipe';

describe('IsPlaylistOwnerPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPlaylistOwnerPipe();
    expect(pipe).toBeTruthy();
  });
});
