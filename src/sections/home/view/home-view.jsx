import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { _mock } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CarouselCategory from '../home-carousel';
import { useGetGroups } from 'src/api/category';
// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const { groups, groupsLoading } = useGetGroups();
  console.log(groups);
  const renderCategories = (
    <>
      {groups.map((group, index) => (
        <CarouselCategory key={index} data={group} />
      ))}
    </>
  );
  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        my: { xs: 10, md: 12 },
      }}
    >
      {!groupsLoading && renderCategories}
    </Container>
  );
}
