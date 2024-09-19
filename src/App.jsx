import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
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
import KurtCobain from "./pages/KurtCobain";
import StevieNicks from "./pages/StevieNicks";
import VanessaParadis from "./pages/VanessaParadis";
import ZacharyBryan from "./pages/ZacharyBryan";
import BillieHoliday from "./pages/BillieHoliday";
import KidzBop from "./pages/KidzBop";
import JackieWilson from "./pages/JackieWilson";
import EdSheeran from "./pages/EdSheeran";
import Tarkan from "./pages/Tarkan";
import BenjaminBiolay from "./pages/BenjaminBiolay";
import HankWilliams from "./pages/HankWilliams";
import TheCarpenters from "./pages/TheCarpenters";
import JoniMitchell from "./pages/JoniMitchell";
import GeorgeJones from "./pages/GeorgeJones";
import LutanFyah from "./pages/LutanFyah";
import Radiohead from "./pages/Radiohead";
import Bjork from "./pages/Bjork";
import Live from "./pages/Live";
import IceSpice from "./pages/IceSpice";
import Bandmanrill from "./pages/Bandmanrill";
import GloRilla from "./pages/GloRilla";
import AyraStarr from "./pages/AyraStarr";
import MarieOsmond from "./pages/MarieOsmond";
import SamCooke from "./pages/SamCooke";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
          <Route path="/kurt-cobain" element={<KurtCobain />} />
          <Route path="/stevie-nicks" element={<StevieNicks />} />
          <Route path="/vanessa-paradis" element={<VanessaParadis />} />
          <Route path="/zachary-bryan" element={<ZacharyBryan />} />
          <Route path="/billie-holiday" element={<BillieHoliday />} />
          <Route path="/kidz-bop" element={<KidzBop />} />
          <Route path="/jackie-wilson" element={<JackieWilson />} />
          <Route path="/ed-sheeran" element={<EdSheeran />} />
          <Route path="/tarkan" element={<Tarkan />} />
          <Route path="/benjamin-biolay" element={<BenjaminBiolay />} />
          <Route path="/hank-williams" element={<HankWilliams />} />
          <Route path="/the-carpenters" element={<TheCarpenters />} />
          <Route path="/joni-mitchell" element={<JoniMitchell />} />
          <Route path="/george-jones" element={<GeorgeJones />} />
          <Route path="/lutan-fyah" element={<LutanFyah />} />
          <Route path="/radiohead" element={<Radiohead />} />
          <Route path="/bjork" element={<Bjork />} />
          <Route path="/live" element={<Live />} />
          <Route path="/ice-spice" element={<IceSpice />} />
          <Route path="/bandmanrill" element={<Bandmanrill />} />
          <Route path="/glorilla" element={<GloRilla />} />
          <Route path="/ayra-starr" element={<AyraStarr />} />
          <Route path="/marie-osmond" element={<MarieOsmond />} />
          <Route path="/sam-cooke" element={<SamCooke />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
