import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Cart',
    icon: <Iconify icon="solar:cart-bold-duotone" />,
    path: paths.product.checkout,
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'A',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'FAQs', path: paths.faqs },
          { title: 'Pricing', path: paths.pricing },
          { title: 'Payment', path: paths.payment },
          { title: 'Maintenance', path: paths.maintenance },
          { title: 'Coming Soon', path: paths.comingSoon },
        ],
      },
      {
        subheader: 'B',
        items: [
          { title: 'Shop', path: paths.product.root },
          { title: 'Product', path: paths.product.demo.details },
          { title: 'Checkout', path: paths.product.checkout },
          { title: 'Posts', path: paths.post.root },
          { title: 'Post', path: paths.post.demo.details },
        ],
      },
      {
        subheader: 'C',
        items: [
          { title: 'Login', path: paths.auth.login },
          { title: 'Register', path: paths.auth.register },
          {
            title: 'Forgot password',
            path: paths.auth.forgotPassword,
          },
          { title: 'New password', path: paths.auth.newPassword },
          { title: 'Verify', path: paths.auth.verify },
          { title: 'Login (modern)', path: paths.auth.login },
          { title: 'Register (modern)', path: paths.auth.register },
          {
            title: 'Forgot password (modern)',
            path: paths.auth.forgotPassword,
          },
          {
            title: 'New password (modern)',
            path: paths.auth.newPassword,
          },
          { title: 'Verify (modern)', path: paths.auth.verify },
        ],
      },
    ],
  },
  {
    title: 'About us',
    icon: <Iconify icon="mdi:about-circle-outline" />,
    path: paths.about,
  },
  {
    title: 'Contact us',
    icon: <Iconify icon="solar:phone-bold-duotone" />,
    path: paths.contact,
  },
  {
    title: 'FAQs',
    icon: <Iconify icon="wpf:faq" />,
    path: paths.faqs,
  },
];
