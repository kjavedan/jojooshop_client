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
      ordersError: error,
      ordersValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetOrder(orderId) {
  const URL = endpoints.user.order(orderId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      order: data || {},
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
