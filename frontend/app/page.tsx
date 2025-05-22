// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "@/app/landing/page";
import Chat from "@/app/chat/page";
import NotFound from "@/app/not-found/page";

import { AnimatePresence } from "framer-motion";

// const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App = () => (
  // <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <Toaster /> */}
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  // </QueryClientProvider>
);

export default App;