import { Locator } from '@playwright/test';

/**
 * Selector
 */
type LocatorSelector<TArgs extends unknown[]> = (...args: TArgs) => ReturnType<() => Locator>;

/**
 * Check If Selector Object
 */
type IsSelectorObject<TCandidate> = TCandidate extends {
  selector: (...args: unknown[]) => void;
  apply: (...args: unknown[]) => void;
}
  ? TCandidate & { selector: TCandidate['selector']; apply: TCandidate['apply'] }
  : never;

/**
 * Selectors
 */
export type LocatorSelectors<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => void
    ? LocatorSelector<Args>
    : T[K] extends IsSelectorObject<T[K]>
      ? LocatorSelector<Parameters<T[K]['selector']>>
      : LocatorSelector<[]>;
};

export const getLocatorSelectors =
  <TSelectors extends Record<keyof TSelectors, TSelectors[keyof TSelectors]>>(
    selectors: TSelectors
  ): ((locator: Locator) => LocatorSelectors<TSelectors>) =>
  (locator) => {
    return Object.entries(selectors).reduce((acc, [key, selector]) => {
      const getElement = (...args: unknown[]): Locator => {
        const getValue = typeof selector === 'object' && 'selector' in selector! ? selector.selector : selector;
        const value = typeof getValue === 'function' ? getValue(...args) : getValue;

        if (value.startsWith('data-testid')) {
          return locator.getByTestId(value);
        }

        return locator.getByLabel(value);
      };

      return {
        ...acc,
        [key]: getElement,
      };
    }, {} as LocatorSelectors<TSelectors>);
  };
