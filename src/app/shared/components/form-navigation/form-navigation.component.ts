import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, ViewChild, OnChanges } from '@angular/core';
import { chain, sortBy, findLastIndex } from 'lodash';

@Component({
  selector: 'form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormNavigationComponent implements OnChanges {
  @Input() title: string = '';
  @Input() anchors: Array<Object>;

  private _anchorOffset = 20;
  private _anchorList = [];
  private _anchorsButton = [];
  private _activeAnchor: number = 0;
  private _scrollableContainer = null;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngOnChanges() {
    this._update();
  }

  ngAfterViewInit() {
    this._update();
  }

  ngAfterViewChecked() {
    if (!this._scrollableContainer) {
      const scrollableContainer = this._getScrollableParent(this._anchorList[0].parentNode);

      if (scrollableContainer) {
        this._scrollableContainer = scrollableContainer;
        this._scrollableContainer.addEventListener('scroll', this._onParentScrolled.bind(this));
      }
    }
  }

  private _update() {
    this._updateAnchorsList();
    this._updateAnchorsButton();
  }

  private _updateAnchorsButton() {
    this._anchorsButton = this.elementRef.nativeElement.getElementsByTagName('span');
  }

  private _updateAnchorsList() {
    this._anchorList = chain(this.anchors)
      .filter(anchor => anchor['id'].length > 0)
      .map(anchor => document.querySelector(`[id=${anchor['id']}]`))
      .sortBy(['offsetTop'])
      .value();
  }

  private _onParentScrolled(e) {
    let activeIndex = findLastIndex(this._anchorList,
      anchor => anchor.offsetTop - this._anchorOffset <= e.srcElement.scrollTop,
      this._anchorList.length - 1);

    if (this._activeAnchor !== activeIndex) {
      this._activeAnchor = activeIndex;
      this._scrollToActiveLinkButton();
      this.cdr.detectChanges();
    }
  }

  private _scrollToActiveLinkButton() {
    this._anchorsButton[this._activeAnchor].scrollIntoView();
  }

  private _getScrollableParent(node) {
    if (node === null || node.nodeName === 'BODY') {
      return null;
    }

    if (node.clientHeight > 0 && node.scrollHeight > node.clientHeight) {
      return node;
    } else {
      return this._getScrollableParent(node.parentNode);
    }
  }

  private _scrollTo(id, index) {
    if (id && id.length && id.trim().length) {
      let targetAnchor = this._anchorList[index];

      if (targetAnchor && targetAnchor.scrollIntoView) {
        this._activeAnchor = index;
        targetAnchor.scrollIntoView();
      }
    }
  }
}
