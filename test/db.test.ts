import * as fs from 'node:fs';

describe('Database', () => {
  let file: fs.Stats;
  beforeAll(async () => {
    const filePath = process.cwd() + '/storage/movielist.csv';
    file = fs.statSync(filePath);
  });

  it('should be unmodified', async () => {
    expect(file.mtime).toEqual(new Date('2024-03-15T20:39:24.438Z'));
  });

  it('should be the same size', async () => {
    expect(file.size).toEqual(16469);
  });
});
