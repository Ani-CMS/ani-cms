import { Component, Input, OnInit } from '@angular/core'

export enum ELEMENT_TYPE {
  SLIDESHOW,
  P, // TODO Bold, etc.
  H1,
}

export interface RichTextElement<Data> {
  elementType: ELEMENT_TYPE
  data?: Data
}

@Component({
  selector: 'app-rich-text-element',
  templateUrl: './rich-text-element.component.html',
  styleUrls: ['./rich-text-element.component.css']
})
export class RichTextElementComponent implements OnInit {
  @Input() element: RichTextElement<any>

  ELEMENT_TYPE = ELEMENT_TYPE

  ngOnInit(): void {
  }
}
