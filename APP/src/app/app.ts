import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/core/navigation/navigation';
import { Footer } from './components/core/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('APP');
}
