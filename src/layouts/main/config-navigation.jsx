import { useMemo } from 'react';
import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useGetGroups } from 'src/api/category';
import { useLocales, useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function useNavConfig() {
  const { t } = useTranslate();
  const { lang } = useLocales();
  const { groups, groupsLoading } = useGetGroups();

  const memoizedValue = useMemo(() => {
    if (groupsLoading || !groups) {
      return [];
    }

    const transformedGroups = groups.map((group) => {
      return {
        subheader: group.title[lang],
        items: group.categories.map((category) => ({
          title: category.title[lang],
          path: paths.product.category(category.path),
        })),
      };
    });

    return [
      {
        title: t('home'),
        icon: <Iconify icon="solar:home-2-bold-duotone" />,
        path: '/',
      },

      {
        title: t('categories'),
        path: '/product',
        icon: <Iconify icon="solar:file-bold-duotone" />,
        children: transformedGroups,
      },
      {
        title: t('cart'),
        icon: <Iconify icon="solar:cart-bold-duotone" />,
        path: paths.checkout.root,
      },
      {
        title: t('aboutUs'),
        icon: <Iconify icon="mdi:about-circle-outline" />,
        path: paths.about,
      },
      {
        title: t('contactUs'),
        icon: <Iconify icon="solar:phone-bold-duotone" />,
        path: paths.contact,
      },
      {
        title: t('faqs'),
        icon: <Iconify icon="wpf:faq" />,
        path: paths.faqs,
      },
    ];
  }, [lang, t, groupsLoading, groups]);
  return memoizedValue;
}
