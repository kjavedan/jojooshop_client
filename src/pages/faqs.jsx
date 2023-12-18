import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { FaqsView } from 'src/sections/faqs/view';

// ----------------------------------------------------------------------

export default function FaqsPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('jojooshop')} : {t('faqs')}
        </title>
      </Helmet>

      <FaqsView />
    </>
  );
}
