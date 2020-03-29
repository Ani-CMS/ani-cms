import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core'
import { ContentfulService } from '../../contentful.service'
import { SlideshowInput } from '../../slideshow/slideshow.component'

export interface HomeProjects {
  slideshows: SlideshowInput[]
  images: any[]
  richText: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  homeProjects$ = this.contentfulService.homeProjects$
  componentRefs: Array<ComponentRef<any>>

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef
  @ViewChild('container') containerRef: ElementRef

  constructor(
    private contentfulService: ContentfulService,
    private resolver: ComponentFactoryResolver
  ) {
  }

  onInnerHtmlRendered() {
    console.log(1)
    debugger
    // search template for all children
    // loop over them including the index
    // check their class and decide on component
    // delete the component with container.remove(index) -> create component replace div.slideshow
  }

  createComponent(component) {
    this.container.clear()
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
      component
    )
    const componentRef = this.container.createComponent(factory, 0)
    componentRef.instance.slideshowInput = null
    this.componentRefs.push(componentRef)
  }

  // TODO Mazbe SlideshowComponent needs to be added to ngmodule
  ngOnDestroy(): void {
    this.componentRefs.forEach((ref) => ref.destroy())
  }

  ngAfterViewInit(): void {
    debugger
  }

  ngOnInit(): void {
    debugger
  }
}
