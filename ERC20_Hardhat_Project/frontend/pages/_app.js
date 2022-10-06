import { thirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <thirdwebProvider  desiredChainId={ChainId.Mumbai}>
      
      <Component {...pageProps} />
    </thirdwebProvider>
  );
}
export default MyApp;