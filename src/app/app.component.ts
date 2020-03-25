import { Component } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  events$ = from(this.contentfulService.getEvents());

  constructor(private contentfulService: ContentfulService) {
  }

  getFields(event: Event) {
    return Object.values(event);
  }
}
