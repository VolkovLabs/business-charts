import React from 'react';

const actual = jest.requireActual('@grafana/ui');

/**
 * Mock Select component
 */
const Select = jest.fn(({ options, onChange, value, isMulti, isClearable, ...restProps }) => (
  <select
    onChange={(event: any) => {
      if (onChange) {
        if (isMulti) {
          onChange(options.filter((option: any) => event.target.values.includes(option.value)));
        } else {
          /**
           * Mock Select clear call
           */
          if (event.target.value === 'clear') {
            onChange('');
          }
          const option = options.find((option: any) => option.value === event.target.value);
          option && onChange(option);
        }
      }
    }}
    /**
     * Fix jest warnings because null value.
     * For Select component in @grafana/ui should be used null to reset value.
     */
    value={value === null ? '' : value?.value || value}
    multiple={isMulti}
    {...restProps}
  >
    {isClearable && (
      <option key="clear" value="clear">
        Clear
      </option>
    )}
    {options.map(({ label, value }: any) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
));

module.exports = {
  ...actual,
  Select,
};
