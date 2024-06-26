import { useCallback } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import EmptyContent from 'src/components/empty-content';

import { useAuthContext } from 'src/auth/hooks';
import { useCheckoutContext } from './context';

import { useTranslate } from 'src/locales';

import CheckoutSummary from './checkout-summary';
import CheckoutCartProductList from './checkout-cart-product-list';
import LoginToProceed from '../auth/login-to-proceed';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const checkout = useCheckoutContext();
  const { t } = useTranslate();

  const { authenticated } = useAuthContext();

  const login = useBoolean();

  const empty = !checkout.items.length;

  const handleCheckout = useCallback(() => {
    if (authenticated) {
      checkout.onNextStep();
    } else {
      login.onTrue();
    }
  }, [authenticated, checkout, login]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={
                <Typography variant="h5">
                  {t('cart')}
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                    &nbsp;({checkout.totalItems} {t('item')})
                  </Typography>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {empty ? (
              <EmptyContent
                title={t('item')}
                description={t('shoppingDescription')}
                imgUrl="/assets/icons/empty/ic_cart.svg"
                sx={{ pt: 5, pb: 10 }}
              />
            ) : (
              <CheckoutCartProductList
                products={checkout.items}
                onDelete={checkout.onDeleteCart}
                onIncreaseQuantity={checkout.onIncreaseQuantity}
                onDecreaseQuantity={checkout.onDecreaseQuantity}
              />
            )}
          </Card>

          <Button
            component={RouterLink}
            href={paths.product.root}
            color="inherit"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            {t('continueShopping')}
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutSummary
            total={checkout.total}
            discount={checkout.discount}
            subTotal={checkout.subTotal}
            onApplyDiscount={checkout.onApplyDiscount}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={empty}
            onClick={handleCheckout}
          >
            {t('checkout')}
          </Button>
        </Grid>
      </Grid>

      <LoginToProceed open={login.value} onClose={login.onFalse} returnTo={paths.checkout.root} />
    </>
  );
}
