import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import { AddressItem, AddressNewForm } from '../address';
import { useAuthContext } from 'src/auth/hooks';
import useAddressBook from '../user/hooks/address-book';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  const checkout = useCheckoutContext();
  const { t } = useTranslate();
  const addressForm = useBoolean();

  const { user } = useAuthContext();

  const { handleAddAddressToAddressBook, handleDeleteAddress } = useAddressBook();

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12}>
          {user.addressBook.map((address, index) => (
            <AddressItem
              key={address._id}
              address={address}
              action={
                <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                  {!address.primary && (
                    <Button
                      size="small"
                      color="error"
                      sx={{ mr: 1 }}
                      onClick={() => handleDeleteAddress(index)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => checkout.onCreateBilling(address)}
                  >
                    {t('deliverToThisAddress')}
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

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              {t('back')}
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={addressForm.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('newAddress')}
            </Button>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutSummary
            total={checkout.total}
            subTotal={checkout.subTotal}
            discount={checkout.discount}
          />
        </Grid>
      </Grid>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={handleAddAddressToAddressBook}
      />
    </>
  );
}
