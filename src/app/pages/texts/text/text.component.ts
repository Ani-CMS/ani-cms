import { Component, Input, OnInit } from '@angular/core'

export interface Text {
  title: string
  richText: string
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() text: Text

  constructor() {
  }

  ngOnInit(): void {
  }

}
