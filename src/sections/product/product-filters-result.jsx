import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

import { useLocales, useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function ProductFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  tagOptions,
  ...other
}) {
  const { t } = useTranslate();
  const { lang } = useLocales();

  const handleRemoveTags = (inputValue) => {
    const newValue = filters.tags.filter((item) => item !== inputValue);
    onFilters('tags', newValue);
  };

  const handleRemoveColor = (inputValue) => {
    const newValue = filters.colors.filter((item) => item !== inputValue);
    onFilters('colors', newValue);
  };

  const handleRemovePrice = () => {
    onFilters('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    onFilters('rate', '');
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          {t('resultsFound')}
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.tags.length && (
          <Block label={t('tags')}>
            {filters.tags.map((item) => (
              <Chip
                key={item}
                label={tagOptions?.find((option) => option.key === item)?.title?.[lang] || item}
                size="small"
                onDelete={() => handleRemoveTags(item)}
              />
            ))}
          </Block>
        )}

        {!!filters?.colors.length && (
          <Block label={t('colors')}>
            {filters?.colors?.map((item, index) => (
              <Chip
                key={index}
                size="small"
                label={
                  <Box
                    sx={{
                      ml: -0.5,
                      width: 18,
                      height: 18,
                      bgcolor: item.value,
                      borderRadius: '50%',
                      border: (theme) => `solid 1px ${alpha(theme.palette.common.white, 0.24)}`,
                    }}
                  />
                }
                onDelete={() => handleRemoveColor(item)}
              />
            ))}
          </Block>
        )}

        {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 0) && (
          <Block label={t('price')}>
            <Chip
              size="small"
              label={`$${filters.priceRange[0]} - ${filters.priceRange[1]}`}
              onDelete={handleRemovePrice}
            />
          </Block>
        )}

        {!!filters.rating && (
          <Block label={t('rating')}>
            <Chip size="small" label={filters.rate} onDelete={handleRemoveRating} />
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            {t('clear')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

ProductFiltersResult.propTypes = {
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  results: PropTypes.number,
  onResetFilters: PropTypes.func,
  tagOptions: PropTypes.array,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
