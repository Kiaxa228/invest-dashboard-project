import { Select, Option } from "@material-tailwind/react";
import {useMaterialTailwindController} from "../context/index.jsx";
import {bgThemeStyles} from "../styles/styles.jsx";
export const StockSearch = () => {

    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavColor, sidenavType, openSidenav, textColor } = controller;

    return (
        <div className="w-full">
            <Select
                label="Поиск"
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                }}
                className={""}
            >
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
            </Select>
        </div>
    );
}