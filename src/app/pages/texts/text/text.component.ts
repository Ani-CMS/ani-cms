import { Component, Input, OnInit } from '@angular/core'

export interface Text {
  richTextTitle: string
  richText: string
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() config: Text

  constructor() {
  }

  ngOnInit(): void {
  }

}
