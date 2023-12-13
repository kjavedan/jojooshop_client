import { useSnackbar } from 'notistack';

import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { useGoogleLogin } from '@react-oauth/google';

import Iconify from 'src/components/iconify';

export default function GoogleAuth() {
  const { t } = useTranslate();
  const googleLoading = useBoolean();
  const { googleLogin } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (googleRes) => {
      try {
        googleLoading.onTrue();
        await googleLogin({ Authorization: googleRes.code });
        googleLoading.onFalse();
      } catch (error) {
        googleLoading.onFalse();
        enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
      }
    },
    flow: 'auth-code',
  });

  return (
    <>
      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="outlined"
        onClick={() => handleGoogleLogin()}
        loading={googleLoading.value}
        endIcon={<Iconify icon="flat-color-icons:google" />}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        Google
      </LoadingButton>
    </>
  );
}
