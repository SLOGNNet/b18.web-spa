import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[bd-autosize]',
  host: {
    '(input)': 'resizeToFitContent()',
    '[style.min-height]': '_minHeight',
    '[style.max-height]': '_maxHeight',
  },
})
export class MdTextareaAutosize implements OnInit {
  /** Minimum number of rows for this textarea. */
 @Input() minRows: number;

  /** Maximum number of rows for this textarea. */
  @Input() maxRows: number;

 /** Cached height of a textarea with a single row. */
 private _cachedLineHeight: number;

  constructor(private _elementRef: ElementRef) { }

  /** The minimum height of the textarea as determined by minRows. */
 get _minHeight() {
   return this.minRows ? `${this.minRows * this._cachedLineHeight}px` : null;
  }

 /** The maximum height of the textarea as determined by maxRows. */
  get _maxHeight() {
   return this.maxRows ? `${this.maxRows * this._cachedLineHeight}px` : null;
  }

  ngOnInit() {
   this._cacheTextareaLineHeight();
    this.resizeToFitContent();
  }

  /** Resize the textarea to fit its content. */
  resizeToFitContent() {
    let textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
    // Reset the textarea height to auto in order to shrink back to its default size.
    textarea.style.height = '24px';

   // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
   textarea.style.height = `${textarea.scrollHeight}px`;
  }

 private _cacheTextareaLineHeight(): void {
    let textarea = this._elementRef.nativeElement as HTMLTextAreaElement;

    // Use a clone element because we have to override some styles.
    let textareaClone = textarea.cloneNode(false) as HTMLTextAreaElement;
    textareaClone.rows = 1;

    // Use `position: absolute` so that this doesn't cause a browser layout and use
    // `visibility: hidden` so that nothing is rendered. Clear any other styles that
   // would affect the height.
   textareaClone.style.position = 'absolute';
    textareaClone.style.visibility = 'hidden';
     textareaClone.style.border = '';
    textareaClone.style.padding = '';
    textareaClone.style.height = '';
    textareaClone.style.minHeight = '';
    textareaClone.style.maxHeight = '';

    textarea.parentNode.appendChild(textareaClone);
     this._cachedLineHeight = textareaClone.offsetHeight;
     textarea.parentNode.removeChild(textareaClone);
  }

}
