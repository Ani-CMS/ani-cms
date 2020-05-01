import { TestBed } from '@angular/core/testing'

import { getInnerHTML, RichTextParserService } from './rich-text-parser.service'
import { freeTextSlideshow } from '../mocks.ts/free-text-slideshow'

describe('RichTextParserService', () => {
  let service: RichTextParserService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RichTextParserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

describe('getInnerHTML', () => {
  // Because we instantiate a replacement component in its index instead
  it('should remove slideshows from the html string', () => {
    const freeText = freeTextSlideshow
    expect(getInnerHTML(freeText)).toBe('')
  })
})
