import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import FormProvider from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import CheckoutDelivery from './checkout-delivery';
import LoginToProceed from '../auth/login-to-proceed';
import CheckoutBillingInfo from './checkout-billing-info';
import CheckoutPaymentMethods from './checkout-payment-methods';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

export default function CheckoutPayment() {
  const { t } = useTranslate();

  const DELIVERY_OPTIONS = [
    {
      value: 0,
      speedy: t('free'),
      description: t('deliveryOption5To7Days'),
      trackingNumber: 'SPX037739199373',
    },
    {
      value: 10,
      speedy: t('standard'),
      description: t('deliveryOption3To5Days'),
      trackingNumber: 'SPX037739199373',
    },
    {
      value: 20,
      speedy: t('express'),
      description: t('deliveryOption2To3Days'),
      trackingNumber: 'SPX037739199373',
    },
  ];

  const PAYMENT_OPTIONS = [
    {
      value: 'paypal',
      label: t('payWithPaypal'),
      description: t('paypalDescription'),
    },
    {
      value: 'credit',
      label: t('creditDebitCard'),
      description: t('creditDebitCardDescription'),
    },
    {
      value: 'cash',
      label: t('cash'),
      description: t('cashDescription'),
    },
  ];

  const checkout = useCheckoutContext();
  const { items, billing, shipping } = checkout;
  const { addressType, fullAddress, phoneNumber } = billing;
  const { user, authenticated } = useAuthContext();

  const login = useBoolean();

  const PaymentSchema = Yup.object().shape({
    payment: Yup.object().shape({
      cardType: Yup.string().required(t('cardTypeRequired')),
      cardNumber: Yup.string().required(t('cardNumberRequired')),
    }),
    delivery: Yup.object().shape({
      speedy: Yup.string().required(t('shipByRequired')),
    }),
  });

  const defaultValues = {
    userId: user?._id,
    products: items.map((item) => ({ productId: item.id, qty: item.quantity })),
    shippingAddress: {
      fullAddress,
      phoneNumber,
      addressType,
    },
    shippingPrice: shipping.value,
    payment: {},
    delivery: {
      shipBy: 'BHL',
      speedy: 'Free',
      trackingNumber: 'SPX037739199373',
    },
  };

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (authenticated) {
        checkout.onNextStep();
        checkout.onReset();
        console.info('DATA', data);
        axios.post(endpoints.order.add, data);
      } else {
        login.onTrue();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <CheckoutDelivery
              onApplyShipping={checkout.onApplyShipping}
              options={DELIVERY_OPTIONS}
            />

            <CheckoutPaymentMethods
              cardOptions={CARDS_OPTIONS}
              options={PAYMENT_OPTIONS}
              sx={{ my: 3 }}
            />

            <Button
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              {t('back')}
            </Button>
          </Grid>

          <Grid xs={12} md={4}>
            <CheckoutBillingInfo billing={checkout.billing} onBackStep={checkout.onBackStep} />

            <CheckoutSummary
              total={checkout.total}
              subTotal={checkout.subTotal}
              discount={checkout.discount}
              shipping={checkout.shipping}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {t('completeOrder')}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
      <LoginToProceed open={login.value} onClose={login.onFalse} returnTo={paths.checkout.root} />
    </>
  );
}
