import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

import { StateContextProvider } from "./context";
import { ErrorComponent } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent message={'Sorry some error Occured !!!'}/>,
    children: [
      { index: true, element: <Home/> },
      { path: "profile", element: <Profile/> },
      { path: "create-campaign", element: <CreateCampaign /> },
      { path: "campaign-details/:id", element: <CampaignDetails /> },
    ],
  },
]);

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "sepolia";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <StateContextProvider>
        <RouterProvider router={router} />
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
