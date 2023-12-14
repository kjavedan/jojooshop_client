import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import IncrementerButton from '../product/common/incrementer-button';
import { useLocales, useTranslate } from 'src/locales';
import { useCurrencyConverter } from 'src/utils/currency-exchanger';

// ----------------------------------------------------------------------

export default function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  const { lang } = useLocales();
  const { t } = useTranslate();

  const { fCurrency } = useCurrencyConverter();
  const { name, discount, price, discountedPrice, colors, coverUrl, quantity, stock } = row;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant="rounded"
          alt={name.en}
          src={coverUrl}
          sx={{ width: 64, height: 64, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name[lang]}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            {t('color')}:
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
            <ColorPreview colors={colors} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>
        <Label color={discount ? 'error' : 'default'}>{discount ? `${discount}%` : '------'}</Label>
      </TableCell>
      <TableCell>{fCurrency(price)}</TableCell>
      <TableCell>{fCurrency(discountedPrice) || '---------'}</TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= stock}
          />

          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            {t('available')}: {stock - quantity}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">
        {fCurrency((discount ? discountedPrice : price) * quantity)}
      </TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};
