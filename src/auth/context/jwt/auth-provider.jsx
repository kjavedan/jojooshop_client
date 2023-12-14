import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import axios, { endpoints } from 'src/utils/axios';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { useTranslate } from 'src/locales';
import { PATH_AFTER_LOGIN } from 'src/config-global';

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'REFRESH') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const returnTo = searchParams.get('returnTo');

  const initialize = useCallback(async () => {
    const handleSuccessfulInitialization = async (accessToken) => {
      try {
        const response = await axios.post(endpoints.auth.me, { accessToken });
        const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } catch (error) {
        handleFailedInitialization();
      }
    };

    const handleFailedInitialization = async () => {
      try {
        const response = await axios.post(
          endpoints.auth.refreshToken,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = response.data;

        setSession(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } catch (error) {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    };

    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        await handleSuccessfulInitialization(accessToken);
      } else {
        await handleFailedInitialization();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (data) => {
      try {
        const response = await axios.post(endpoints.auth.login, data, { withCredentials: true });

        const { accessToken, user } = response.data;

        setSession(accessToken);
        router.push(returnTo || PATH_AFTER_LOGIN);

        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.msg === 'User is not authorized!'
            ? t('emailOrPasswordWrong')
            : t('somethingWentWrong');
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    },
    [enqueueSnackbar, returnTo, router, t]
  );

  // GOOGLE_LOGIN
  const googleLogin = useCallback(
    async (code) => {
      try {
        const response = await axios.post(endpoints.auth.google, code, { withCredentials: true });
        const { accessToken, user } = response.data;

        setSession(accessToken);
        router.push(returnTo || PATH_AFTER_LOGIN);

        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } catch (error) {
        console.log(error);

        enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, returnTo, router, t]
  );

  // REGISTER
  const register = useCallback(
    async (data) => {
      try {
        const response = await axios.post(endpoints.auth.register, data, { withCredentials: true });

        const { accessToken, user } = response.data;

        sessionStorage.setItem(STORAGE_KEY, accessToken);

        dispatch({
          type: 'REGISTER',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } catch (error) {
        const errorMessage = error?.errors?.length ? t('emailExists') : t('somethingWentWrong');
        enqueueSnackbar(errorMessage, { variant: 'error' });
        console.log(error);
      }
    },
    [enqueueSnackbar, t]
  );

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      setSession(null);
      deleteCookie('refreshToken');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // REFRESH
  const refreshUserInfo = useCallback(async (userId) => {
    const { data: user } = await axios.get(endpoints.user.info(userId));
    dispatch({
      type: 'REFRESH',
      payload: {
        user: {
          ...user,
        },
      },
    });
  }, []);
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      googleLogin,
      register,
      logout,
      refreshUserInfo,
    }),
    [login, googleLogin, logout, register, refreshUserInfo, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
}
