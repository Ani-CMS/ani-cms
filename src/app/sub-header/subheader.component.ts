import {
  Component,
  ElementRef,
  HostListener,
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
  showSubheader = true
  @HostListener('window:scroll') onScrollEvent() {
    this.showSubheader = document.documentElement.scrollTop === 0
  }

  constructor(
    private contentfulService: ContentfulService,
    private renderer: Renderer2,
    private subheaderRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.changeLeftMargins()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onInnerHtmlRendered(mutations) {
    const withoutComments = [...mutations].filter(
      (mutation) => mutation.addedNodes[0].nodeName !== '#comment'
    )
    const listElementsRendered = withoutComments.length > 0
    if (listElementsRendered) {
      this.liRenderedSubject.next()
    }
  }

  changeLeftMargins(): Subscription {
    return combineLatest([
      this.contentfulService.subheaderPositions$,
      this.liRenderedSubject.asObservable(),
    ])
      .pipe(
        tap(([positions]) => {
          const anchorElements = Array.from(
            this.subheaderRef.nativeElement.getElementsByTagName('a')
          )
          anchorElements.forEach((element, index) => {
            const leftMargin = positions[index]?.leftMargin
            if (leftMargin) {
              const vw = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
              )
              this.renderer.setStyle(
                element,
                'transform',
                vw > 640
                  ? `translateX(${leftMargin}em)`
                  : `translateX(${leftMargin / 0.9}vw)`
              )
              // this.renderer.setStyle(element, 'left', `${leftMargin}em`)
            }
          })
        })
      )
      .subscribe()
  }
}
