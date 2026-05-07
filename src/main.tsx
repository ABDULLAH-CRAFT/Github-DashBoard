import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./css/globals.css";
import App from "./App.tsx";
import Spinner from "./views/spinner/Spinner.tsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// create query client instance
const queryClient = new QueryClient();

createRoot(
  document.getElementById("root")!
).render(
  <Suspense fallback={<Spinner />}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Suspense>
);