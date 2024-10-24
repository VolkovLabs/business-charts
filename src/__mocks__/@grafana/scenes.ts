/**
 * Mock @grafana/scenes
 * mostly prevent IntersectionObserver is not defined
 */
jest.mock('@grafana/scenes', () => ({
  sceneGraph: {},
}));
