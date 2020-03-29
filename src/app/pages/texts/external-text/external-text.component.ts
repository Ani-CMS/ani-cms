import { Component, Input, OnInit } from '@angular/core'

export interface ExternalText {
  title: string
  link: string
  description: string
}

@Component({
  selector: 'app-external-text',
  templateUrl: './external-text.component.html',
  styleUrls: ['./external-text.component.css']
})
export class ExternalTextComponent implements OnInit {
  @Input() config: ExternalText

  constructor() {
  }

  ngOnInit(): void {
  }
}
