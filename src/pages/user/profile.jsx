import { Helmet } from 'react-helmet-async';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title> Product: Shop</title>
      </Helmet>

      <UserProfileView />
    </>
  );
}
