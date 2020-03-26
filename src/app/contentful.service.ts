import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string;
  link: string;
  description: string;
  from: string;
  until: string;
  location: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient({
    space: 'hy4v2om2p6ry',
    environment: 'master',
    accessToken: 'yG8c6btCdKehQU8Of7viYjYcwg9ASsZJsRZ6gEKMJw8'
  });

  events$: Observable<Event[]> = from(this.client.getEntries<Event[]>({content_type: 'event'})).pipe(
    map(response => {
      return response.items.map((item: any) => {
        return {
          ...item.fields,
          link: item.fields.link.content[0].content[1].data.uri,
          image: item?.fields?.image?.fields?.file?.url
        };
      });
    }),
  );
}
