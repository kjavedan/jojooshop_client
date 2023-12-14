import * as Yup from 'yup';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';

import { useParams } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';

import { useTranslate } from 'src/locales';

import axios, { endpoints } from 'src/utils/axios';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ProductReviewNewForm({ onClose, currentReview, ...other }) {
  const params = useParams();
  const { id: productId } = params;
  const { user } = useAuthContext();
  const { t } = useTranslate();

  const { enqueueSnackbar } = useSnackbar();

  const ReviewSchema = Yup.object().shape({
    rate: Yup.number().min(1, t('ratingError')),
    comment: Yup.string().required(t('reviewRequired')),
  });

  const defaultValues = {
    rate: currentReview?.rate || 0,
    comment: currentReview?.comment || '',
    picture: user?.picture || '',
    userId: user?._id,
    productId,
    reviewerName: user?.fullName,
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentReview) {
      reset(currentReview);
    }
  }, [reset, currentReview]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await (currentReview
        ? axios.put(endpoints.review.update(currentReview._id), data)
        : axios.post(endpoints.review.add, data));

      mutate(endpoints.product.details(productId));
      reset();
      onClose();
      const successMessage = currentReview ? t('reviewAddSuccess') : t('updateSuccess');

      enqueueSnackbar(successMessage, {
        variant: 'success',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t('somethingWentWrong'), {
        variant: 'error',
      });
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle> {t('addReview')} </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">{t('yourReviewAbout')}:</Typography>

            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <Rating
                  {...field}
                  size="small"
                  value={Number(field.value)}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          </Stack>

          {!!errors.rate && <FormHelperText error> {errors.rate?.message}</FormHelperText>}

          <RHFTextField name="comment" label={t('review')} multiline rows={3} sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('post')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ProductReviewNewForm.propTypes = {
  onClose: PropTypes.func,
  currentReview: PropTypes.any,
};
