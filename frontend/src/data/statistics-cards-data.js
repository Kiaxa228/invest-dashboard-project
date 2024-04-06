import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ChartBarSquareIcon,
    CurrencyEuroIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "pink",
    icon: CreditCardIcon,
    title: "Баланс",
    value: "₽53000",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: ChartBarSquareIcon,
    title: "Инвестиции",
    value: "₽2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "pink",
    icon: CurrencyDollarIcon,
    title: "USD",
    value: "$3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "pink",
    icon: CurrencyEuroIcon,
    title: "EUR",
    value: "€103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
