import { ProfileService } from './profile.service';

describe('ProfileService.findMain', () => {
  const findUnique = jest.fn();
  const service = new ProfileService({ profile: { findUnique } } as never);

  beforeEach(() => {
    findUnique.mockReset();
  });

  it('reads the single profile by its reserved slug instead of scanning all rows', async () => {
    findUnique.mockResolvedValue(null);
    await service.findMain();

    expect(findUnique).toHaveBeenCalledTimes(1);
    expect(findUnique.mock.calls[0][0].where).toEqual({ slug: 'main' });
  });

  it('pulls contacts ordered by position so the resume renders in curated order', async () => {
    findUnique.mockResolvedValue(null);
    await service.findMain();

    expect(findUnique.mock.calls[0][0].include).toEqual({
      contacts: { orderBy: { position: 'asc' } },
    });
  });

  it('resolves to null when the slug is absent, letting the resolver decide the error', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.findMain()).resolves.toBeNull();
  });
});