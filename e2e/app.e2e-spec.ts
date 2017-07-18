import { DoktorkiPage } from './app.po';

describe('doktorki App', function() {
  let page: DoktorkiPage;

  beforeEach(() => {
    page = new DoktorkiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
