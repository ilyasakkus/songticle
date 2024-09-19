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
import FreddieMercury from "./pages/FreddieMercury";
import WhitneyHouston from "./pages/WhitneyHouston";
import ElvisPresley from "./pages/ElvisPresley";
import JanisJoplin from "./pages/JanisJoplin";
import RoyOrbison from "./pages/RoyOrbison";
import RayCharles from "./pages/RayCharles";
import WalkUpSongs from "./pages/WalkUpSongs";
import ArethaFranklin from "./pages/ArethaFranklin";
import TomPetty from "./pages/TomPetty";
import GreatestJazzSongs from "./pages/GreatestJazzSongs";
import AxlRose from "./pages/AxlRose";

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
          <Route path="/freddie-mercury" element={<FreddieMercury />} />
          <Route path="/whitney-houston" element={<WhitneyHouston />} />
          <Route path="/elvis-presley" element={<ElvisPresley />} />
          <Route path="/janis-joplin" element={<JanisJoplin />} />
          <Route path="/roy-orbison" element={<RoyOrbison />} />
          <Route path="/ray-charles" element={<RayCharles />} />
          <Route path="/walk-up-songs" element={<WalkUpSongs />} />
          <Route path="/aretha-franklin" element={<ArethaFranklin />} />
          <Route path="/tom-petty" element={<TomPetty />} />
          <Route path="/greatest-jazz-songs" element={<GreatestJazzSongs />} />
          <Route path="/axl-rose" element={<AxlRose />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
