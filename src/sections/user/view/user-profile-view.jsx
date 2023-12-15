import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserEditForm from '../user-edit-form';
import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const settings = useSettingsContext();
  return (
    <Container sx={{ mb: 10 }} maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={user?.fullName}
        links={[
          {
            name: t('profile'),
            href: paths.user.root,
          },
          { name: t('edit') },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <UserEditForm />
    </Container>
  );
}
