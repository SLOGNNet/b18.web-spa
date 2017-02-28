export function fireViewEvent({target = null,
                              event = '',
                              canBubble = true,
                              cancelable = true,
                              view = null,
                              detail = 0,
                              screenX = 0,
                              screenY = 0,
                              clientX = 0,
                              clientY = 0} = {}) {
  if (target && typeof target === 'object' && target.dispatchEvent) {
    let moveEvent = document.createEvent('MouseEvents');
    moveEvent.initMouseEvent(event, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, false, false, false, false, 0, null);

    target.dispatchEvent(moveEvent);
  }
}
