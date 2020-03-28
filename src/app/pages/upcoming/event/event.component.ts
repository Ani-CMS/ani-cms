import { Component, Input } from '@angular/core'

export interface Event {
  title: string
  link: string
  description: string
  from: string
  until: string
  richText: string
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent {
  @Input() event: Event
}
