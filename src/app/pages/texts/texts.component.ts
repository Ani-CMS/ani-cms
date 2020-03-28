import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {
  externalText$ = this.contentfulService.externalTexts$
  texts$ = this.contentfulService.text$

  constructor(
    private contentfulService: ContentfulService,
    private title: Title
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle('ABOUT')
  }

  onUp() {
    window.scrollTo(0, 0)
  }
}
