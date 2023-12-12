import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetProducts(category, page, rowsPerPage = 10, filters, sortBy) {
  const URL = [
    endpoints.product.list,
    {
      params: {
        category,
        page: page - 1,
        rowsPerPage,
        filters: JSON.stringify(filters),
        srotBy: JSON.stringify(sortBy),
        role: 'user',
      },
    },
    ,
  ];
  console.log(filters);
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      totalCount: data?.totalCount,
      totalPages: Math.ceil(data?.totalCount / rowsPerPage) || 0,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data, rowsPerPage, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId) {
  const URL = endpoints.product.details(productId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data || null,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(filters) {
  const URL = [endpoints.product.search, { params: { filters } }];

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
  //   keepPreviousData: true,
  // });

  // const memoizedValue = useMemo(
  //   () => ({
  //     searchResults: data?.results || [],
  //     totalSearchPages: Math.ceil(data?.totalCount / 10) || 0,
  //     searchLoading: isLoading,
  //     searchError: error,
  //     searchValidating: isValidating,
  //     searchEmpty: !isLoading && !data?.results.length,
  //   }),
  //   [data?.results, error, isLoading, isValidating]
  // );

  // return memoizedValue;
  return [];
}
