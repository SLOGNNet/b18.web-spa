import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormNavigationComponent {
  @Input() title: string = '';
  @Input() anchors: Array<Object>;

  private _anchorList = [];
  private _anchorsButton = [];
  private _activeAnchor: number = 0;
  private _scrollableContainer = null;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this._updateAnchorsList();
    this._updateAnchorsButton();
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

  private _updateAnchorsButton() {
    this._anchorsButton = this.elementRef.nativeElement.getElementsByTagName('span');
  }

  private _updateAnchorsList() {
    this._anchorList = _(this.anchors)
      .filter(anchor => anchor['id'].length > 0)
      .map(anchor => document.querySelector(`[id=${anchor['id']}]`))
      .sortBy(this.anchors, ['offsetTop'])
      .value();
  }

  private _onParentScrolled(e) {
    let activeIndex = _.findLastIndex(this._anchorList,
      anchor => anchor.offsetTop + 50 <= e.srcElement.scrollTop,
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
