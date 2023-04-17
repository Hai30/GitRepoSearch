import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  loadedFeature = 'home';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
