import { Component, OnInit } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { Work } from '../works/works.component'
import { map } from 'rxjs/operators'
import {
  SubheaderConfig,
  toSubheaderConfig,
} from '../../sub-header/subheader.component'
import { Title } from '@angular/platform-browser'
import { ContentfulService } from '../../contentful.service'
import { Film } from '../films/films.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  works$: Observable<Work[]> = this.contentfulService.works$
  films$: Observable<Film[]> = this.contentfulService.films$

  subheaderConfig$: Observable<SubheaderConfig> = forkJoin(
    this.works$,
    this.films$
  ).pipe(
    map(([works, films]) => {
      const worksSubheaderConfig = toSubheaderConfig(works, 'works')
      const filmsSubheaderConfig = toSubheaderConfig(films, 'films')
      const subheaderConfig: SubheaderConfig = {
        links: [
          ...worksSubheaderConfig.links,
          ...filmsSubheaderConfig.links,
        ].sort((a, b) => (a.linkText > b.linkText ? 1 : -1)),
      }
      return subheaderConfig
    })
  )

  constructor(
    private title: Title,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Ani Schulze')
  }
}
