import { Component, Input, ViewEncapsulation } from '@angular/core'
import { RichTextConfig } from '../../../rich-text/rich-text.component'

export interface UpcomingEvent {
  title: string
  link?: string
  description?: string
  from?: string
  until?: string
  location?: string
  richTextConfig?: RichTextConfig
  image?: string
  imageDescription?: string
}

@Component({
  selector: 'app-upcoming-event',
  templateUrl: './upcoming-event.component.html',
  styleUrls: ['./upcoming-event.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpcomingEventComponent {
  @Input() config: UpcomingEvent
}