import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useContext,
    useState,
} from "react";
import DashboardAccordion from "./DashboardAccordion";
import WebClientForm from "./WebClientForm";
import { Sender } from "../contexts/WebClientContext";
import WebClientHandler from "./WebClientHandler";
import {
    AppStateContext,
    AppStateDashboardConfigurationType,
} from "../contexts/AppStateContext";
import { useSnapshot } from "valtio";
import DofusDashboardPage from "./DofusDashboardPage";
import DofusDashboardFormContent from "./DofusDashboardFormContent";
import mitm_handler, { dofus_mitm_handler } from "../utils/mitm_handler";

export type DashboardPageParams = {
    pid: number;
    onClose: (pid: number) => void;
};

export default function DashboardPage({ pid, onClose }: DashboardPageParams) {
    const appState = useContext(AppStateContext);
    const appSnap = useSnapshot(appState, { sync: true });
    const [selectedConfiguration, setSelectedConfiguration] =
        useState<AppStateDashboardConfigurationType>("none");

    const handleConfigurationChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            setSelectedConfiguration(
                event.target.value as AppStateDashboardConfigurationType
            );
        },
        []
    );

    const handleStart = useCallback(
        (event: FormEvent<HTMLFormElement>, sender: Sender) => {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const configurationtype = target.configurationtype.value;
            appState[pid].configurationtype = configurationtype;
            switch (configurationtype) {
                case "dofus":
                    const dofusinvoker_path = target.dofusinvoker.value;
                    const protocol_path = target.protocol.value;

                    sender({
                        type: "execute",
                        module: "botofu-module",
                        action: "parse",
                        params: {
                            input: dofusinvoker_path,
                            output: protocol_path,
                        },
                    });

                    appState[pid].configurationparams = {
                        protocol: protocol_path,
                    };
                    return;
                case "none":
                    appState[pid].configurationparams = {};
                    return;
            }
        },
        [pid]
    );

    const noneHandlers = mitm_handler({
        pid,
        onConnect: (data) => console.log(data),
        onRecv: (data) => console.log(data),
        onSend: (data) => console.log(data),
    });

    const dofusHandlers = dofus_mitm_handler({
        pid,
        protocol: appSnap[pid].configurationparams?.protocol,
    });

    return (
        <div className="p-6">
            <DashboardAccordion defaultOpen={false} title="Status">
                <div className="mb-4">pid: {pid}</div>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mr-2"
                    onClick={() => onClose(pid)}
                >
                    Close
                </button>
                {appSnap[pid].configurationtype && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
                        onClick={() => {
                            appState[pid].configurationtype = undefined;
                            setSelectedConfiguration("none");
                        }}
                    >
                        Reset
                    </button>
                )}
            </DashboardAccordion>
            {!appSnap[pid].configurationtype ? (
                <DashboardAccordion defaultOpen={true} title="Configuration">
                    <WebClientForm onClientSubmit={handleStart}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm mb-2"
                                htmlFor="configurationtype"
                            >
                                Configuration Type:
                            </label>
                            <select
                                className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                id="configurationtype"
                                required
                                onChange={handleConfigurationChange}
                            >
                                <option value="none">None</option>
                                <option value="dofus">Dofus</option>
                            </select>
                        </div>
                        {selectedConfiguration === "dofus" && (
                            <DofusDashboardFormContent />
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
                            type="submit"
                        >
                            Start
                        </button>
                    </WebClientForm>
                </DashboardAccordion>
            ) : (
                <>
                    <WebClientHandler
                        handlers={
                            appSnap[pid].configurationtype === "dofus"
                                ? dofusHandlers
                                : appSnap[pid].configurationtype === "none"
                                ? noneHandlers
                                : {}
                        }
                    >
                        {appSnap[pid].configurationtype === "dofus" && (
                            <DofusDashboardPage pid={pid} />
                        )}
                    </WebClientHandler>
                </>
            )}
        </div>
    );
}
