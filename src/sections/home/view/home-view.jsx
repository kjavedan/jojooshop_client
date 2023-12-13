import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

import { useGetGroups } from 'src/api/category';

import CarouselCategory from '../home-carousel';
// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const { groups, groupsLoading } = useGetGroups();
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
