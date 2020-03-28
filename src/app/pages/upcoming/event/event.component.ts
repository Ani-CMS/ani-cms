import { Component, Input, ViewEncapsulation } from '@angular/core'

export interface Event {
  title: string
  link: string
  description: string
  from: string
  until: string
  richText: string
  image: string
  imageDescription: string
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventComponent {
  @Input() event: Event
}
