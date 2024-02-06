import { EditorMode } from './constants';
import { getMigratedOptions } from './migration';
import { PanelOptions } from './types';

describe('Migrations', () => {
  it('Should return panel options', () => {
    const options: Partial<PanelOptions> = {
      editorMode: EditorMode.VISUAL,
    };

    expect(
      getMigratedOptions({
        options: options,
      } as any)
    ).toEqual(options);
  });

  describe('5.2.0', () => {
    it('Should set code to editor mode if not defined', () => {
      expect(
        getMigratedOptions({
          options: {},
        } as any)
      ).toEqual({
        editorMode: EditorMode.CODE,
      });
    });
  });
});
