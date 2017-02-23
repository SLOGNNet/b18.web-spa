import { browser, by, element } from 'protractor';

describe('Multi Pane Layout', () => {
  let panels;

  beforeEach(() => {
    panels = element.all(by.tagName('bd-resize-container'));
  });


  it('should no have panes', () => {
    browser.get('/loads?switchState=1');
    const visiblePanels = panels.filter(e => e.isDisplayed());

    expect(visiblePanels.count()).toEqual(0);
  });

  it('should have a 1 pane', () => {
    browser.get('/loads?switchState=9');
    const visiblePanels = panels.filter(e => e.isDisplayed());

    expect(visiblePanels.count()).toEqual(1);
  });

  it('should have a 2 panes', () => {
    browser.get('/loads?switchState=13');
    const visiblePanels = panels.filter(e => e.isDisplayed());

    expect(visiblePanels.count()).toEqual(2);
  });

  it('should have a 3 panes', () => {
    browser.get('/loads');
    const visiblePanels = panels.filter(e => e.isDisplayed());

    expect(visiblePanels.count()).toEqual(3);
  });
});
