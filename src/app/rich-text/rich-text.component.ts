import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

export interface NewComponent {
  config: any
  index: number
  component: any
}

export interface RichTextConfig {
  newComponents: NewComponent[]
  richText: string
}

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.css'],
})
export class RichTextComponent implements OnDestroy, OnChanges {
  @Input() config: RichTextConfig
  componentRefs: Array<ComponentRef<any>> = []

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef
  @ViewChild('container') elementRef: ElementRef<HTMLDivElement>

  innerHtmlRendered = false

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  onInnerHtmlRendered() {
    // Stopping infinite loop, because inserting new components, triggers new html render
    if (this.innerHtmlRendered) {
      return
    }
    this.innerHtmlRendered = true
    this.config.newComponents.forEach((newComponent) =>
      this.insertComponent(newComponent)
    )
  }

  insertComponent(newComponent: NewComponent) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
      newComponent.component
    )
    const componentRef = this.container.createComponent(factory)
    if (newComponent.config) {
      componentRef.instance.config = newComponent.config
      componentRef.changeDetectorRef.detectChanges()
    }
    const containerNativeElement = this.elementRef.nativeElement
    const newComponentNativeElement = this.elementRef.nativeElement.nextSibling
    this.renderer.insertBefore(
      containerNativeElement,
      newComponentNativeElement,
      containerNativeElement.children[newComponent.index]
    )
    this.componentRefs.push(componentRef)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.innerHtmlRendered = false
  }

  ngOnDestroy(): void {
    this.componentRefs.forEach((ref) => ref.destroy())
  }
}
