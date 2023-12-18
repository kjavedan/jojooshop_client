import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { VerifyView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('jojooshop')} : {t('verify')}
        </title>
      </Helmet>

      <VerifyView />
    </>
  );
}
