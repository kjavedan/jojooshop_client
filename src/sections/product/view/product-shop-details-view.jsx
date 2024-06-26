import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useLocales, useTranslate } from 'src/locales';

import { useGetProduct } from 'src/api/product';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CartIcon from '../common/cart-icon';
import { useCheckoutContext } from '../../checkout/context';
import ProductDetailsReview from '../product-details-review';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';

// ----------------------------------------------------------------------

export default function ProductShopDetailsView({ onSetPageTitle }) {
  const { t } = useTranslate();

  const SUMMARY = [
    {
      title: t('original100Percent'),
      description: t('original100PercentDescription'),
      icon: 'solar:verified-check-bold',
    },
    {
      title: t('replacement10Days'),
      description: t('replacement10DaysDescription'),
      icon: 'solar:clock-circle-bold',
    },
    {
      title: t('warrantyYear'),
      description: t('warrantyYearDescription'),
      icon: 'solar:shield-check-bold',
    },
  ];

  const settings = useSettingsContext();

  const { lang } = useLocales();

  const checkout = useCheckoutContext();

  const [currentTab, setCurrentTab] = useState('description');

  const params = useParams();

  const { id } = params;

  const { product, productLoading, productError } = useGetProduct(id);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    if (product) {
      onSetPageTitle(product.name);
    }
  }, [product, onSetPageTitle]);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.product.category(product?.category)}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          {t('backToList')}
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <CustomBreadcrumbs
        links={[
          { name: t('home'), href: '/' },
          {
            name: t('shop'),
            href: paths.product.category(product?.category),
          },
          { name: product?.name[lang] },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            product={product}
            items={checkout.items}
            onAddCart={checkout.onAddToCart}
            onGotoStep={checkout.onGotoStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: t('description'),
            },
            {
              value: 'reviews',
              label: `${t('reviews')} (${product?.reviews?.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {currentTab === 'description' && (
          <ProductDetailsDescription description={product?.description[lang]} />
        )}

        {currentTab === 'reviews' && (
          <ProductDetailsReview
            rate={product?.rate}
            reviews={product?.reviews}
            totalReviews={product?.reviews?.length}
          />
        )}
      </Card>
    </>
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      {productLoading && renderSkeleton}

      {productError && renderError}

      {product && !productLoading && renderProduct}
    </Container>
  );
}

ProductShopDetailsView.propTypes = {
  onSetPageTitle: PropTypes.func,
};
