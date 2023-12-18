import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { useGetProducts, useSearchProducts } from 'src/api/product';
import { PRODUCT_RATING_OPTIONS } from 'src/_mock';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { useLocales, useTranslate } from 'src/locales';

import ProductList from '../product-list';
import ProductSort from '../product-sort';
import CartIcon from '../common/cart-icon';
import ProductSearch from '../product-search';
import ProductFilters from '../product-filters';
import { useCheckoutContext } from '../../checkout/context';
import ProductFiltersResult from '../product-filters-result';
import { useParams } from 'src/routes/hooks';
import { useGetGroups } from 'src/api/category';

// ----------------------------------------------------------------------

const defaultFilters = {
  tags: [],
  colors: [],
  rate: 0,
  priceRange: [0, 0],
};

// ----------------------------------------------------------------------

export default function ProductShopView({ pageTitle, onSetPageTitle }) {
  const { t } = useTranslate();
  const { lang } = useLocales();

  const PRODUCT_SORT_OPTIONS = [
    { value: 'featured', label: t('featured') },
    { value: 'newest', label: t('newest') },
    { value: 'discount', label: t('highestDiscount') },
    { value: 'priceDesc', label: t('priceHighToLow') },
    { value: 'priceAsc', label: t('priceLowToHigh') },
  ];

  const settings = useSettingsContext();

  const checkout = useCheckoutContext();

  const params = useParams();

  const { category } = params;

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('featured');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const [filters, setFilters] = useState(defaultFilters);

  const [tagOptions, setTagOptions] = useState([]);

  const [colorOptions, setColorOptions] = useState([]);

  const [page, setPage] = useState(1);

  const [categoryPriceRange, setCategoryPriceRange] = useState({ min: 0, max: 500 });

  const handlePageChange = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  const { groups } = useGetGroups();

  const { products, totalPages, totalCount, productsLoading, productsEmpty } = useGetProducts(
    category,
    page,
    10,
    filters,
    sortBy
  );

  const { searchResults, searchLoading } = useSearchProducts(category, debouncedQuery, lang);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    const foundCategory = groups
      .flatMap((group) => group.categories)
      .find((groupCategory) => groupCategory.path === category);

    if (foundCategory) {
      onSetPageTitle(foundCategory.title);
      const { filters, colors, priceRange } = foundCategory;
      const tags = filters.map((filter) => ({ key: filter.key, title: filter.title }));
      setTagOptions(tags);
      setColorOptions(colors);
      setCategoryPriceRange(priceRange);
    }
  }, [category, groups, onSetPageTitle]);

  const canReset = !isEqual(defaultFilters, filters);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <ProductSearch
        query={debouncedQuery}
        results={searchResults}
        onSearch={handleSearch}
        loading={searchLoading}
        hrefItem={(id) => paths.product.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <ProductFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          colorOptions={colorOptions}
          ratingOptions={PRODUCT_RATING_OPTIONS}
          tagOptions={tagOptions}
          categoryPriceRange={categoryPriceRange}
        />

        <ProductSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <ProductFiltersResult
      filters={filters}
      onFilters={handleFilters}
      //
      canReset={canReset}
      onResetFilters={handleResetFilters}
      //
      results={totalCount}
      tagOptions={tagOptions}
    />
  );

  const renderNotFound = <EmptyContent filled title={t('noData')} sx={{ py: 10 }} />;

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <CartIcon totalItems={checkout.totalItems} />

      <Typography
        variant="h1"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        {t('category')}: {pageTitle[lang]}
      </Typography>

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {productsEmpty && renderNotFound}

      <ProductList
        products={products}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        loading={productsLoading}
      />
    </Container>
  );
}

// ----------------------------------------------------------------------

ProductShopView.propTypes = {
  pageTitle: PropTypes.object,
  onSetPageTitle: PropTypes.func,
};
