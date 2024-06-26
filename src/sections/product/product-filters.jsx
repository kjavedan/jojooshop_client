import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';

import { useLocales, useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function ProductFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  tagOptions,
  colorOptions,
  ratingOptions,
  categoryPriceRange,
}) {
  const { t } = useTranslate();
  const { lang } = useLocales();

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * (categoryPriceRange.max / 20);

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  const handleFilterTags = useCallback(
    (newValue) => {
      const checked = filters.tags.includes(newValue)
        ? filters.tags.filter((value) => value !== newValue)
        : [...filters.tags, newValue];
      onFilters('tags', checked);
    },
    [filters.tags, onFilters]
  );

  const handleFilterColors = useCallback(
    (newValue) => {
      onFilters('colors', newValue);
    },
    [onFilters]
  );

  const handleFilterPriceRange = useCallback(
    (event, newValue) => {
      onFilters('priceRange', newValue);
    },
    [onFilters]
  );

  const handleFilterRating = useCallback(
    (newValue) => {
      onFilters('rate', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t('filters')}
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderTags = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('tags')}
      </Typography>
      {tagOptions.map((tag, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={filters.tags.includes(tag.key)}
              onClick={() => handleFilterTags(tag.key)}
            />
          }
          label={tag.title?.[lang] ?? ""}
        />
      ))}
    </Stack>
  );

  const renderColor = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t('color')}
      </Typography>
      <ColorPicker
        selected={filters.colors}
        singleSelect={false}
        onSelectColor={(colors) => handleFilterColors(colors)}
        colors={colorOptions}
        limit={6}
      />
    </Stack>
  );

  const renderPrice = (
    <Stack>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        {t('price')}
      </Typography>

      <Stack direction="row" spacing={5} sx={{ my: 2 }}>
        <InputRange
          type={t('min')}
          value={filters.priceRange}
          categoryPriceRange={categoryPriceRange}
          onFilters={onFilters}
        />
        <InputRange
          type={t('max')}
          value={filters.priceRange}
          categoryPriceRange={categoryPriceRange}
          onFilters={onFilters}
        />
      </Stack>

      <Slider
        value={filters.priceRange}
        onChange={handleFilterPriceRange}
        step={100}
        min={categoryPriceRange.min}
        max={categoryPriceRange.max}
        marks={marksLabel}
        getAriaValueText={(value) => `$${value}`}
        valueLabelFormat={(value) => `$${value}`}
        sx={{
          alignSelf: 'center',
          width: `calc(100% - 24px)`,
        }}
      />
    </Stack>
  );

  const renderRating = (
    <Stack spacing={2} alignItems="flex-start">
      <Typography variant="subtitle2">{t('rating')}</Typography>

      {ratingOptions.map((item, index) => (
        <Stack
          key={item}
          direction="row"
          onClick={() => handleFilterRating(item)}
          sx={{
            borderRadius: 1,
            cursor: 'pointer',
            typography: 'body2',
            '&:hover': { opacity: 0.48 },
            ...(filters.rate === item && {
              pl: 0.5,
              pr: 0.75,
              py: 0.25,
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Rating readOnly value={4 - index} sx={{ mr: 1 }} /> & {t('up')}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        {t('filters')}
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderTags}

            {!!colorOptions.length && renderColor}

            {renderPrice}

            {renderRating}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  ratingOptions: PropTypes.array,
  colorOptions: PropTypes.array,
  categoryPriceRange: PropTypes.object,
  tagOptions: PropTypes.arrayOf(PropTypes.object),
};

// ----------------------------------------------------------------------

function InputRange({ type, value, categoryPriceRange, onFilters }) {
  const min = value[0];
  const max = value[1];

  const handleBlurInputRange = useCallback(() => {
    if (min < categoryPriceRange.min) {
      onFilters('priceRange', [categoryPriceRange.min, max]);
    }
    if (min > categoryPriceRange.max) {
      onFilters('priceRange', [categoryPriceRange.max, max]);
    }
    if (max < categoryPriceRange.min) {
      onFilters('priceRange', [min, categoryPriceRange.min]);
    }
    if (max > categoryPriceRange.max) {
      onFilters('priceRange', [min, categoryPriceRange.max]);
    }
  }, [max, min, onFilters, categoryPriceRange]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: 1 }}>
      <Typography
        variant="caption"
        sx={{
          flexShrink: 0,
          color: 'text.disabled',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightSemiBold',
        }}
      >
        {`${type} ($)`}
      </Typography>

      <InputBase
        fullWidth
        value={type === 'Min' ? min : max}
        onChange={(event) =>
          type === 'Min'
            ? onFilters('priceRange', [Number(event.target.value), max])
            : onFilters('priceRange', [min, Number(event.target.value)])
        }
        onBlur={handleBlurInputRange}
        inputProps={{
          step: 100,
          min: categoryPriceRange.min,
          max: categoryPriceRange.max,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
        sx={{
          maxWidth: 48,
          borderRadius: 0.75,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
          [`& .${inputBaseClasses.input}`]: {
            pr: 1,
            py: 0.75,
            textAlign: 'right',
            typography: 'body2',
          },
        }}
      />
    </Stack>
  );
}

InputRange.propTypes = {
  onFilters: PropTypes.func,
  categoryPriceRange: PropTypes.object,
  type: PropTypes.oneOf(['Min', 'Max']),
  value: PropTypes.arrayOf(PropTypes.number),
};
