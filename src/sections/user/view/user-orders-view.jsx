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
import { useAuthContext } from 'src/auth/hooks';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { useGetOrders } from 'src/api/user';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'general',
    label: 'General',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'cart',
    label: 'Cart',
    icon: <Iconify icon="solar:cart-bold" width={24} />,
  },
  {
    value: 'orders',
    label: 'Orders',
    icon: <Iconify icon="solar:box-bold" width={24} />,
  },
  {
    value: 'reviews',
    label: 'Reviews',
    icon: <Iconify icon="mingcute:message-3-fill" width={24} />,
  },
  {
    value: 'invoice',
    label: 'Invoice',
    icon: <Iconify icon="basil:invoice-solid" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserOrdersView() {
  const { t } = useTranslate();
  const STATUS_OPTIONS = [
    { value: 'all', label: t('all') },
    { value: 'pending', label: t('pending') },
    { value: 'processing', label: t('processing') },
    { value: 'completed', label: t('completed') },
    { value: 'cancelled', label: t('cancelled') },
    { value: 'refunded', label: t('refunded') },
  ];

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
    ordersEmpty,
  } = useGetOrders(user?._id);

  const [filters, setFilters] = useState(defaultFilters);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      setFilters((prevFilters) => ({ ...prevFilters, status: newValue }));
    },
    [setFilters]
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
      <List sx={{ mb: 10 }}>
        {orders?.map((order, index) => (
          <Box key={order._id}>
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
                    gap: 3,
                  }}
                >
                  <Typography variant="body2">
                    Items:
                    <Label sx={{ mx: 1 }}>x{order?.products.length}</Label>
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
    </Container>
  );
}
