import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  const { t } = useTranslate();

  return (
    <Button component={RouterLink} href={paths.auth.login} variant="outlined" sx={{ mr: 1, ...sx }}>
      {t('login')}
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
