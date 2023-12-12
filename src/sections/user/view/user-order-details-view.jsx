import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
import { useSettingsContext } from 'src/components/settings';

import { useGetOrder } from 'src/api/user';

import OrderDetailsInfo from '../order-details-info';
import OrderDetailsItems from '../order-details-item';
import OrderDetailsToolbar from '../order-details-toolbar';
import OrderDetailsHistory from '../order-details-history';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function UserOrderDetailsView() {
  const params = useParams();
  const { id } = params;
  const settings = useSettingsContext();

  const { order, orderLoading } = useGetOrder(id);

  console.log(order);

  console.log(order);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 15 }}>
      {orderLoading ? (
        <Box height={'50vh'}>
          <LoadingScreen />
        </Box>
      ) : (
        <>
          <OrderDetailsToolbar
            backLink={paths.user.orders}
            orderNumber={order?.orderNumber}
            orderDate={order?.orderDate}
            status={order?.status}
          />

          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
                <OrderDetailsItems
                  items={order?.products}
                  shippingPrice={order?.shippingPrice}
                  totalPrice={order?.totalPrice}
                  discountedTotalPrice={order?.discountedTotalPrice}
                />

                <OrderDetailsHistory history={order.history} />
              </Stack>
            </Grid>

            <Grid xs={12} md={4}>
              <OrderDetailsInfo
                customer={order?.userId}
                delivery={order?.delivery}
                payment={order?.payment}
                shippingAddress={order?.shippingAddress}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
