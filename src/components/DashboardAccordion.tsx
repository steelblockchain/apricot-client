import { ReactNode, useCallback, useState, HTMLAttributes } from "react";

export type DashboardAccordionParams = {
    defaultOpen?: boolean;
    children?: ReactNode;
    title?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function DashboardAccordion(params: DashboardAccordionParams) {
    const [isOpen, setIsOpen] = useState(params.defaultOpen ?? false);

    const switchOpen = useCallback(() => {
        setIsOpen((o) => !o);
    }, []);

    const { defaultOpen, children, title, ...rest } = params;

    return (
        <>
            <div {...rest} className="bg-white shadow p-6 mb-6">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={switchOpen}
                >
                    <h2 className="">{params.title ?? "no title"}</h2>
                    <p>{isOpen ? "-" : "+"}</p>
                </div>

                <div
                    className={`mt-4 ${
                        isOpen && params.children ? "" : "hidden"
                    }`}
                >
                    {params.children}
                </div>
            </div>
        </>
    );
}
