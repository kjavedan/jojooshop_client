import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { useLocales } from 'src/locales';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  const { lang } = useLocales();

  const [pageTitle, setPageTitle] = useState({ title: { en: '', ar: '', fa: '', cn: '' } });

  const handlePageTitle = useCallback(
    (newVal) => {
      setPageTitle(newVal);
    },
    [setPageTitle]
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle[lang]}</title>
        <meta
          name="description"
          content={`jojoshop lighting categories: ${pageTitle[lang]} start shopping now`}
        />
      </Helmet>

      <ProductShopView pageTitle={pageTitle} onSetPageTitle={handlePageTitle} />
    </>
  );
}
