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
    path: paths.components,
  },
  {
    title: 'Account',
    icon: <Iconify icon="solar:user-bold-duotone" />,
    path: paths.components,
  },
  {
    title: 'Categories',
    path: '/pages',
    icon: <Iconify icon="solar:list-bold-duotone" />,
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
          { title: 'Login', path: paths.authDemo.classic.login },
          { title: 'Register', path: paths.authDemo.classic.register },
          {
            title: 'Forgot password',
            path: paths.authDemo.classic.forgotPassword,
          },
          { title: 'New password', path: paths.authDemo.classic.newPassword },
          { title: 'Verify', path: paths.authDemo.classic.verify },
          { title: 'Login (modern)', path: paths.authDemo.modern.login },
          { title: 'Register (modern)', path: paths.authDemo.modern.register },
          {
            title: 'Forgot password (modern)',
            path: paths.authDemo.modern.forgotPassword,
          },
          {
            title: 'New password (modern)',
            path: paths.authDemo.modern.newPassword,
          },
          { title: 'Verify (modern)', path: paths.authDemo.modern.verify },
        ],
      },
      {
        subheader: 'D',
        items: [
          { title: 'Page 403', path: paths.page403 },
          { title: 'Page 404', path: paths.page404 },
          { title: 'Page 500', path: paths.page500 },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
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
