import useSWR from 'swr';
import { useMemo } from 'react';
import { endpoints, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetUser(userId) {
  const URL = endpoints.user.info(userId);

  const { data, error, isValidating, isLoading } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data || {},
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isValidating, isLoading]
  );

  return memoizedValue;
}
