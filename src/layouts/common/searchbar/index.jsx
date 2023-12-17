import { memo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';

import { endpoints } from 'src/utils/axios';
import { useGetGroups } from 'src/api/category';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';

import ResultItem from './result-item';
import { applyFilter, getAllItems } from './utils';

// ----------------------------------------------------------------------

function Searchbar() {
  const theme = useTheme();

  const router = useRouter();

  const search = useBoolean();

  const { groups } = useGetGroups();

  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path) => {
      router.push(endpoints.product.category(path));
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: getAllItems({ data: groups }),
    query: searchQuery,
  });

  const notFound = searchQuery && !dataFiltered.length;

  const renderItems = () => (
    <List>
      {dataFiltered.map((item, index) => (
        <ResultItem
          path={item.path}
          title={item.title}
          coverUrl={item.coverUrl}
          key={index}
          groupLabel={searchQuery}
          onClickItem={() => handleClick(item.path)}
        />
      ))}
    </List>
  );

  const renderButton = (
    <Stack direction="row" alignItems="center" sx={{ mx: { sx: 2, md: 5 } }}>
      <IconButton onClick={search.onTrue}>
        <Iconify icon="eva:search-fill" />
      </IconButton>
    </Stack>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>
          {notFound ? <SearchNotFound query={searchQuery} sx={{ py: 10 }} /> : renderItems()}
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
