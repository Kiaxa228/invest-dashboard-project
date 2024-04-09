import { Select, Option } from "@material-tailwind/react";
import {useMaterialTailwindController} from "../context/index.jsx";
import {bgThemeStyles} from "../styles/styles.jsx";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import {useState} from "react";


export const StockSearch = () => {

    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav, textColor } = controller;
    const [hideSelectLabel, setHideSelectLabel] = useState(false)
    const handleSelectClick = () => {
        const label = document.querySelector("#label");
        if (label) {
            if (!hideSelectLabel) {
                label.style.display = "none";
                setHideSelectLabel(true)
            } else {
                label.style.display = "";
                setHideSelectLabel(false)
            }
        }
    }


    return (
        <div className="w-full">
            <Card>
                <CardBody className={bgThemeStyles.dark + " rounded-lg"}>
                    <Select
                        label={"Поиск"}
                        labelProps={{
                            id: "label",
                            style: { color: "white" },
                        }}
                        menuProps={{
                            className: bgThemeStyles.dark + " rounder-lg text-white",
                        }}
                        color={"yellow"}
                        className={"border-yellow-500 border-2 text-white"}
                        onClick={handleSelectClick}
                    >
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </CardBody>
            </Card>
        </div>
    );
}

