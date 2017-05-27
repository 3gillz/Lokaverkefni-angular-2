import { TrainingMasterAngularPage } from './app.po';

describe('training-master-angular App', () => {
  let page: TrainingMasterAngularPage;

  beforeEach(() => {
    page = new TrainingMasterAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
