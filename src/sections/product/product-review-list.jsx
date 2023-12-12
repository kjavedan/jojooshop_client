import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import ProductReviewItem from './product-review-item';

// ----------------------------------------------------------------------

export default function ProductReviewList({ reviews }) {
  return (
    <Box pb={5}>
      {reviews.map((review) => (
        <ProductReviewItem key={review._id} review={review} />
      ))}
    </Box>
  );
}

ProductReviewList.propTypes = {
  reviews: PropTypes.array,
};
