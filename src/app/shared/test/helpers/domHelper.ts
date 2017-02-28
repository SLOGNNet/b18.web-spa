export function fireMouseEvent(target: HTMLElement,
                              action: string, {
                              canBubble = true,
                              cancelable = true,
                              view = null,
                              detail = 0,
                              screenX = 0,
                              screenY = 0,
                              clientX = 0,
                              clientY = 0 } = {}) {
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent(action, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, false, false, false, false, 0, null);

  target.dispatchEvent(mouseEvent);
};

export function fireEvent (target, action) {
  const event = document.createEvent('Event');
  event.initEvent(action, false, true);
  target.dispatchEvent(event);
};
