import { ButtonHTMLAttributes } from "react";

export type TabParams = {
    label: string;
    isActive: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Tab(params: TabParams) {
    const activeClasses = params.isActive
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700";

    return (
        <>
            <button
                className={`px-4 py-2 flex ${activeClasses}`}
                onClick={params.onClick}
            >
                {params.label}
            </button>
        </>
    );
}
