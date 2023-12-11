import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { endpoints } from 'src/utils/axios';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { _addressBooks } from 'src/_mock';

import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';

import { AddressItem, AddressNewForm } from '../address';
// ----------------------------------------------------------------------

export default function UserEditForm() {
  const { t } = useTranslate();
  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const editUserSchema = Yup.object().shape({
    status: Yup.string().required(t('statusRequired')),
    address: Yup.string().required(t('addressRequired')),
    country: Yup.string().required(t('countryRequired')),
    fullName: Yup.string().required(t('fullNameRequired')),
    phoneNumber: Yup.string().required(t('phoneNumberRequired')),
    picture: Yup.mixed().nullable(),
  });

  const passwordForm = useBoolean();
  const addressForm = useBoolean();

  const defaultValues = useMemo(
    () => ({
      id: user?._id,
      email: user?.email,
      address: user?.address,
      country: user?.country,
      picture: user?.picture,
      fullName: user?.fullName,
      phoneNumber: user?.phoneNumber,
      addressBook: user?.addressBook,
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(endpoints.user.update(defaultValues.id), data);
      if (res.status === 200) {
        enqueueSnackbar(t('updateSuccess'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        enqueueSnackbar(t('emailExists'), {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      }
      console.log(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('picture', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar
                  name="picture"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      {t('allowedFileTypes')}
                      <br /> {t('maxSize', { size: fData(3145728) })}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Card sx={{ p: 3, pt: 6 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="fullName" label={t('fullName')} />
                <RHFTextField name="phoneNumber" label={t('phoneNumber')} />

                <RHFAutocomplete
                  name="country"
                  label={t('country')}
                  options={countries.map((country) => country.label)}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderOption={(props, option) => {
                    const { code, label, phone } = countries.filter(
                      (country) => country.label === option
                    )[0];

                    if (!label) {
                      return null;
                    }

                    return (
                      <li {...props} key={label}>
                        <Iconify
                          key={label}
                          icon={`circle-flags:${code.toLowerCase()}`}
                          width={28}
                          sx={{ mr: 1 }}
                        />
                        {label} ({code}) +{phone}
                      </li>
                    );
                  }}
                />

                <RHFTextField name="address" label={t('address')} />
              </Box>

              <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 3 }}>
                <Button
                  size="small"
                  sx={{ textDecoration: 'underline' }}
                  onClick={passwordForm.onTrue}
                  startIcon={<Iconify icon="uim:lock" />}
                >
                  update password
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="inherit"
                  loading={isSubmitting}
                >
                  {t('saveChanges')}
                </LoadingButton>
              </Stack>
            </Card>
            <Stack mt={3}>
              <Typography variant="h6" mb={1}>
                Address Book
              </Typography>
              {user?.addressBook?.map((address) => (
                <AddressItem
                  key={address._id}
                  address={address}
                  action={
                    <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                      <Button size="small" color="error" sx={{ mr: 1 }}>
                        Delete
                      </Button>
                    </Stack>
                  }
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: (theme) => theme.customShadows.card,
                  }}
                />
              ))}

              <Stack direction="row" justifyContent="right">
                <Button
                  size="small"
                  color="primary"
                  onClick={addressForm.onTrue}
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  New Address
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={() => console.log('create')}
      />
    </>
  );
}

UserEditForm.propTypes = {};
