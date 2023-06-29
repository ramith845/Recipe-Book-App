import {
  Directive,
  ElementRef,
  OnInit,
  HostBinding,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[app-dropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('attr.data-bs-toggle') toggle: string;
  @HostBinding('class.dropdown-toggle') dropDown: boolean;

  constructor(private ele: ElementRef, private rend: Renderer2) {}

  ngOnInit(): void {
    this.ele.nativeElement.ariaExpanded = 'false';
    // this.rend.setAttribute(this.ele.nativeElement, 'data-bs-toggle', 'dropdown')
    // this.rend.addClass(this.ele.nativeElement, 'dropdown-toggle')
    this.toggle = 'dropdown';
    this.dropDown = true;
    // console.log(this.ele);
  }

  // @HostListener('click')
}
