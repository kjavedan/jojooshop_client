import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function CarouselCategory({ data }) {
  const { lang } = useLocales();

  const carousel = useCarousel({
    slidesToShow: data?.categories?.length < 4 ? data.categories.length : 4,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        mt: 5,
      }}
    >
      <Typography variant="h4">{data.title[lang]}</Typography>
      <CarouselArrows
        filled
        icon="mingcute:right-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        dataLength={data.categories.length || 1}
      >
        <Box sx={{ mt: 2 }}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.categories.map((category) => (
              <Box key={category._id} sx={{ px: { xs: 0.3, md: 1 } }}>
                <CarouselItem item={category} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </CarouselArrows>
    </Box>
  );
}

CarouselCategory.propTypes = {
  data: PropTypes.object,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const { lang } = useLocales();
  const theme = useTheme();
  const router = useRouter();

  const { coverUrl, title, path } = item;

  const mdUp = useResponsive('up', 'md');
  return (
    <Paper
      onClick={() => router.push(paths.product.category(path))}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image alt={title.en} src={coverUrl} ratio={mdUp ? '4/3' : '1/1'} />

      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 25%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      >
        <TextMaxLine variant="h5" sx={{ mb: 2 }}>
          {title[lang]}
        </TextMaxLine>

        <Link
          color="inherit"
          variant="overline"
          component={RouterLink}
          href={paths.product.category(path)}
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            cursor: 'pointer',
            fontSize: { xs: 10, md: 14 },
            transition: theme.transitions.create(['opacity']),
            '&:hover': { opacity: 1 },
          }}
        >
          See
          <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
