
import { observable,action } from 'mobx';
class SearchStore {
  @observable
  searchText = '';

  @action
  setSearchText = (event) => {
    this.searchText = event.target.value
    console.log(this.searchText)
  }

  @action
  handleShowSearchText = () => {
    console.log('button click: ',this.searchText)
  }
}

export const searchStore = new SearchStore()
