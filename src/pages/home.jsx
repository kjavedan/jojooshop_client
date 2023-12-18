import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('jojooshop')} : {t('home')}
        </title>
      </Helmet>

      <HomeView />
    </>
  );
}
