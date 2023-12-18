import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

import { useGetGroups } from 'src/api/category';

import CarouselCategory from '../home-carousel';
import { HomeSkeleton } from '../home-skeleton';
import Typography from '@mui/material/Typography';
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
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h1" sx={{ opacity: 0 }}>
        jojoshop: Home page - start shopping now
      </Typography>
      {groupsLoading ? <HomeSkeleton /> : renderCategories}
    </Container>
  );
}
