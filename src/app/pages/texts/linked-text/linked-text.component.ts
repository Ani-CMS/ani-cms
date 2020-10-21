import { Component, Input, OnInit } from '@angular/core'

export interface LinkedText {
  index: number
  title: string
  link?: string
  scrollToLongTextId?: string
  description: string
}

@Component({
  selector: 'app-linked-text',
  templateUrl: './linked-text.component.html',
  styleUrls: ['./linked-text.component.css'],
})
export class LinkedTextComponent implements OnInit {
  @Input() config: LinkedText

  constructor() {}

  ngOnInit(): void {}

  onLingToLongTextIdClick() {
    if (!this.config.scrollToLongTextId) {
      return
    }
    document
      .querySelector(`[data-id="${this.config.scrollToLongTextId}"]`)
      .scrollIntoView({ behavior: 'smooth' })
  }
}
