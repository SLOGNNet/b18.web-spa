import { browser, by, element } from 'protractor';

describe('Layout Switch', () => {
  let parent;

  beforeEach(() => {
    const parent = element(by.css('.pane-switch-group'));
  });


  it('should no have panes', () => {
    browser.get('/loads?switchState=1');
    const visiblePanels = element.all(by.css('.active'));

    expect(visiblePanels.count()).toEqual(0);
  });

  // it('should have a 1 pane', () => {
  //   browser.get('/loads?switchState=9');
  //   const visiblePanels = panels.filter(e => e.getAttribute('class') === 'active');

  //   expect(visiblePanels.count()).toEqual(1);
  // });

  // it('should have a 2 panes', () => {
  //   browser.get('/loads?switchState=13');
  //   const visiblePanels = panels.filter(e => e.getAttribute('class') === 'active');

  //   expect(visiblePanels.count()).toEqual(2);
  // });

  // it('should have a 3 panes', () => {
  //   browser.get('/loads');
  //   const visiblePanels = panels.filter(e => e.getAttribute('class') === 'active');

  //   expect(visiblePanels.count()).toEqual(3);
  // });
});
