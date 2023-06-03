import { MapApi } from './constants';
import { loadBaidu, loadGaode, loadGoogle } from './maps';

/**
 * Maps
 */
describe('Maps', () => {
  beforeAll(() => {
    jest.spyOn(document.body, 'appendChild');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Baidu
   */
  describe('Baidu', () => {
    it('Should insert script tag', () => {
      const key = '123';
      const callback = 'func';

      loadBaidu({ key, callback });

      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(MapApi.baidu),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(key),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(callback),
        })
      );
    });

    it('Should not re-initialize files twice', () => {
      (window as any).BMap = true;
      loadBaidu({} as any);
      expect(document.body.appendChild).not.toBeCalled();
      delete (window as any).BMap;
    });
  });

  /**
   * Gaode
   */
  describe('Gaode', () => {
    it('Should insert script tag', () => {
      const key = '123';
      const plugin = 'func';

      loadGaode({ key, plugin });

      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(MapApi.gaode),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(key),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(plugin),
        })
      );
    });

    it('Should not re-initialize files twice', () => {
      (window as any).AMap = true;
      loadGaode({} as any);
      expect(document.body.appendChild).not.toBeCalled();
      delete (window as any).AMap;
    });
  });

  /**
   * Google
   */
  describe('Google', () => {
    it('Should insert script tag', () => {
      const key = '123';
      const callback = 'func';

      loadGoogle({ key, callback });

      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(MapApi.google),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(key),
        })
      );
      expect(document.body.appendChild).toBeCalledWith(
        expect.objectContaining({
          src: expect.stringContaining(callback),
        })
      );
    });

    it('Should not re-initialize files twice', () => {
      (window as any).google = {
        maps: {},
      };
      loadGoogle({} as any);
      expect(document.body.appendChild).not.toBeCalled();
      delete (window as any).google;
    });
  });
});
