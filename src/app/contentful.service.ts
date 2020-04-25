import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { LinkedText } from './pages/texts/linked-text/linked-text.component'
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer'
import { Slideshow, SlideshowComponent } from './slideshow/slideshow.component'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { NewComponent, RichTextConfig } from './rich-text/rich-text.component'
import { UpcomingEvent } from './pages/upcoming/upcoming-event/upcoming-event.component'
import { LongText } from './pages/texts/texts.component'
import { Work } from './pages/works/works.component'
import { Film } from './pages/films/films.component'
import { SubheaderPosition } from './sub-header/subheader.component'

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
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
                ? toRichTextConfig(item.fields.freeText)
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
              richTextConfig: toRichTextConfig(item.fields.freeText),
            }
          }
        )
        .sort((a, b) => b.index - a.index)
    })
  )

  about$: Observable<RichTextConfig> = from(
    this.client.getEntries({ content_type: 'about' })
  ).pipe(
    map((response: any) => toRichTextConfig(response.items[0].fields.freeText))
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
              ? toRichTextConfig(item.fields.freeText)
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
              ? toRichTextConfig(item.fields.freeText)
              : null,
          }
        })
        .sort((a, b) => (a.index > b.index ? 1 : -1))
    ),
    shareReplay(1)
  )
}

const isVideo = (node) => {
  return node.data.target?.sys.contentType?.sys.id === 'video'
}
const isImage = (node) =>
  node.data.target?.fields.file?.contentType === 'image/jpeg'
const isSlideshow = (node) =>
  node.data.target?.sys.contentType?.sys.id === 'slideshow'
const toSlideshow = (node): Slideshow => {
  return {
    width: node.data.target.fields.width,
    height: node.data.target.fields.height,
    imageUrls: node.data.target.fields.slideshowImage.map(
      (image) => 'https:' + image.fields.file.url
    ),
  }
}

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      if (isSlideshow(node)) {
        return null
      }
      if (isVideo(node)) {
        const { videoLink, width, height } = node.data.target.fields
        return `<iframe src="${videoLink}"
          frameborder="0"
          width="${width}"
          height="${height}"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          >
          </iframe>`
      }
    },
    [BLOCKS.PARAGRAPH]: (node, next) => {
      return `<p>${next(node.content).replace(/\\n/g, '<br/>')}</p>`
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      if (isImage(node)) {
        return `<img src="${node.data.target.fields.file.url}"/>`
      }
    },
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${node.data.uri}" target="_blank">${next(
        node.content
      )}</a>`
    },
  },
}

const toRichTextConfig = (richTextField: any): RichTextConfig => {
  const newComponents: NewComponent[] = []
  const nodes = richTextField.content
  nodes.forEach((node, index) => {
    if (isSlideshow(node)) {
      newComponents.push({
        config: toSlideshow(node),
        component: SlideshowComponent,
        index,
      })
    }
  })
  return {
    newComponents,
    richText: documentToHtmlString(richTextField, options),
  }
}
