export interface PermissionModal {
    id: number;
    name: string;
    selected: boolean;
}

export interface Permissions {
    id: number;
    permissionName: string;
    permissionval: PermissionModal[];
}
export interface Role {
    roleName: string;
    scope: string;
    selectedPermissions: Permissions[];
}

