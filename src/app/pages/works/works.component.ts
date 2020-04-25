import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { map, pluck, switchMap } from 'rxjs/operators'
import { ContentfulService } from '../../contentful.service'
import { RichTextConfig } from '../../rich-text/rich-text.component'
import { Observable } from 'rxjs'
import {
  SubheaderConfig,
  SubheaderLink,
  toSubheaderConfig,
} from '../../sub-header/subheader.component'

export interface Work extends SubheaderLink {
  richTextConfig: RichTextConfig
}

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    map((works) => toSubheaderConfig(works, 'works'))
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
