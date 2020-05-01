import { Injectable } from '@angular/core'
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { NewComponent, RichTextConfig } from './rich-text/rich-text.component'
import { Slideshow, SlideshowComponent } from './slideshow/slideshow.component'

@Injectable({
  providedIn: 'root',
})
export class RichTextParserService {
  constructor() {}
  parse(richTextField: Document): RichTextConfig {
    return {
      newComponents: getNewComponents(richTextField),
      richText: getInnerHTML(richTextField),
    }
  }
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

export const getNewComponents = (richTextField) => {
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
  return newComponents
}

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      if (isSlideshow(node)) {
        console.log(888)
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

export const getInnerHTML = (richTextField: Document) => {
  return documentToHtmlString(richTextField, options)
}
