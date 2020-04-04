import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core'
import { ContentfulService } from '../contentful.service'
import { tap } from 'rxjs/operators'
import { combineLatest, ReplaySubject, Subscription } from 'rxjs'

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

export interface SubheaderPosition {
  index: number
  leftMargin: number
}

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css'],
})
export class SubheaderComponent implements OnInit, OnDestroy {
  subscription: Subscription
  liRenderedSubject = new ReplaySubject()

  @Input() config: SubheaderConfig

  constructor(
    private contentfulService: ContentfulService,
    private renderer: Renderer2,
    private subheaderRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.contentfulService.subheaderPositions$,
      this.liRenderedSubject.asObservable(),
    ])
      .pipe(
        tap(([positions]) => {
          const listElements = Array.from(
            this.subheaderRef.nativeElement.getElementsByTagName('li')
          )
          listElements.forEach((element, index) => {
            const leftMargin = positions[index]?.leftMargin
            if (leftMargin) {
              this.renderer.setStyle(element, 'left', `${leftMargin}px`)
            }
          })
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onInnerHtmlRendered(mutations) {
    const listElementsRendered =
      mutations[0].addedNodes[0].nodeName !== '#comment' // ngFor renders a comment
    if (listElementsRendered) {
      this.liRenderedSubject.next()
    }
  }
}
