import { Component } from '@angular/core';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-texts',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.css']
})
export class UpcomingPage {
  events$ = this.contentfulService.events$;

  constructor(private contentfulService: ContentfulService) {
  }
}
