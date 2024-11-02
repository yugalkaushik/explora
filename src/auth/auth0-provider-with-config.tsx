import { Auth0Provider } from '@auth0/auth0-react';
import react, {ReactNode} from 'react';

interface Auth0ProviderWithConfigProps {
    children: ReactNode;
  }

  export const Auth0ProviderWithConfig: React.FC<Auth0ProviderWithConfigProps> = ({ children }) => {
    return (
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        }}
      >
        {children}
      </Auth0Provider>
    );
  };