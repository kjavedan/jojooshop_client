import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetOrders(userId) {
  const URL = endpoints.user.orders(userId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      orders: data?.orders || [],
      totalCount: data?.totalCount,
      pendingCount: data?.pendingCount,
      processingCount: data?.processingCount,
      completedCount: data?.completedCount,
      cancelledCount: data?.cancelledCount,
      refundedCount: data?.refundedCount,
      ordersLoading: isLoading,
      ordrsError: error,
      ordrsValidating: isValidating,
      ordrsEmpty: !isLoading && !data?.ordrs?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
