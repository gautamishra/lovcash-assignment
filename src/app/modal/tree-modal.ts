export interface TreeNodeModal {
    id: number;
    name: string;
    children?: TreeNodeModal[],
    isExpanded?: boolean;
}
