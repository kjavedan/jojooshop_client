import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { AboutView } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('jojooshop')} : {t('aboutUs')}
        </title>
      </Helmet>

      <AboutView />
    </>
  );
}
