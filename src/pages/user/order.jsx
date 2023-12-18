import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { UserOrderDetailsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('orders')}: {t('details')}
        </title>
      </Helmet>

      <UserOrderDetailsView />
    </>
  );
}
