import { toGlobalId, fromGlobalId } from './globalId';

describe('global ID', () => {
  test('to and from globalId undo each other', async () => {
    expect(
      fromGlobalId(toGlobalId({ id: 'me@email.com', type: 'subscriber' }))
    ).toEqual({
      id: 'me@email.com',
      type: 'subscriber',
    });
  });
});
