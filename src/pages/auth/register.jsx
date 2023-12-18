import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { RegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('jojooshop')} : {t('register')}
        </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
