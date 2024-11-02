import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout, 
    user, 
    getAccessTokenSilently 
  } = useAuth0();
  
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Use a cast to `any` to bypass TypeScript checks
  const handleLogout = () => {
    logout({ returnTo: window.location.origin } as any);
  };

  return {
    isAuthenticated,
    user,
    token,
    login: loginWithRedirect,
    logout: handleLogout,
  };
};
