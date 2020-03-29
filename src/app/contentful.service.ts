import { Injectable } from '@angular/core'
import { createClient } from 'contentful'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ExternalText } from './pages/texts/external-text/external-text.component'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { About } from './pages/about/about.component'
import { Text } from './pages/texts/text/text.component'
import { HomeProject } from './pages/home/home.component'
import { SlideshowInput } from './slideshow/slideshow.component'
import { ELEMENT_TYPE, RichTextElement } from './rich-text-element/rich-text-element.component'

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

  homeProjects$: Observable<HomeProject> = from(
    this.client.getEntries({ content_type: 'homeProject' })
  ).pipe(
    map((response) => {
      const nodes = (response.items[0].fields as any).freeText.content

      const elements = nodes.map(
        (node): RichTextElement<any> => {
          const type: ELEMENT_TYPE = getType(node)
          switch (type) {
            case ELEMENT_TYPE.H1:
              return toH1(node)
            case ELEMENT_TYPE.P:
              return toP(node)
            case ELEMENT_TYPE.IMG:
              return toImg(node)
            case ELEMENT_TYPE.SLIDESHOW:
              return toSlideshow(node)
          }
        }
      )

      // TODO Don't filter out elements like empty <p> for now. Otherwise Ani cannot introduce distance herself?
      // Or do it and give margin, but then nothing changes if Ani adds two empty <p>

      const project: HomeProject = {
        richTextElements: elements
      }
      console.log(response)
      console.log(project)
      return project
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

const getType = (node): ELEMENT_TYPE => {
  if (node.nodeType === 'heading-1') {
    return ELEMENT_TYPE.H1
  }
  if (node.nodeType === 'paragraph') {
    return ELEMENT_TYPE.P
  }
  if (node.data.target?.fields.file?.contentType === 'image/jpeg') { // TODO Optional chaining missing?
    return ELEMENT_TYPE.IMG
  }
  if (node.data.target?.sys.contentType?.sys.id === 'slideshow') {
    return ELEMENT_TYPE.SLIDESHOW
  }
}

const toSlideshow = (node): RichTextElement<SlideshowInput> => {
  return {
    elementType: ELEMENT_TYPE.SLIDESHOW,
    data: {
      width: node.data.target.fields.width,
      height: node.data.target.fields.height,
      imageUrls: node.data.target.fields.slideshowImage.map(
        (image) => 'https:' + image.fields.file.url
      )
    }
  }
}

const toH1 = (node): RichTextElement<string> => ({
  elementType: ELEMENT_TYPE.H1,
  data: node
})

const toP = (node): RichTextElement<string> => ({
  elementType: ELEMENT_TYPE.P,
  data: node
})

const toImg = (node): RichTextElement<string> => ({
  elementType: ELEMENT_TYPE.IMG,
  data: 'https:' + node.data.target.fields.file.url
})
