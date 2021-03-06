import { Component, Input, ViewEncapsulation, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { chain, findLastIndex } from 'lodash';

@Component({
  selector: 'form-navigation',
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss']
})
export class FormNavigationComponent implements OnChanges {
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() anchors: Array<Object>;

  private _anchorOffset = 20;
  private _anchorList = [];
  private _anchorsButton = [];
  private _activeAnchor: number = 0;
  private _scrollableContainer = null;
  private _suspendScrollEvent = false;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes) {
    if (changes.anchors) {
      this._scrollableContainer = null;
      this._init();
    }
  }

  ngAfterViewChecked() {
    setTimeout(() => this._init(), 0);
  }

  private _init() {
    if (!this._scrollableContainer) {
      this._update();

      let scrollableContainer;

      if (this._anchorList[0]) {
        scrollableContainer = this._getScrollableParent(this._anchorList[0].parentNode);
      }

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
    if (this._suspendScrollEvent) {
      this._suspendScrollEvent = false;
      return;
    }

    let activeIndex = findLastIndex(this._anchorList,
      anchor => anchor.offsetTop - this._anchorOffset <= e.srcElement.scrollTop,
      this._anchorList.length - 1);

    if (this._activeAnchor !== activeIndex) {
      this._activeAnchor = activeIndex;
      this._scrollToActiveLinkButton();
      this.cdr.markForCheck();
    }
  }

  private _scrollToActiveLinkButton() {
    const activeAnchorButton = this._anchorsButton[this._activeAnchor];
    if (activeAnchorButton) {
      activeAnchorButton.scrollIntoView();
    }
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
    if (this.disabled) return;
    if (id && id.length && id.trim().length) {
      let targetAnchor = this._anchorList[index];

      if (targetAnchor && targetAnchor.scrollIntoView) {
        this._activeAnchor = index;
        this._suspendScrollEvent = true;
        targetAnchor.scrollIntoView();
      }
    }
  }
}
