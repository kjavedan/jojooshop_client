import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CheckoutDelivery({ options, onApplyShipping, onShippingChange, ...other }) {
  const { control } = useFormContext();

  return (
    <Card {...other}>
      <CardHeader title="Delivery" />

      <Controller
        name="delivery"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box
            columnGap={2}
            rowGap={2.5}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ p: 3 }}
          >
            {options.map((option) => (
              <OptionItem
                key={option.speedy}
                option={option}
                selected={field.value.speedy === option.speedy}
                onClick={() => {
                  field.onChange({
                    speedy: option.speedy,
                    shipBy: '',
                    trackingNumber: option.trackingNumber,
                  });
                  onApplyShipping(option);
                  onShippingChange(option.value);
                }}
              />
            ))}

            {!!error && (
              <FormHelperText error sx={{ pt: 1, px: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />
    </Card>
  );
}

CheckoutDelivery.propTypes = {
  onApplyShipping: PropTypes.func,
  onShippingChange: PropTypes.func,
  options: PropTypes.array,
};

// ----------------------------------------------------------------------

function OptionItem({ option, selected, ...other }) {
  const { value, label, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        display: 'flex',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      {label === 'Free' && <Iconify icon="carbon:bicycle" width={32} />}
      {label === 'Standard' && <Iconify icon="carbon:delivery" width={32} />}
      {label === 'Express' && <Iconify icon="carbon:rocket" width={32} />}

      <ListItemText
        sx={{ ml: 2 }}
        primary={
          <Stack direction="row" alignItems="center">
            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>
            <Box component="span" sx={{ typography: 'h6' }}>{`$${value}`}</Box>
          </Stack>
        }
        secondary={description}
        primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
        secondaryTypographyProps={{ typography: 'body2' }}
      />
    </Paper>
  );
}

OptionItem.propTypes = {
  option: PropTypes.object,
  selected: PropTypes.bool,
};
