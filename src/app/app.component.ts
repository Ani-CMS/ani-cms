import { Component } from '@angular/core'
import { ContentfulService } from './contentful.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private contentfulService: ContentfulService) {}
}
