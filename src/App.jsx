import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdelaideLouiseHall from "./pages/AdelaideLouiseHall";
import MetroBoomin from "./pages/MetroBoomin";
import KendrickLamar from "./pages/KendrickLamar";
import SabrinaCarpenter from "./pages/SabrinaCarpenter";
import MariahCarey from "./pages/MariahCarey";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/adelaide-louise-hall" element={<AdelaideLouiseHall />} />
          <Route path="/metro-boomin" element={<MetroBoomin />} />
          <Route path="/kendrick-lamar" element={<KendrickLamar />} />
          <Route path="/sabrina-carpenter" element={<SabrinaCarpenter />} />
          <Route path="/mariah-carey" element={<MariahCarey />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
