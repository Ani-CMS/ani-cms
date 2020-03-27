import { Component, OnInit } from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {
  externalText$ = this.contentfulService.externalTexts$.pipe(tap(console.log))

  constructor(private contentfulService: ContentfulService) {
  }


  ngOnInit(): void {
    console.log(1)
  }
}
