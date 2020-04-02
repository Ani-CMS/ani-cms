import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { map, pluck, switchMap } from 'rxjs/operators'
import { ContentfulService } from '../../contentful.service'
import { RichTextConfig } from '../../rich-text/rich-text.component'
import { Observable } from 'rxjs'
import { SubheaderConfig } from '../../sub-header/subheader.component'

export interface Work {
  linkText: string
  urlPath: string
  richTextConfig: RichTextConfig
}

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
})
export class WorksComponent implements OnInit {
  id$ = this.route.params.pipe(pluck('id'))
  works$: Observable<Work[]> = this.contentfulService.works$
  work$: Observable<Work> = this.id$.pipe(
    switchMap((id) =>
      this.works$.pipe(
        map((works) => works.find((work) => work.urlPath === id))
      )
    )
  )
  subheaderConfig$: Observable<SubheaderConfig> = this.works$.pipe(
    map((works) => {
      return {
        links: works.map((work) => {
          return {
            linkText: work.linkText,
            urlPath: '/works/' + work.urlPath,
          }
        }),
        urlSubdirectory: 'works',
      }
    })
  )

  constructor(
    private title: Title,
    private contentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('WORKS')
  }
}
