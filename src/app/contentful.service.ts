import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ExternalText } from './pages/texts/external-text/external-text.component'
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer'
import { About } from './pages/about/about.component'
import { Text } from './pages/texts/text/text.component'
import { Slideshow, SlideshowComponent } from './slideshow/slideshow.component'
import { ElementToReplace, HomeProjects } from './pages/home/home.component'
import { BLOCKS } from '@contentful/rich-text-types'

/*
 TODO
  RichTextElement
    - In other branch delete RichTextElement and try https://github.com/angular/angular/issues/21163
  Mobile
    - Check on real phone
  Subheader:
    - Jeder subheader gleiches Pattern, stylen mit nth-child -> Titles austauschen.
    - Multiple links on one row
    - One single Subheader component?
  Slideshows
   - Move other richText to same approach and use one function to transform a richText field to arraz of elements everywhere
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
          link: item.fields.link,
          image: item.fields.image?.fields.file.url,
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
          link: item.fields.link
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
          richTextTitle: documentToHtmlString(item.fields.text),
          richText: documentToHtmlString(item.fields.freeText)
        }
      })
    })
  )

  homeProjects$: Observable<HomeProjects> = from(
    this.client.getEntries({ content_type: 'homeProject' })
  ).pipe(
    map((response: any) => {
      const elementsToReplace: ElementToReplace[] = []
      const nodes = response.items[0].fields.freeText.content
      nodes.forEach((node, index) => {
        if (isSlideshow(node)) {
          elementsToReplace.push({
            config: toSlideshow(node),
            component: SlideshowComponent,
            index
          })
        }
        if (isImage(node)) {
          elementsToReplace.push() // TODO
        }
      })
      return {
        elementsToReplace,
        richText: documentToHtmlString(
          response.items[0].fields.freeText,
          options
        )
      }
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
    )
  }
}

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      if (isSlideshow(node)) {
        return `<div class="container-for-slideshow">CONTAINER FOR SLIDESHOW</div>`
      }
      return '<h2>????????????</h2>'
    }
  }
}
