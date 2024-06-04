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
import investmentsStore from '../../stores/InvestmentsStore.jsx'
import {observer} from "mobx-react-lite"


export const statisticsCardsData = ([
    {
        color: "yellow",
        icon: CreditCardIcon,
        title: "Баланс",
        value: `₽${investmentsStore.currentBalance}`,
        footer: {
            color: "text-green-500",
            value: "+55%",
            label: "than last week",
        },
    },
    {
        color: "yellow",
        icon: ChartBarSquareIcon,
        title: "Юянь",
        value: `¥${investmentsStore.YAUN}`,
        footer: {
            color: "text-green-500",
            value: "+3%",
            label: "than last month",
        },
    },
    {
        color: "yellow",
        icon: CurrencyDollarIcon,
        title: "USD",
        value: `$${investmentsStore.USD}`,
        footer: {
            color: "text-red-500",
            value: "-2%",
            label: "than yesterday",
        },
    },
    {
        color: "yellow",
        icon: CurrencyEuroIcon,
        title: "EUR",
        value: `€${investmentsStore.EUR}`,
        footer: {
            color: "text-green-500",
            value: "+5%",
            label: "than yesterday",
        },
    },
])

export default statisticsCardsData;