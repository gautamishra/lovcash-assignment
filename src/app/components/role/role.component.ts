import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { Permissions, PermissionModal, Role } from 'src/app/modal/permission.modal';
import { SelectModule } from 'ng2-select';


const AVAILABLEPERMISSION: PermissionModal[] = [
  {
    id: 1,
    name: 'Create',
    selected: false
  },
  {
    id: 1,
    name: 'Edit',
    selected: false
  },
  {
    id: 1,
    name: 'View',
    selected: false
  },
  {
    id: 1,
    name: 'Delete',
    selected: false
  }
];

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  permissionToSelect = _.cloneDeep(AVAILABLEPERMISSION);
  showPermission = false;
  showRole = false;
  permissionName = '';
  allPermissions: Permissions[] = [];
  availableRoles: Role[] = [];
  permissionsData = [];
  roleName = '';
  scope = '';
  selectedPermission = [];
  constructor() { }

  ngOnInit() {
    if (!!window.localStorage.getItem('allPermissions')) {
      this.allPermissions = JSON.parse(window.localStorage.getItem('allPermissions'));
    }
    if (!!window.localStorage.getItem('allRoles')) {
      this.availableRoles = JSON.parse(window.localStorage.getItem('allRoles'));
    }

  }

  addPermission = () => {
    const permission: Permissions = {
      id: (this.allPermissions.length > 0) ? this.allPermissions[this.allPermissions.length - 1].id + 1 : 1,
      permissionName: this.permissionName,
      permissionval: this.permissionToSelect
    };
    this.allPermissions.push(permission);
    this.permissionToSelect = _.cloneDeep(AVAILABLEPERMISSION);
    this.permissionName = '';
    this.showPermission = false;
    window.localStorage.setItem('allPermissions', JSON.stringify(this.allPermissions));
  }

  formatData = () => {
    this.permissionsData = this.allPermissions.map((permision) => {
      return {
        id: permision.id,
        text: permision.permissionName
      };
    });
    console.log(this.permissionsData);
  }

  getSelectedPermission = (data) => {
    this.selectedPermission = data;
  }

  selectall = () => {
    this.selectedPermission = this.allPermissions.map((permision) => {
      return {
        id: permision.id,
        text: permision.permissionName
      };
    });
  }

  createRole = () => {
    const role: Role = {
      roleName: this.roleName,
      scope: this.scope,
      selectedPermissions: this.allPermissions.filter((permission) => !!this.selectedPermission.find((perm) => perm.id === permission.id))
    };
    this.availableRoles.push(role);
    this.selectedPermission = [];
    this.roleName = '';
    this.scope = '';
    window.localStorage.setItem('allRoles', JSON.stringify(this.availableRoles));
  }
}
