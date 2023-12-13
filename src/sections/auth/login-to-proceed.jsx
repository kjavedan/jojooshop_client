import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

export default function LoginToProceed({ open, onClose }) {
  const router = useRouter();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Login to proceed </DialogTitle>

      <DialogActions>
        <Button
          sx={{ width: 250 }}
          size="large"
          color="inherit"
          variant="contained"
          onClick={() => router.push(paths.auth.login)}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LoginToProceed.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
