import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="80%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            d="M76.7341 118.243C76.7341 113.825 80.3159 110.243 84.7341 110.243H140.596C145.014 110.243 148.596 113.825 148.596 118.243V272.378C148.596 297.778 143.622 319.78 133.675 338.382C123.931 356.986 109.113 371.386 89.2182 381.581C69.5273 391.777 44.6598 396.875 14.6159 396.875C12.18 396.875 9.74395 396.875 7.30801 396.875V396.875C3.27191 396.875 0 393.603 0 389.567V344.545C0 340.845 2.99923 337.846 6.69898 337.846V337.846C8.72896 337.846 10.962 337.846 13.398 337.846C35.3218 337.846 51.3589 332.122 61.5088 320.675C71.6592 309.405 76.7341 293.307 76.7341 272.378V118.243Z"
            fill="url(#BG1)"
          />
          <path
            d="M148.596 265.809C148.596 265.809 139.925 321.878 33.1915 336.129L29.8242 336.83C21.6466 337.952 20.9251 337.952 13.398 337.952H6.69898H0V403H7.30801H14.6159C44.6598 403 69.5273 397.382 89.2182 386.147C109.112 374.912 123.931 359.044 133.675 338.543C143.622 318.044 148.596 293.799 148.596 265.809Z"
            fill="url(#BG2)"
          />
          <ellipse cx="110.664" cy="47.1596" rx="47.3374" ry="47.1596" fill="url(#BG2)" />
          <circle cx="306" cy="265" r="110" stroke="url(#BG1)" strokeWidth="30" />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
