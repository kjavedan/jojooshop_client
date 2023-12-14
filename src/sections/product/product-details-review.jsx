import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import { paths } from 'src/routes/paths';
import { useParams } from 'react-router-dom';

import { useTranslate } from 'src/locales';

import ProductReviewList from './product-review-list';
import ProductReviewNewForm from './product-review-new-form';
import { useAuthContext } from 'src/auth/hooks';
import LoginToProceed from '../auth/login-to-proceed';

// ----------------------------------------------------------------------

export default function ProductDetailsReview({ totalReviews, rate, reviews }) {
  const { t } = useTranslate();
  const params = useParams();
  const { id: productId } = params;
  const { authenticated } = useAuthContext();
  const reviewDialog = useBoolean();
  const login = useBoolean();

  const handleAddReview = useCallback(() => {
    if (authenticated) {
      reviewDialog.onTrue();
    } else {
      //pass the returnTo string to the login
      login.onTrue();
    }
  }, [reviewDialog, login, authenticated]);
  const renderSummary = (
    <Stack p={2} spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">{t('averageRating')}</Typography>

      <Typography variant="h2">{rate}/5</Typography>

      <Rating readOnly value={rate} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {!totalReviews
          ? t('noReview')
          : reviews === 1
          ? 1 + t('review')
          : `${fShortenNumber(totalReviews)} ${t('reviews')}`}
      </Typography>
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={handleAddReview}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        {t('writeYourReview')}
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 2 },
          px: { md: 4, xl: 0 },
        }}
      >
        {renderSummary}

        {renderReviewButton}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ProductReviewList reviews={reviews} />

      <ProductReviewNewForm
        open={reviewDialog.value}
        onClose={reviewDialog.onFalse}
        currentReview={false}
      />

      <LoginToProceed
        open={login.value}
        onClose={login.onFalse}
        returnTo={paths.product.root + '/' + productId}
      />
    </>
  );
}

ProductDetailsReview.propTypes = {
  rate: PropTypes.number,
  reviews: PropTypes.array,
  totalReviews: PropTypes.number,
};
