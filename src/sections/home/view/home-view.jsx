import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import { _mock } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CarouselCategory from '../home-carousel';
// ----------------------------------------------------------------------
const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

export default function HomeView() {
  const settings = useSettingsContext();
  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        my: { xs: 10, md: 15 },
      }}
    >
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
      <CarouselCategory data={_carouselsExample.slice(8, 16)} />
    </Container>
  );
}
