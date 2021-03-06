import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { Work } from '../works/works.component'
import { map } from 'rxjs/operators'
import {
  SubheaderConfig,
  toSubheaderConfig,
} from '../../sub-header/subheader.component'
import { Meta, Title } from '@angular/platform-browser'
import { ContentfulService } from '../../contentful.service'
import { Film } from '../films/films.component'
import { UserClickedOnceService } from './user-clicked-once.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userClickedOnce = this.userClickedOnceService.userClickedOnce

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

  @HostListener('document:click')
  onUserClicked() {
    this.userClickedOnceService.userClickedOnce = true
    this.userClickedOnce = true
  }

  constructor(
    private title: Title,
    private meta: Meta,
    private contentfulService: ContentfulService,
    private userClickedOnceService: UserClickedOnceService
  ) {}

  ngOnInit(): void {
    // TODO Load the title and meta tags from the CMS as well
    this.title.setTitle('Ani Schulze')
    // this.meta.addTag('description', '...')
  }

  ngOnDestroy(): void {
    // When he is navigating
    this.onUserClicked()
  }
}
