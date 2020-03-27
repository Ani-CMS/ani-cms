import { Component, OnInit } from '@angular/core'

export interface ExternalText {
  title: string
  url: string
}

@Component({
  selector: 'app-external-text',
  templateUrl: './external-text.component.html',
  styleUrls: ['./external-text.component.css'],
})
export class ExternalTextComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
