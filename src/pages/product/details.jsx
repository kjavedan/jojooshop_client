import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';

import { useLocales, useTranslate } from 'src/locales';

import { ProductShopDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductShopDetailsPage() {
  const { t } = useTranslate();
  const { lang } = useLocales();

  const [pageTitle, setPageTitle] = useState(null);

  const handlePageTitle = useCallback(
    (newVal) => {
      setPageTitle(newVal);
    },
    [setPageTitle]
  );

  return (
    <>
      <Helmet>
        <title>
          {t('productDetails')}: {(pageTitle && pageTitle[lang]) || ''}
        </title>
      </Helmet>

      <ProductShopDetailsView onSetPageTitle={handlePageTitle} />
    </>
  );
}
