import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
})
export class UpcomingComponent implements OnInit {
  upcomingEvents$ = this.contentfulService.upcomingEvents$

  constructor(
    private contentfulService: ContentfulService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('UPCOMING - PAST')
  }
}
