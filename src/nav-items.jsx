import { HomeIcon, MicIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import SingersList from "./pages/SingersList.jsx";
import SingerDetails from "./pages/SingerDetails.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Singers",
    to: "/singers",
    icon: <MicIcon className="h-4 w-4" />,
    page: <SingersList />,
  },
  {
    title: "Singer Details",
    to: "/singer/:id",
    icon: <MicIcon className="h-4 w-4" />,
    page: <SingerDetails />,
  },
];
