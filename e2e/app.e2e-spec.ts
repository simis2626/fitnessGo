import { GoogleapiAppPage } from './app.po';

describe('googleapi-app App', () => {
  let page: GoogleapiAppPage;

  beforeEach(() => {
    page = new GoogleapiAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
