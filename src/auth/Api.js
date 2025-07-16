import React, { useEffect, useReducer } from 'react';
import {
  HOST_API_KEY,
  HOST_IMAGE_UPLOAD_KEY,
  HOST_FILE_UPLOAD_KEY,
} from '../config-global';
import {
  setSession,
  removeSession,
  tokenCheck,
  toastExpireAccess,
  jwtDecode,
} from './utils';
import AuthReducer from 'src/context/Auth/authReducer';
import axios from 'axios';

const instance = axios.create({
  baseURL: HOST_API_KEY,
  timeout: 30000,
});

export const Api = () => {
  const initialState = {
    userToken: null,
    isLoggedIn: false,
    user: null,
  };

  useEffect(() => {
    isCheckUser();
  }, []);

  const isCheckUser = () => {
    try {
      const payload = tokenCheck();
      dispatch({ type: 'IS_LOGGED_IN', payload });
    } catch (error) {
      console.error('Error checking user:', error);
      // If there's an error, ensure user is logged out
      dispatch({ type: 'SIGN_OUT' });
    }
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const handlers = React.useMemo(
    () => ({
      //хэрэглэгчийн нэвтрэх
      signIn: async (token) => {
        try {
          const decodedUser = jwtDecode(token);
          let payload = {
            token,
            isLoggedIn: true,
            user: decodedUser,
          };
          setSession(token);
          dispatch({ type: 'IS_LOGGED_IN', payload });
        } catch (error) {
          console.error('Error signing in:', error);
          // If token is invalid, clear session and stay logged out
          removeSession();
          dispatch({ type: 'SIGN_OUT' });
        }
      },

      //хэрэглэгч гарах
      logOut: () => {
        removeSession();
        dispatch({ type: 'SIGN_OUT' });
      },

      stateDynamicUpdate: (obj) => {
        dispatch({ type: 'DYNAMIC_UPDATE', payload: obj });
      },

      // Real GET function
      GET: async (url, isToken = false, contentType = 'application/json', responseType = 'json') => {
        try {
          let response = await instance.get(
            url,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state?.userToken}`,
                    'Content-Type': contentType,
                  },
                  responseType,
                }
              : ''
          );
          if (response?.status === 200 && response?.data) {
            return response?.data;
          }
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          const error = new Error();
          error.status = e?.response?.status;
          throw error;
        }
      },

      // Real POST function
      POST: async (url, isToken = false, data, contentType = 'application/json', responseType = 'json') => {
        try {
          let response = await instance.post(
            url,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state?.userToken}`,
                    'Content-Type': contentType,
                  },
                  responseType,
                }
              : ''
          );

          if (response?.status === 200 && response?.data) {
            return response.data;
          }
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          const error = new Error();
          error.status = e?.response?.status;
          throw error;
        }
      },

      // Real PUT function
      PUT: async (url, isToken = false, data) => {
        try {
          let response = await instance.put(
            url,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                  },
                }
              : ''
          );
          if (response?.status === 200 && response?.data) {
            return response.data;
          }
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          const error = new Error();
          error.status = e?.response?.status;
          throw error;
        }
      },

      // Real DELETE function
      DELETE: async (url, isToken = false, responseType = 'json') => {
        try {
          let response = await instance.delete(
            url,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                  },
                  responseType,
                }
              : ''
          );
          if (response?.status === 200 && response?.data) {
            return response.data;
          }
        } catch (e) {
          if (e?.response?.status === 401) {
            handlers.logOut();
            toastExpireAccess();
          }
          const error = new Error();
          error.status = e?.response?.status;
          throw error;
        }
      },

      // Real IMAGEUPLOAD function
      IMAGEUPLOAD: async (isToken = false, data, contentType) => {
        try {
          return await axios.post(
            `${HOST_IMAGE_UPLOAD_KEY}`,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                    'Content-Type': contentType,
                  },
                }
              : ''
          );
        } catch (e) {
          return e;
        }
      },

      // Real FILEUPLOAD function
      FILEUPLOAD: async (isToken = false, data, contentType) => {
        try {
          return await axios.post(
            `${HOST_FILE_UPLOAD_KEY}${url}`,
            data,
            isToken
              ? {
                  headers: {
                    Authorization: `Bearer ${state.userToken}`,
                    'Content-Type': contentType,
                  },
                }
              : ''
          );
        } catch (e) {
          return e;
        }
      },
    }),
    [state?.userToken]
  );

  return { handlers, state };
};
