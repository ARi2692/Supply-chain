import "./App.css";

import { Routes, Route } from "react-router-dom";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import Farmer from "./pages/Farmer";
import Supplier from "./pages/Supplier";
import Regulator from "./pages/Regulator";
import Distributor from "./pages/Distributor";
import QualityAssurance from "./pages/QualityAssurance";
import DeliveryTruck from "./pages/DeliveryTruck";
import Consumer from "./pages/Consumer";
import Retailer from "./pages/Retailer";


// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";


const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [publicProvider()]
);

const projectId = '44800374dd37fb0134462d19a95e5c0a';
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId,
  chains,
});
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <div className="App">
      <WagmiConfig config={config}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={darkTheme({
            accentColor: "#04807b",
            accentColorForeground: "white",
            borderRadius: "medium",
          })}
        >
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/farmer" element={<Farmer />} />
            <Route exact path="/supplier" element={<Supplier />} />
            <Route exact path="/regulator" element={<Regulator />} />
            <Route exact path="/distributor" element={<Distributor />} />
            <Route exact path="/qualityAssurance" element={<QualityAssurance />} />
            <Route exact path="/deliveryTruck" element={<DeliveryTruck />} />
            <Route exact path="/retailer" element={<Retailer />} />
            <Route exact path="/consumer" element={<Consumer />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
