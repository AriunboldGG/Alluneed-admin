import React, { useEffect, useReducer } from 'react';
import {
  setSession,
  removeSession,
  tokenCheck,
  toastExpireAccess,
  jwtDecode,
} from './utils';
import AuthReducer from 'src/context/Auth/authReducer';
import { mockAuth, mockUserData } from 'src/utils/mockData';

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

      // Mock GET function
      GET: async (url, isToken = false) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Handle different endpoints
          if (url.includes('/users/me')) {
            const response = await mockAuth.getUserInfo(state?.userToken);
            return response;
          }
          
          if (url.includes('/users')) {
            return {
              success: true,
              data: mockUserData.users,
              total: mockUserData.users.length,
            };
          }
          
          if (url.includes('/campaigns')) {
            return {
              success: true,
              data: mockUserData.campaigns,
              total: mockUserData.campaigns.length,
            };
          }
          
          if (url.includes('/agencies')) {
            return {
              success: true,
              data: mockUserData.agencies,
              total: mockUserData.agencies.length,
            };
          }
          
          if (url.includes('/references')) {
            return {
              success: true,
              data: mockUserData.references,
              total: mockUserData.references.length,
            };
          }
          
          if (url.includes('/roles')) {
            return {
              success: true,
              data: mockUserData.roles,
              total: mockUserData.roles.length,
            };
          }
          
          // Default response
          return {
            success: true,
            data: [],
            total: 0,
          };
        } catch (e) {
          if (e?.message?.includes('expired') || e?.message?.includes('invalid')) {
            handlers.logOut();
            toastExpireAccess();
          }
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },

      // Mock POST function
      POST: async (url, isToken = false, data) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Handle different endpoints
          if (url.includes('/users')) {
            const newUser = {
              id: mockUserData.users.length + 1,
              ...data,
              createdAt: new Date().toISOString(),
            };
            mockUserData.users.push(newUser);
            return {
              success: true,
              data: newUser,
              message: 'User created successfully',
            };
          }
          
          if (url.includes('/campaigns')) {
            const newCampaign = {
              id: mockUserData.campaigns.length + 1,
              ...data,
              createdAt: new Date().toISOString(),
            };
            mockUserData.campaigns.push(newCampaign);
            return {
              success: true,
              data: newCampaign,
              message: 'Campaign created successfully',
            };
          }
          
          if (url.includes('/agencies')) {
            const newAgency = {
              id: mockUserData.agencies.length + 1,
              ...data,
              createdAt: new Date().toISOString(),
            };
            mockUserData.agencies.push(newAgency);
            return {
              success: true,
              data: newAgency,
              message: 'Agency created successfully',
            };
          }
          
          // Default response
          return {
            success: true,
            data: data,
            message: 'Created successfully',
          };
        } catch (e) {
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },

      // Mock PUT function
      PUT: async (url, isToken = false, data) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Handle different endpoints
          if (url.includes('/users')) {
            const userId = data.id;
            const userIndex = mockUserData.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
              mockUserData.users[userIndex] = { ...mockUserData.users[userIndex], ...data };
              return {
                success: true,
                data: mockUserData.users[userIndex],
                message: 'User updated successfully',
              };
            }
          }
          
          if (url.includes('/campaigns')) {
            const campaignId = data.id;
            const campaignIndex = mockUserData.campaigns.findIndex(c => c.id === campaignId);
            if (campaignIndex !== -1) {
              mockUserData.campaigns[campaignIndex] = { ...mockUserData.campaigns[campaignIndex], ...data };
              return {
                success: true,
                data: mockUserData.campaigns[campaignIndex],
                message: 'Campaign updated successfully',
              };
            }
          }
          
          if (url.includes('/agencies')) {
            const agencyId = data.id;
            const agencyIndex = mockUserData.agencies.findIndex(a => a.id === agencyId);
            if (agencyIndex !== -1) {
              mockUserData.agencies[agencyIndex] = { ...mockUserData.agencies[agencyIndex], ...data };
              return {
                success: true,
                data: mockUserData.agencies[agencyIndex],
                message: 'Agency updated successfully',
              };
            }
          }
          
          // Default response
          return {
            success: true,
            data: data,
            message: 'Updated successfully',
          };
        } catch (e) {
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },

      // Mock DELETE function
      DELETE: async (url, isToken = false) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Extract ID from URL
          const urlParts = url.split('/');
          const id = parseInt(urlParts[urlParts.length - 1]);
          
          // Handle different endpoints
          if (url.includes('/users')) {
            const userIndex = mockUserData.users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
              mockUserData.users.splice(userIndex, 1);
              return {
                success: true,
                message: 'User deleted successfully',
              };
            }
          }
          
          if (url.includes('/campaigns')) {
            const campaignIndex = mockUserData.campaigns.findIndex(c => c.id === id);
            if (campaignIndex !== -1) {
              mockUserData.campaigns.splice(campaignIndex, 1);
              return {
                success: true,
                message: 'Campaign deleted successfully',
              };
            }
          }
          
          if (url.includes('/agencies')) {
            const agencyIndex = mockUserData.agencies.findIndex(a => a.id === id);
            if (agencyIndex !== -1) {
              mockUserData.agencies.splice(agencyIndex, 1);
              return {
                success: true,
                message: 'Agency deleted successfully',
              };
            }
          }
          
          // Default response
          return {
            success: true,
            message: 'Deleted successfully',
          };
        } catch (e) {
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },

      // Mock IMAGEUPLOAD function
      IMAGEUPLOAD: async (isToken = false, data) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Return mock image URL
          return {
            success: true,
            data: {
              url: 'https://via.placeholder.com/300x300?text=Uploaded+Image',
              filename: 'uploaded-image.jpg',
            },
            message: 'Image uploaded successfully',
          };
        } catch (e) {
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },

      // Mock FILEUPLOAD function
      FILEUPLOAD: async (isToken = false, data) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Return mock file URL
          return {
            success: true,
            data: {
              url: 'https://via.placeholder.com/300x300?text=Uploaded+File',
              filename: 'uploaded-file.pdf',
            },
            message: 'File uploaded successfully',
          };
        } catch (e) {
          const error = new Error();
          error.status = 400;
          throw error;
        }
      },
    }),
    [state?.userToken]
  );

  return { handlers, state };
};
