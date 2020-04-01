import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ContentfulService } from '../../contentful.service'
import { Observable } from 'rxjs'
import { RichTextConfig } from '../../rich-text/rich-text.component'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  richTextConfig$: Observable<RichTextConfig> = this.contentful.about$

  constructor(private contentful: ContentfulService, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('ABOUT')
  }
}
