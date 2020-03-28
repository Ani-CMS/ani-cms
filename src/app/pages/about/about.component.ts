import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ContentfulService } from '../../contentful.service'

export interface About {
  richText: string
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about$ = this.contentful.about$

  constructor(private contentful: ContentfulService, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('ABOUT')
  }
}
