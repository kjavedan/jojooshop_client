import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import FormProvider, {
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function AddressNewForm({ open, onClose, onCreate }) {
  const { t } = useTranslate();

  const NewAddressSchema = Yup.object().shape({
    name: Yup.string().required(t('fullNameRequired')),
    phoneNumber: Yup.string().required(t('phoneNumberRequired')),
    address: Yup.string().required(t('addressRequired')),
    city: Yup.string().required(t('cityRequired')),
    state: Yup.string().required(t('stateRequired')),
    country: Yup.string().required(t('countryRequried')),
    zipCode: Yup.string().required(t('zipCodeRequried')),
    // not required
    addressType: Yup.string(),
    primary: Yup.boolean(),
  });

  const defaultValues = {
    name: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    primary: true,
    phoneNumber: '',
    addressType: 'Home',
    country: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      onCreate({
        name: data.name,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        primary: data.primary,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{t('newAddress')}</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="addressType"
              options={[
                { label: t('home'), value: 'home' },
                { label: t('office'), value: 'office' },
              ]}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label={t('fullName')} />

              <RHFTextField name="phoneNumber" label={t('phoneNumber')} />
            </Box>

            <RHFTextField name="address" label={t('address')} />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="city" label={t('city')} />

              <RHFTextField name="state" label={t('state')} />

              <RHFTextField name="zipCode" label={t('zipCode')} />
            </Box>

            <RHFAutocomplete
              name="country"
              label={t('country')}
              options={countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
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

            <RHFCheckbox name="primary" label={t('useAddressAsDefault')} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('deliverToThisAddress')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

AddressNewForm.propTypes = {
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  open: PropTypes.bool,
};
