import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [NavigationComponent, FooterComponent],
})
export class CoreModule {}
