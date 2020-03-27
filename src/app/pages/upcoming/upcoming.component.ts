import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
})
export class UpcomingComponent implements OnInit {
  events$ = this.contentfulService.events$

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {}
}
