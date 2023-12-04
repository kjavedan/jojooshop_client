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
    title: 'Categories',
    path: '/product',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Residential Lighting',
        items: [
          { title: 'Ceiling lights', path: paths.product.category('ceiling-lights') },
          { title: 'Chandeliers', path: paths.product.category('chandeliers') },
          { title: 'Pendant lights', path: paths.product.category('pendant-lights') },
          { title: 'Wall sconces', path: paths.product.category('wall-sconces') },
          { title: 'Table lamps', path: paths.product.category('table-lamps') },
          { title: 'Floor lamps', path: paths.product.category('floor-lamps') },
        ],
      },
      {
        subheader: 'Commercial Lighting',
        items: [
          { title: 'Office lighting fixtures', path: paths.product.category('office-lighting') },
          { title: 'Retail store lighting', path: paths.product.category('retail-lighting') },
          { title: 'Hospitality lighting', path: paths.product.category('hospitality-lighting') },
          { title: 'Industrial lighting', path: paths.product.category('industrial-lighting') },
        ],
      },
      {
        subheader: 'Outdoor Lighting',
        items: [
          { title: 'Garden lights', path: paths.product.category('garden-lights') },
          { title: 'Pathway lights', path: paths.product.category('pathway-lights') },
          { title: 'Street lights', path: paths.product.category('street-lights') },
          { title: 'Floodlights', path: paths.product.category('floodlights') },
          {
            title: 'Wall-mounted outdoor fixtures',
            path: paths.product.category('outdoor-fixtures'),
          },
        ],
      },
      {
        subheader: 'Decorative Lighting',
        items: [
          {
            title: 'Artistic and designer lighting',
            path: paths.product.category('decorative-lighting'),
          },
          {
            title: 'Custom or bespoke lighting fixtures',
            path: paths.product.category('custom-lighting-fixtures'),
          },
          { title: 'Sculptural lighting', path: paths.product.category('sculptural-lighting') },
        ],
      },
    ],
  },
  {
    title: 'Cart',
    icon: <Iconify icon="solar:cart-bold-duotone" />,
    path: paths.product.checkout,
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
