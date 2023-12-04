import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

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
        my: { xs: 10, md: 12 },
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
