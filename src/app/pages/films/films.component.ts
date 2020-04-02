import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RichTextConfig } from '../../rich-text/rich-text.component'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ContentfulService } from '../../contentful.service'
import { ActivatedRoute } from '@angular/router'
import {
  SubheaderConfig,
  SubheaderLink,
  toSubheaderConfig,
} from '../../sub-header/subheader.component'

export interface Film extends SubheaderLink {
  richTextConfig: RichTextConfig
}

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit {
  id$ = this.route.params.pipe(pluck('id'))
  films$: Observable<Film[]> = this.contentfulService.films$
  film$: Observable<Film> = this.id$.pipe(
    switchMap((id) =>
      this.films$.pipe(
        map((films) => films.find((film) => film.urlPath === id))
      )
    )
  )
  subheaderConfig$: Observable<SubheaderConfig> = this.films$.pipe(
    map((films) => toSubheaderConfig(films, 'films'))
  )

  constructor(
    private title: Title,
    private contentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('FILMS')
  }
}
