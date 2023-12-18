import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider from 'src/components/hook-form';

import { useLocales, useTranslate } from 'src/locales';
import IncrementerButton from './common/incrementer-button';
import { useCurrencyConverter } from 'src/utils/currency-exchanger';

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();
  const { t } = useTranslate();
  const { lang } = useLocales();

  const { fCurrency } = useCurrencyConverter();
  const {
    _id,
    name,
    // sizes,
    imgUrls,
    colors,
    discount,
    newLabel,
    available,
    stock,
    priceSale,
    saleLabel,
    rate,
    reviews,
    subDescription,
    discountedPrice,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(_id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === _id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id: _id,
    name,
    coverUrl: imgUrls[0].url,
    available: stock,
    price: priceSale,
    discountedPrice: discount ? discountedPrice : null,
    discount,
    colors: colors[0],
    quantity: available < 1 ? 0 : 1,
    stock,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.checkout.root);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        colors: [values.colors],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h2' }}>
      {!!discount && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(discount ? discountedPrice : priceSale)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        {t('favorite')}
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        {t('share')}
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="h3" sx={{ flexGrow: 1 }}>
        {t('color')}
      </Typography>
      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            singleSelect={true}
            onSelectColor={(color) => field.onChange(color)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="h3" sx={{ flexGrow: 1 }}>
        {t('quantity')}
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= stock}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          {t('available')}: {stock - values.quantity}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {t('addToCart')}
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        {t('buyNow')}
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription[lang]}
    </Typography>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={rate} precision={0.1} readOnly sx={{ mr: 1 }} />
      {!reviews?.length
        ? t('noReview')
        : reviews === 1
        ? 1 + t('review')
        : `${fShortenNumber(reviews?.length)} ${t('reviews')}`}
    </Stack>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && (
        <Label color="info">{newLabel.content ? newLabel.content[lang] : 'new'}</Label>
      )}
      {saleLabel.enabled && (
        <Label color="error">{saleLabel.content ? saleLabel.content[lang] : 'sale'}</Label>
      )}
      {discount && (
        <Label color="error">
          %{discount} {t('discount')}
        </Label>
      )}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color: (stock <= 0 && 'error.main') || stock < 20 ? 'warning.main' : 'success.main',
      }}
    >
      {(stock <= 0 && t('outOfStock')) || stock < 20 ? t('lowStock') : t('inStock')}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Typography variant="h1">{name[lang]}</Typography>

          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {renderShare}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  items: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
