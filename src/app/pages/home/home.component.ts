import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { tap } from 'rxjs/operators'

export interface ElementToReplace {
  config: any
  index: number
  component: any
}

export interface HomeProjects {
  elementsToReplace: ElementToReplace[]
  richText: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnDestroy {
  elementsToReplace: ElementToReplace[]
  homeProjects$ = this.contentfulService.homeProjects$.pipe(
    tap(
      (homeProjects) =>
        (this.elementsToReplace = homeProjects.elementsToReplace)
    )
  )
  componentRefs: Array<ComponentRef<any>> = []

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef
  @ViewChild('container') elementRef: ElementRef<HTMLDivElement>

  constructor(
    private contentfulService: ContentfulService,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  onInnerHtmlRendered() {
    this.elementsToReplace.forEach((element) => this.replaceComponent(element))
  }

  replaceComponent(elementToReplace: ElementToReplace) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
      elementToReplace.component
    )
    // TODO Delete dev.container-for
    const componentRef = this.container.createComponent(factory)
    if (elementToReplace.config) {
      componentRef.instance.config = elementToReplace.config
      componentRef.changeDetectorRef.detectChanges()
    }
    const nativeElement = this.elementRef.nativeElement
    const removedChild = nativeElement.children[elementToReplace.index]
    const slideshowNativeElement = this.elementRef.nativeElement.nextSibling
    this.renderer.insertBefore(
      nativeElement,
      slideshowNativeElement,
      removedChild
    )
    this.renderer.removeChild(nativeElement, removedChild)
    // TODO If componentRef does not work inject elementRef in constructor of slideshow with comment and acces it here via .instance
    this.componentRefs.push(componentRef)
  }

  // TODO Mazbe SlideshowComponent needs to be added to ngmodule
  ngOnDestroy(): void {
    this.componentRefs.forEach((ref) => ref.destroy())
  }
}
