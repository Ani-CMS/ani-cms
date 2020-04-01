import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core'

@Directive({
  selector: '[appMutationObserver]',
})
// TODO Rename to firstInnerHTMLRendered
export class MutationObserverDirective implements OnDestroy {
  _observer: MutationObserver
  @Output() innerHtmlAdded = new EventEmitter()
  initialRenderComplete = false
  constructor(private el: ElementRef) {
    this._observer = new MutationObserver((mutations) => {
      // Needed to stop invite loop. After the first time html is rendered via the async pipe,
      // we replace a div with e.g. a Slideshow, which leads to another mutation, which call replaceComponent again
      if (this.initialRenderComplete) {
        return
      }
      this.initialRenderComplete = true
      this.innerHtmlAdded.emit()
    })
    this._observer.observe(this.el.nativeElement, {
      attributes: true,
      childList: true,
      characterData: true,
    })
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect()
    }
  }
}
