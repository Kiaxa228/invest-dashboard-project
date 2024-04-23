import React from "react";
import { Select, Option } from "@material-tailwind/react";

export default function CategorySelect({label}) {
    const [value, setValue] = React.useState("");

    return (
        <div className="w-35">
            <Select
                label={label}
                value={value}
                onChange={(val) => setValue(val)}
            >
                <Option value="html">Material Tailwind HTML</Option>
                <Option value="react">Material Tailwind React</Option>
                <Option value="vue">Material Tailwind Vue</Option>
                <Option value="angular">Material Tailwind Angular</Option>
                <Option value="svelte">Material Tailwind Svelte</Option>
            </Select>
        </div>
    );
}