import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { LinkedText } from './pages/texts/linked-text/linked-text.component'
import { RichTextConfig } from './rich-text/rich-text.component'
import { UpcomingEvent } from './pages/upcoming/upcoming-event/upcoming-event.component'
import { LongText } from './pages/texts/texts.component'
import { Work } from './pages/works/works.component'
import { Film } from './pages/films/films.component'
import { SubheaderPosition } from './sub-header/subheader.component'
import { RichTextParserService } from './rich-text-parser.service'

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor(private richTextParser: RichTextParserService) {}

  private client = createClient({
    space: 'hy4v2om2p6ry',
    environment: 'master',
    accessToken: 'yG8c6btCdKehQU8Of7viYjYcwg9ASsZJsRZ6gEKMJw8',
  })

  subheaderPositions$: Observable<SubheaderPosition[]> = from(
    this.client.getEntries({ content_type: 'subHeaderPosition' })
  ).pipe(
    map((response: any) =>
      response.items
        .map((item) => {
          return {
            ...item.fields,
          }
        })
        .sort((a, b) => a.index - b.index)
    )
  )

  upcomingEvents$: Observable<UpcomingEvent[]> = from(
    this.client.getEntries({ content_type: 'event' })
  ).pipe(
    map((response) => {
      return response.items
        .map(
          (item: any): UpcomingEvent => {
            return {
              ...item.fields,
              image: item.fields.image
                ? item.fields.image.fields.file.url
                : null,
              richTextConfig: item.fields.freeText
                ? this.richTextParser.parse(item.fields.freeText)
                : null,
            }
          }
        )
        .sort((a, b) => b.index - a.index)
    })
  )

  linkedTexts$: Observable<LinkedText[]> = from(
    this.client.getEntries({ content_type: 'externalText' })
  ).pipe(
    map((response) => {
      return response.items
        .map(
          (item: any): LinkedText => {
            return {
              ...item.fields,
              link: item.fields.link,
            }
          }
        )
        .sort((a, b) => b.index - a.index)
    })
  )

  longTexts$: Observable<LongText[]> = from(
    this.client.getEntries({ content_type: 'text' })
  ).pipe(
    map((response: any) => {
      return response.items
        .map(
          (item): LongText => {
            return {
              ...item.fields,
              id: item.sys.id,
              richTextConfig: this.richTextParser.parse(item.fields.freeText),
            }
          }
        )
        .sort((a, b) => b.index - a.index)
    })
  )

  about$: Observable<RichTextConfig> = from(
    this.client.getEntries({ content_type: 'about' })
  ).pipe(
    map((response: any) =>
      this.richTextParser.parse(response.items[0].fields.freeText)
    )
  )

  works$: Observable<Work[]> = from(
    this.client.getEntries({ content_type: 'works' })
  ).pipe(
    map((response: any) =>
      response.items
        .map((item) => {
          return {
            ...item.fields,
            richTextConfig: item.fields.freeText
              ? this.richTextParser.parse(item.fields.freeText)
              : null,
          }
        })
        .sort((a, b) => (a.index > b.index ? 1 : -1))
    ),
    shareReplay(1)
  )

  films$: Observable<Film[]> = from(
    this.client.getEntries({ content_type: 'films' })
  ).pipe(
    map((response: any) =>
      response.items
        .map((item) => {
          return {
            ...item.fields,
            richTextConfig: item.fields.freeText
              ? this.richTextParser.parse(item.fields.freeText)
              : null,
          }
        })
        .sort((a, b) => (a.index > b.index ? 1 : -1))
    ),
    shareReplay(1)
  )
}
