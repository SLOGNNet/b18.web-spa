export class Positioning {

  position(element: HTMLElement, round = true): ClientRect {
    let elPosition;
    let parentOffset: ClientRect = {width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0};

    if (this.getStyle(element, 'position') === 'fixed') {
      const rect = element.getBoundingClientRect();
      elPosition = {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== document.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop;
      parentOffset.left += offsetParentEl.clientLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  offset(element: HTMLElement, round = true): ClientRect {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: window.pageYOffset - document.documentElement.clientTop,
      left: window.pageXOffset - document.documentElement.clientLeft
    };

    let elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean):
      ClientRect {
    const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
    const shiftWidth: any = {
      left: hostElPosition.left,
      center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width
    };
    const shiftHeight: any = {
      top: hostElPosition.top,
      center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height
    };
    const targetElBCR = targetElement.getBoundingClientRect();
    const placementPrimary = placement.split('-')[0] || 'top';
    const placementSecondary = placement.split('-')[1] || 'center';

    let targetElPosition: ClientRect = {
      height: targetElBCR.height || targetElement.offsetHeight,
      width: targetElBCR.width || targetElement.offsetWidth,
      top: 0,
      bottom: targetElBCR.height || targetElement.offsetHeight,
      left: 0,
      right: targetElBCR.width || targetElement.offsetWidth
    };

    switch (placementPrimary) {
      case 'top':
        targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
        targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
        targetElPosition.left = shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'bottom':
        targetElPosition.top = shiftHeight[placementPrimary];
        targetElPosition.bottom += shiftHeight[placementPrimary];
        targetElPosition.left = shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'left':
        targetElPosition.top = shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
        targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
        break;
      case 'right':
        targetElPosition.top = shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left = shiftWidth[placementPrimary];
        targetElPosition.right += shiftWidth[placementPrimary];
        break;
      default:
        break;
    }

    targetElPosition.top = Math.round(targetElPosition.top);
    targetElPosition.bottom = Math.round(targetElPosition.bottom);
    targetElPosition.left = Math.round(targetElPosition.left);
    targetElPosition.right = Math.round(targetElPosition.right);

    return targetElPosition;
  }

  offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl = <HTMLElement>element.offsetParent || document.documentElement;

    while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
      offsetParentEl = <HTMLElement>offsetParentEl.offsetParent;
    }

    return offsetParentEl || document.documentElement;
  }

  private getStyle(element: HTMLElement, prop: string): string { return window.getComputedStyle(element)[prop]; }

  private isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

}

const positionService = new Positioning();
export function positionElements(
    hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): void {
  const pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);

  targetElement.style.top = `${pos.top}px`;
  targetElement.style.left = `${pos.left}px`;
}

export function getElementPosition(
    hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): ClientRect {
  return positionService.positionElements(hostElement, targetElement, placement, appendToBody);
}

export function position(element: HTMLElement, round = true): ClientRect {
    const pos = positionService.position(element, round);
    return pos;
}

export function offsetParent(element: HTMLElement): HTMLElement {
    const offsetEl = positionService.offsetParent(element);
    return offsetEl;
}

export function offset(element: HTMLElement): ClientRect {
    const elOffset = positionService.offset(element);
    return elOffset;
}


export function getEffectivePlacement(placement: string, hostElement: HTMLElement, targetElement: HTMLElement): string {
    const placementParts = placement.split(' ');
    if (placementParts[0] !== 'auto') {
        return placement;
    }

    const hostElBoundingRect = hostElement.getBoundingClientRect();

    const desiredPlacement = placementParts[1] || 'bottom';

    if (desiredPlacement === 'top' && hostElBoundingRect.top - targetElement.offsetHeight < 0) {
        return 'bottom';
    }
    if (desiredPlacement === 'bottom' && hostElBoundingRect.bottom + targetElement.offsetHeight > window.innerHeight) {
        return 'top';
    }
    if (desiredPlacement === 'left' && hostElBoundingRect.left - targetElement.offsetWidth < 0) {
        return 'right';
    }
    if (desiredPlacement === 'right' && hostElBoundingRect.right + targetElement.offsetWidth > window.innerWidth) {
        return 'left';
    }

    return desiredPlacement;
}

export function getScrollbarWidth() {
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}
