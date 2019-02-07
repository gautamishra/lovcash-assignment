import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import {SelectModule} from 'ng2-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTreeComponent } from './components/user-tree/user-tree.component';
import { RoleComponent } from './components/role/role.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTreeComponent,
    RoleComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    TreeModule.forRoot(),
    AppRoutingModule,
    SelectModule
  ],
  exports: [
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
