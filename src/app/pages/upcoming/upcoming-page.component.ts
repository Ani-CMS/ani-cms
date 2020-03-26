import { Component } from '@angular/core';
import { from } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-texts',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.css']
})
export class UpcomingPage {
  events$ = from(this.contentfulService.getEvents());

  constructor(private contentfulService: ContentfulService) {
  }
}
