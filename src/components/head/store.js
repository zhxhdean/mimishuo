
import { observable,action } from 'mobx';
class TitleStore {
  @observable
  pageTitle = '秘密说';

  @action
  setPageTitleText = (val) => {
    this.pageTitle = val
  }

}

export const titleStore = new TitleStore()
