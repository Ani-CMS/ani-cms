import { Component, Input } from '@angular/core'

export const toSubheaderConfig = (
  subheaderLinks: SubheaderLink[],
  urlSubdirectory: string
): SubheaderConfig => {
  return {
    links: subheaderLinks.map(
      (link): SubheaderLink => {
        return {
          linkText: link.linkText,
          urlPath: `/${urlSubdirectory}/${link.urlPath}`,
        }
      }
    ),
  }
}

export interface SubheaderLink {
  urlPath: string
  linkText: string
}

export interface SubheaderConfig {
  links: SubheaderLink[]
}

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css'],
})
export class SubheaderComponent {
  @Input() config: SubheaderConfig
}
