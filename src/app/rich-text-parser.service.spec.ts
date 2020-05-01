import { TestBed } from '@angular/core/testing'

import { RichTextParserService } from './rich-text-parser.service'

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
