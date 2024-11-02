import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Auth0ProviderWithConfig } from '../auth/auth0-provider-with-config';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0ProviderWithConfig>
      <Component {...pageProps} />
    </Auth0ProviderWithConfig>
  );
}

export default MyApp;
