import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admins',
    loadChildren: () =>
      import('./admins/admins-routing.module').then(
        (m) => m.AdminsRoutingModule
      ),
    canLoad: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
