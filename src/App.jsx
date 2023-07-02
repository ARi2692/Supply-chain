import "./App.css";

import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";
import Farmer from "./pages/Farmer";
import Manufacturer from "./pages/Manufacturer";
import Processor from "./pages/Processor";
import DistributionCompany from "./pages/DistributionCompany";
import DistributionCentre from "./pages/DistributionCentre";
import DeliveryTruck from "./pages/DeliveryTruck";
import Consumer from "./pages/Consumer";
import Retailer from "./pages/Retailer";

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

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const projectId = 'YOUR_PROJECT_ID';
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
            <Route exact path="/manufacturer" element={<Manufacturer />} />
            <Route exact path="/processor" element={<Processor />} />
            <Route exact path="/distributionCompany" element={<DistributionCompany />} />
            <Route exact path="/distributionCentre" element={<DistributionCentre />} />
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
