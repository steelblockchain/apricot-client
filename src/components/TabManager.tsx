import { cloneElement, useCallback, useState } from "react";
import Tab, { TabParams } from "./Tab";
import DropdownTab from "./DropdownTab";

export type TabManagerTab = {
    params: Omit<TabParams, "isActive">;
    content: JSX.Element;
};

export type TabManagerParams = {
    tabs: Array<TabManagerTab>;
    defaultTab?: TabManagerTab;
    defaultIndex?: number;
};

export default function TabManager(params: TabManagerParams) {
    const [activeTab, setActiveTab] = useState(params.defaultIndex ?? -1);
    const [dropdown, setDropdown] = useState(false);

    const handleTabClick = useCallback(
        (index: number) => {
            setActiveTab(index);
        },
        [setActiveTab]
    );

    return (
        <>
            <div>
                <div className="flex">
                    <Tab
                        {...(params.defaultTab
                            ? params.defaultTab.params
                            : { label: "+" })}
                        isActive={activeTab === -1}
                        onClick={() => handleTabClick(-1)}
                    />
                    {params.tabs.slice(0, 4).map((x, i) => (
                        <Tab
                            key={i}
                            {...x.params}
                            isActive={i === activeTab}
                            onClick={
                                x.params.onClick
                                    ? x.params.onClick
                                    : () => {
                                          handleTabClick(i);
                                          setDropdown(false);
                                      }
                            }
                        />
                    ))}
                    {activeTab >= 4 && params.tabs.length > activeTab && (
                        <Tab
                            {...params.tabs[activeTab].params}
                            isActive={true}
                            onClick={
                                params.tabs[activeTab].params.onClick
                                    ? params.tabs[activeTab].params.onClick
                                    : () => handleTabClick(activeTab)
                            }
                        />
                    )}
                    <div className="relative">
                        {params.tabs.length > 4 && (
                            <>
                                <DropdownTab
                                    label="..."
                                    onClick={() => {
                                        setDropdown((d) => !d);
                                    }}
                                />
                                {dropdown && (
                                    <div className="absolute">
                                        {params.tabs.slice(4).map(
                                            (x, i) =>
                                                i + 4 !== activeTab && (
                                                    <Tab
                                                        key={i + 4}
                                                        {...x.params}
                                                        isActive={
                                                            i + 4 === activeTab
                                                        }
                                                        onClick={
                                                            x.params.onClick
                                                                ? x.params
                                                                      .onClick
                                                                : () => {
                                                                      handleTabClick(
                                                                          i + 4
                                                                      );
                                                                      setDropdown(
                                                                          false
                                                                      );
                                                                  }
                                                        }
                                                    />
                                                )
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div
                    id="tab-default"
                    className={activeTab === -1 ? "" : "hidden"}
                >
                    {params.defaultTab?.content}
                </div>
                {params.tabs.map((x, i) => {
                    const children = cloneElement(x.content, {
                        onClose: (pid: number) => {
                            x.content.props.onClose?.(pid);
                            handleTabClick(params.defaultIndex ?? -1);
                        },
                    });

                    return (
                        <div
                            id={`tab-${i}`}
                            key={i}
                            className={activeTab === i ? "" : "hidden"}
                        >
                            {children}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
