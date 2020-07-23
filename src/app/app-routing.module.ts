import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { UsersComponent } from './routes/users/users.component';
import { AuthguardGuard } from './auth/authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
      path: 'users',
      component: DefaultComponent,
      children: [{
          path: '',
          component: UsersComponent
      }]
      , canActivate: [AuthguardGuard]
  },
 
];

@NgModule({
imports: [RouterModule.forRoot(routes, { useHash: true })],
exports: [RouterModule]
})

export class AppRoutingModule { }