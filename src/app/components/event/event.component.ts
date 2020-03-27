import { Component, Input } from '@angular/core';
import { Event } from '../../contentful.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent {
  @Input() event: Event;
}
