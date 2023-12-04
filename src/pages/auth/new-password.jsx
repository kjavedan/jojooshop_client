import { Helmet } from 'react-helmet-async';

import { NewPassordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: New Password</title>
      </Helmet>

      <NewPassordView />
    </>
  );
}
