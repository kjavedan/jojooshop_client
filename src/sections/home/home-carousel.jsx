import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function CarouselCategory({ data }) {
  const carousel = useCarousel({
    slidesToShow: 4,
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
        // overflow: 'hidden',
        position: 'relative',
        mt: 5,
      }}
    >
      <Typography variant="h4">Top Gifts</Typography>
      <CarouselArrows
        filled
        icon="mingcute:right-fill"
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      >
        <Box sx={{ mt: 2 }}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {data.map((item) => (
              <Box key={item.id} sx={{ px: { xs: 0.3, md: 1 } }}>
                <CarouselItem item={item} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </CarouselArrows>
    </Box>
  );
}

CarouselCategory.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const theme = useTheme();

  const { coverUrl, title } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image alt={title} src={coverUrl} ratio="4/3" />

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
        <TextMaxLine variant="h4" sx={{ mb: 2 }}>
          {title}
        </TextMaxLine>

        <Link
          color="inherit"
          variant="overline"
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: theme.transitions.create(['opacity']),
            '&:hover': { opacity: 1 },
          }}
        >
          learn More
          <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
