export class Budget {
  id: string;
  name: string;
  last_modified_on: string;

  date_format: {
    format: string;
  };

  currency_format: {
    iso_code: string;
    example_format: string;
    decimal_digits: 0;
    decimal_separator: string;
    symbol_first: true;
    group_separator: string;
    currency_symbol: string;
    display_symbol: true
  };

}
