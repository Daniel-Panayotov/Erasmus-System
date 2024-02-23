import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [];

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [NavigationComponent, FooterComponent],
})
export class CoreModule {}
