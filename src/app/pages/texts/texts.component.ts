import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { tap } from 'rxjs/operators'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {
  externalText$ = this.contentfulService.externalTexts$.pipe(tap(console.log))

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
