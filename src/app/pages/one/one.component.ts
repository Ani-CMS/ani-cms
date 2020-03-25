import { Component } from '@angular/core';
import { from } from 'rxjs';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent {
  events$ = from(this.contentfulService.getEvents());

  constructor(private contentfulService: ContentfulService) {
    console.log(1);
  }
}
