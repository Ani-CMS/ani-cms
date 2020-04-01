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
  @Output() innerHtmlRendered = new EventEmitter()

  constructor(private el: ElementRef) {
    this._observer = new MutationObserver((mutations) => {
      this.innerHtmlRendered.emit()
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
