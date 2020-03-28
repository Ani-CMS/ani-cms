import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ExternalText } from './pages/texts/external-text/external-text.component'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { About } from './pages/about/about.component'

/*
 TODO
  Subheader:
    - Jeder subheader gleiches Pattern, stylen mit nth-child -> Titles austauschen.
    - Multiple links on one row
    - One single Subheader component?
  Other
   - Add title to every content model
  Slideshows
    - Use inline entries
    - Regex last resort, try to change the document with the util functions instead
 */

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient({
    space: 'hy4v2om2p6ry',
    environment: 'master',
    accessToken: 'yG8c6btCdKehQU8Of7viYjYcwg9ASsZJsRZ6gEKMJw8'
  })

  events$: Observable<Event[]> = from(
    this.client.getEntries({ content_type: 'event' })
  ).pipe(
    map((response) => {
      return response.items.map((item: any) => {
        return {
          ...item.fields,
          link: this.getLink(item.fields.link),
          richText: documentToHtmlString(item.fields.freeText)
        }
      })
    })
  )

  externalTexts$: Observable<ExternalText[]> = from(
    this.client.getEntries({ content_type: 'externalText' })
  ).pipe(
    map((response) => {
      return response.items.map((item: any) => {
        return {
          ...item.fields,
          link: this.getLink(item.fields.link)
        }
      })
    })
  )

  text$: Observable<Text[]> = from(
    this.client.getEntries({ content_type: 'text' })
  ).pipe(
    map((response) => {
      return response.items.map((item: any) => {
        return {
          ...item.fields,
          richText: documentToHtmlString(item.fields.freeText)
        }
      })
    })
  )

  about$: Observable<About> = from(
    this.client.getEntries({ content_type: 'about' })
  ).pipe(
    map((response: any) => {
      return {
        richText: documentToHtmlString(response.items[0].fields.freeText)
      }
    })
  )

  private getLink(link): string {
    return link.content[0].content[1].data.uri
  }
}
