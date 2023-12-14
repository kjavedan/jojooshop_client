import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

import CheckoutCartProduct from './checkout-cart-product';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const { t } = useTranslate();

  const TABLE_HEAD = [
    { id: 'product', label: t('product') },
    { id: 'discount', label: t('discount') },
    { id: 'price', label: t('price') },
    { id: 'discountedPrice', label: t('discountedPrice') },
    { id: 'quantity', label: t('quantity') },
    { id: 'totalAmount', label: t('totalPrice'), align: 'right' },
    { id: '' },
  ];
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {products.map((row, index) => (
              <CheckoutCartProduct
                key={index}
                row={row}
                onDelete={() => onDelete(row.id)}
                onDecrease={() => onDecreaseQuantity(row.id)}
                onIncrease={() => onIncreaseQuantity(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};
