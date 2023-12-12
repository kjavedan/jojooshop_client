import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import axios, { endpoints } from 'src/utils/axios';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import ProductReviewNewForm from './product-review-new-form';

// ----------------------------------------------------------------------

export default function ProductReviewItem({ review }) {
  const reviewForm = useBoolean();
  const popover = usePopover();
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const {
    _id: reviewId,
    reviewerName,
    rate,
    comment,
    reviewDate,
    picture,
    attachments,
    isPurchased,
    userId,
    productId,
  } = review;

  const handleDelteReview = useCallback(async () => {
    try {
      await axios.delete(endpoints.review.delete(reviewId));
      mutate(endpoints.product.details(productId));
      popover.onClose();
      enqueueSnackbar(t('reviewDeleteSuccess'), {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t('somethingWentWrong'), {
        variant: 'error',
      });
    }
  }, []);

  const renderInfo = (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'row',
        md: 'column',
      }}
      sx={{
        width: { md: 240 },
        textAlign: { md: 'center' },
      }}
    >
      <Avatar
        src={picture}
        sx={{
          width: { xs: 48, md: 64 },
          height: { xs: 48, md: 64 },
        }}
      />

      <ListItemText
        primary={reviewerName}
        secondary={fDate(reviewDate)}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
          mb: 0.5,
        }}
        secondaryTypographyProps={{
          noWrap: true,
          typography: 'caption',
          component: 'span',
        }}
      />
    </Stack>
  );

  const renderContent = (
    <Stack spacing={1} flexGrow={1}>
      <Rating size="small" value={rate} precision={0.1} readOnly />

      {isPurchased && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: 'success.main',
            typography: 'caption',
          }}
        >
          <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
          Verified purchase
        </Stack>
      )}

      <Typography variant="body2">{comment}</Typography>

      {!!attachments?.length && (
        <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ pt: 1 }}>
          {attachments.map((attachment) => (
            <Box
              component="img"
              key={attachment}
              alt={attachment}
              src={attachment}
              sx={{ width: 64, height: 64, borderRadius: 1.5 }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );

  return (
    <>
      <Stack
        spacing={2}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{ mt: 5, px: { xs: 2.5, md: 0 }, position: 'relative' }}
      >
        {renderInfo}

        {renderContent}

        {userId === user._id && (
          <IconButton
            onClick={popover.onOpen}
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose}>
        <MenuItem
          onClick={() => {
            reviewForm.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelteReview} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ProductReviewNewForm
        open={reviewForm.value}
        onClose={reviewForm.onFalse}
        currentReview={review}
      />
    </>
  );
}

ProductReviewItem.propTypes = {
  review: PropTypes.object,
};
