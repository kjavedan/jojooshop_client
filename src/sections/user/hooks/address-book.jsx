import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';

import axios, { endpoints } from 'src/utils/axios';

const useAddressBook = () => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, refreshUserInfo } = useAuthContext();

  const handleUpdateUser = useCallback(
    async (data) => {
      try {
        await axios.put(endpoints.user.update(user?._id), data);
        enqueueSnackbar(t('updateSuccess'), {
          variant: 'success',
        });
        refreshUserInfo(user?._id);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      }
    },
    [user?._id, enqueueSnackbar, refreshUserInfo, t]
  );

  const handleAddAddressToAddressBook = useCallback(
    (address) => {
      const newAddressBook = user.addressBook.map((a) =>
        address.primary ? { ...a, primary: false } : a
      );

      const addressBook = [...newAddressBook, address];
      handleUpdateUser({ addressBook });
    },
    [user.addressBook, handleUpdateUser]
  );

  const handleDeleteAddress = useCallback(
    (index) => {
      const addressBook = user.addressBook.filter((_, i) => i !== index);
      handleUpdateUser({ addressBook });
    },
    [user.addressBook, handleUpdateUser]
  );

  return { handleAddAddressToAddressBook, handleDeleteAddress, handleUpdateUser };
};

export default useAddressBook;
