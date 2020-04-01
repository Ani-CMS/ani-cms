import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ExternalText } from './pages/texts/external-text/external-text.component'
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer'
import { Slideshow, SlideshowComponent } from './slideshow/slideshow.component'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { NewComponent, RichTextConfig } from './rich-text/rich-text.component'
import { UpcomingEvent } from './pages/upcoming/upcoming-event/upcoming-event.component'

/*
 TODO
  Mobile
    - Check on real phone
  Subheader:
    - Jeder subheader gleiches Pattern, stylen mit nth-child -> Titles austauschen.
    - Multiple links on one row
    - One single Subheader component?

   Other
   - upcmoing image margin
   -upcoming event NAK opens itself check if link exists before displaying a tag
   - upcoming margin between events needs to be increased
   - upcomingevent new field video -> also add in html
   - upcoming video field
   - externalTexts are supposed to link and scroll down below -> utilize ids.
      -> .linkToLongTextId https://stackoverflow.com/questions/44441089/angular4-scrolling-to-anchor

   <!--
1 subnav component with inputs, used on home, films, works

on home the inputs can be sorted alphabetically

id of content used in url
-->
 */

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: 'hy4v2om2p6ry',
    environment: 'master',
    accessToken: 'yG8c6btCdKehQU8Of7viYjYcwg9ASsZJsRZ6gEKMJw8',
  })
  // TODO Turn these into functions, otherwise all requests are made on app startup
  upcomingEvents$: Observable<UpcomingEvent[]> = from(
    this.client.getEntries({ content_type: 'event' })
  ).pipe(
    map((response) => {
      return response.items.map(
        (item: any): UpcomingEvent => {
          return {
            ...item.fields,
            image: item.fields.image ? item.fields.image.fields.file.url : null,
            richTextConfig: item.fields.freeText
              ? toRichTextConfig(item.fields.freeText)
              : null,
          }
        }
      )
    })
  )

  externalTexts$: Observable<ExternalText[]> = from(
    this.client.getEntries({ content_type: 'externalText' })
  ).pipe(
    map((response) => {
      return response.items.map((item: any) => {
        return {
          ...item.fields,
          link: item.fields.link,
        }
      })
    })
  )

  longTexts$: Observable<RichTextConfig[]> = from(
    this.client.getEntries({ content_type: 'text' })
  ).pipe(
    map((response: any) => {
      return response.items.map((item) =>
        toRichTextConfig(item.fields.freeText)
      )
    })
  )

  about$: Observable<RichTextConfig> = from(
    this.client.getEntries({ content_type: 'about' })
  ).pipe(
    map((response: any) => toRichTextConfig(response.items[0].fields.freeText))
  )
}

// TODO Video
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
        // Here you can overwrite how specific nodes should be rendered e.g.
        // return `<div class="slideshow">...</div>`
        // However we don't want them to be rendered via a string, because
        // Angular won't instantiate their class. Instead we save their index
        // an instantiate the component ourselves later.
        return null
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      if (isImage(node)) {
        return `<img src="${node.data.target.fields.file.url}"/>`
      }
    },
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${node.data.uri}" target="_blank">${next(
        node.content
      )}</>`
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
