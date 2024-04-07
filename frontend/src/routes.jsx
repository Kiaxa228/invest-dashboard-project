import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
    ChartBarIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import SettingsData from "@/modules/settings/view/SettingsData.jsx";
import {StockData} from "./modules/stock/view/StockData.jsx";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Дашборд",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Профиль",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Биржа",
        path: "/stock",
        element: <StockData />,
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "Настройки",
        path: "/settings",
        element: <SettingsData />,
      }
    ],
  },
  {
    title: "Аутентификация",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Авторизация",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Регистрация",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
