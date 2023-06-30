import Tab, { TabParams } from "./Tab";

export type DropdownTabParams = {} & Omit<TabParams, "isActive">;

export default function DropdownTab(params: DropdownTabParams) {
    return <Tab {...params} isActive={false} />;
}
