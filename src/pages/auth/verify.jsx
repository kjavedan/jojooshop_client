import { Helmet } from 'react-helmet-async';

import { VerifyView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Verify</title>
      </Helmet>

      <VerifyView />
    </>
  );
}
