import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  host: {
    '(document:click)': 'handleDocumentClick($event.target)',
  },
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  clickOutside = output();
  private elementRef = inject(ElementRef<ClickOutsideDirective>);

  handleDocumentClick(target: HTMLElement): void {
    const clickOutside = !this.elementRef.nativeElement.contains(target);
    if (clickOutside) this.clickOutside.emit();
  }
}
