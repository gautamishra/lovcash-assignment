import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTreeComponent } from './components/user-tree/user-tree.component';
import { RoleComponent } from './components/role/role.component';

const routes: Routes = [{
  path: 'tree-example',
  component: UserTreeComponent
},
{
  path: 'role',
  component: RoleComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
