import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from 'src/auth/hooks';

import { fDate } from 'src/utils/format-time';

import { useGetOrders } from 'src/api/user';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
import { useCurrencyConverter } from 'src/utils/currency-exchanger';

// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function UserOrdersView() {
  const { t } = useTranslate();
  const { fCurrency } = useCurrencyConverter();

  const STATUS_OPTIONS = [
    { value: 'all', label: t('all') },
    { value: 'pending', label: t('pending') },
    { value: 'processing', label: t('processing') },
    { value: 'completed', label: t('completed') },
    { value: 'cancelled', label: t('cancelled') },
    { value: 'refunded', label: t('refunded') },
  ];
  const router = useRouter();
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const {
    orders,
    totalCount,
    pendingCount,
    processingCount,
    completedCount,
    cancelledCount,
    refundedCount,
    ordersLoading,
  } = useGetOrders(user?._id);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: orders,
    filters,
  });

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      setFilters((prevFilters) => ({ ...prevFilters, status: newValue }));
    },
    [setFilters]
  );

  const renderOrderStatus = (
    <Tabs
      scrollButtons={false}
      value={filters.status}
      onChange={handleFilterStatus}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {STATUS_OPTIONS.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          icon={
            <Label
              variant={
                ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
              }
              color={
                (tab.value === 'completed' && 'success') ||
                (tab.value === 'pending' && 'warning') ||
                (tab.value === 'processing' && 'info') ||
                (tab.value === 'cancelled' && 'error') ||
                'default'
              }
            >
              {tab.value === 'all' && totalCount}
              {tab.value === 'completed' && completedCount}
              {tab.value === 'processing' && processingCount}
              {tab.value === 'pending' && pendingCount}
              {tab.value === 'cancelled' && cancelledCount}
              {tab.value === 'refunded' && refundedCount}
            </Label>
          }
        />
      ))}
    </Tabs>
  );

  const renderOrdersData = (
    <List sx={{ mb: 40 }}>
      {dataFiltered?.map((order, index) => (
        <Box key={order._id} onClick={() => router.push(paths.user.order(order._id))}>
          <ListItemButton sx={{ py: 3 }}>
            <ListItemAvatar>
              <Avatar>
                <Iconify icon="ph:hash-bold" width={24} />
              </Avatar>
            </ListItemAvatar>
            <Stack sx={{ flexDirection: { sx: 'column', md: 'row' }, gap: { md: 10 } }}>
              <ListItemText
                primary={`Order Number: ${order.orderNumber}`}
                secondary={` Date: ${fDate(order.orderDate)}`}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: { sx: 0.5, md: 0 },
                }}
              >
                <Typography variant="body2">
                  Items:
                  <Label sx={{ mx: 1 }}>x{order?.qty}</Label>
                </Typography>
                <Typography variant="body2">
                  Paid:
                  <Label color="primary" sx={{ mx: 1 }}>
                    {fCurrency(order.discountedTotalPrice)}
                  </Label>
                </Typography>
              </Box>
            </Stack>
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <Iconify icon="mingcute:right-fill" width={24} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
          {index !== orders?.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[{ name: 'User', href: paths.user.root }, { name: 'Profile' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {!ordersLoading ? (
        <>
          {renderOrderStatus}

          {renderOrdersData}
        </>
      ) : (
        <Box sx={{ height: 400 }}>
          <LoadingScreen />
        </Box>
      )}
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  if (!inputData) return inputData;
  const { status } = filters;

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  return inputData;
}
