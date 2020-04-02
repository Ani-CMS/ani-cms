import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { RichTextConfig } from '../../rich-text/rich-text.component'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ContentfulService } from '../../contentful.service'
import { ActivatedRoute } from '@angular/router'
import { Work } from '../works/works.component'
import { SubheaderConfig } from '../../sub-header/subheader.component'

export interface Films {
  linkText: string
  urlPath: string
  richTextConfig: RichTextConfig
}

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit {
  id$ = this.route.params.pipe(pluck('id'))
  films$: Observable<Work[]> = this.contentfulService.films$
  film$: Observable<Work> = this.id$.pipe(
    switchMap((id) =>
      this.films$.pipe(
        map((films) => films.find((film) => film.urlPath === id))
      )
    )
  )
  subheaderConfig$: Observable<SubheaderConfig> = this.films$.pipe(
    map((films) => {
      return {
        links: films.map((film) => {
          return {
            linkText: film.linkText,
            urlPath: film.urlPath,
          }
        }),
        urlSubdirectory: 'films',
      }
    })
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
