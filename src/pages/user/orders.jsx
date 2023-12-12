import { Helmet } from 'react-helmet-async';

import { UserOrdersView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title> Orders: List</title>
      </Helmet>

      <UserOrdersView />
    </>
  );
}
