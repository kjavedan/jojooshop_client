import fx from 'money';
import numeral from 'numeral';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  if (!number) return '';

  const { lang } = useLocales();

  let currencyCode = 'USD'; // Default currency code
  let currencySymbol = '$'; // Default currency symbol

  switch (lang) {
    case 'en':
      // Keep the default currency code and symbol for English
      break;
    case 'ar':
      currencyCode = 'AED'; // Use the currency code for Arabic
      currencySymbol = 'د.إ'; // Use the currency symbol for Arabic
      break;
    case 'cn':
      currencyCode = 'CNY'; // Use the currency code for Chinese
      currencySymbol = '¥'; // Use the currency symbol for Chinese
      break;
    case 'fa':
      currencyCode = 'IRR'; // Use the currency code for Farsi
      currencySymbol = 'تومان'; // Use the currency symbol for Farsi (Toman symbol)
      break;
    default:
      break;
  }

  // Set the currency code for money.js
  fx.base = 'USD';
  fx.rates = {
    USD: 1,
    AED: 3.67, // Exchange rate for AED
    CNY: 6.43, // Exchange rate for CNY
    IRR: 41905, // Exchange rate for IRR (Iranian Rial)
    // Add more exchange rates as needed
  };
  const convertedValue = fx.convert(number, { from: 'USD', to: currencyCode });

  // Format the converted value with the determined currency symbol
  const formattedValue = convertedValue ? numeral(convertedValue).format(`0,0.00`) : '';
  const result = currencySymbol + formattedValue;
  return result;
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
