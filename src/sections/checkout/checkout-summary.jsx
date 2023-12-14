import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useCurrencyConverter } from 'src/utils/currency-exchanger';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function CheckoutSummary({
  total,
  discount,
  subTotal,
  shipping,
  //
  onApplyDiscount,
}) {
  const { t } = useTranslate();
  const { fCurrency } = useCurrencyConverter();
  const displayShipping = shipping?.value !== null ? t('free') : '-';

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title={t('orderSummary')} />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('subTotal')}
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subTotal)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('discount')}
            </Typography>
            <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('shipping')}
            </Typography>
            <Typography variant="subtitle2">
              {shipping?.value ? fCurrency(shipping?.value) : displayShipping}
            </Typography>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">{t('total')}</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                ({t('vatIncluded')})
              </Typography>
            </Box>
          </Stack>

          {onApplyDiscount && (
            <TextField
              fullWidth
              placeholder={t('discountPlaceholder')}
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                      {t('apply')}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  shipping: PropTypes.object,
  subTotal: PropTypes.number,
  onApplyDiscount: PropTypes.func,
};
