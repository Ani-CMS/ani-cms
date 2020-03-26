import { Component } from '@angular/core';
import { from } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.page.html',
  styleUrls: ['./texts.page.css']
})
export class TextsPage {
  events$ = from(this.contentfulService.getEvents());

  constructor(private contentfulService: ContentfulService) {
    console.log(1);
  }
}
