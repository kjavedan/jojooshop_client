import sumBy from 'lodash/sumBy';
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

import ProductReviewList from './product-review-list';
import ProductReviewNewForm from './product-review-new-form';

// ----------------------------------------------------------------------

export default function ProductDetailsReview({ totalReviews, rate, reviews }) {
  const review = useBoolean();
  console.log(reviews);
  const renderSummary = (
    <Stack p={2} spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">{rate}/5</Typography>

      <Rating readOnly value={rate} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
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

      <ProductReviewNewForm open={review.value} onClose={review.onFalse} />
    </>
  );
}

ProductDetailsReview.propTypes = {
  rate: PropTypes.number,
  reviews: PropTypes.array,
  totalReviews: PropTypes.number,
};
