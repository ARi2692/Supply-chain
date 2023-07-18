import "./App.css";

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Farmer from "./pages/Farmer";
import Supplier from "./pages/Supplier";
import Regulator from "./pages/Regulator";
import Distributor from "./pages/Distributor";
import QualityAssurance from "./pages/QualityAssurance";
import Logistics from "./pages/Logistics";
import Consumer from "./pages/Consumer";
import Retailer from "./pages/Retailer";
import Products from "./pages/Products";

import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";
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

const projectId = "44800374dd37fb0134462d19a95e5c0a";
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
            <Route
              exact
              path="/qualityAssurance"
              element={<QualityAssurance />}
            />
            <Route exact path="/logistics" element={<Logistics />} />
            <Route exact path="/retailer" element={<Retailer />} />
            <Route exact path="/consumer" element={<Consumer />} />
            <Route exact path="/product" element={<Products />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
