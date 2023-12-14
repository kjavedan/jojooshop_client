import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import { ProductShopDetailsView } from 'src/sections/product/view';
import { useTranslate } from 'src/locales'; // Adjust the import path as needed

// ----------------------------------------------------------------------

export default function ProductShopDetailsPage() {
  const { t } = useTranslate();
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title>{t('productDetails')}</title>
      </Helmet>

      <ProductShopDetailsView id={`${id}`} />
    </>
  );
}
