import { FormHTMLAttributes, FormEvent, useCallback } from "react";
import WebClientForm from "./WebClientForm";
import { Sender } from "../contexts/WebClientContext";

export type CreationPageParams = {} & FormHTMLAttributes<HTMLFormElement>;

export default function CreationPage({}: CreationPageParams) {
    const handleStart = useCallback(
        (event: FormEvent<HTMLFormElement>, sender: Sender) => {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const pid = target.pid.valueAsNumber;

            sender({
                type: "execute",
                module: "mitm-module",
                action: "create_scanner",
                params: {
                    pid,
                },
            });
        },
        []
    );

    return (
        <WebClientForm
            className="max-w-xs mx-auto mt-8"
            onClientSubmit={handleStart}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm mb-2"
                    htmlFor="pid"
                >
                    Pid:
                </label>
                <input
                    className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="number"
                    id="pid"
                    required
                    placeholder="Enter PID"
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
                type="submit"
            >
                Start
            </button>
        </WebClientForm>
    );
}
