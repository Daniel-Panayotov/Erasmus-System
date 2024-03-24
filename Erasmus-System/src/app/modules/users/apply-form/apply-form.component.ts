import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { NavigationComponent } from 'src/app/core/navigation/navigation.component';

@Component({
  selector: 'app-apply-form',
  standalone: true,
  imports: [NavigationComponent, FooterComponent],
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.css',
})
export class ApplyFormComponent {}
