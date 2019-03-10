import Component from '../lib/Component';
import store from '../store/';

class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.js-items'),
    });
  }

  // stateChange 이벤트 발생할 때 마다 호출됨
  render() {
    if (store.state.items.length === 0) {
      this.element.innerHTML = ``;
    }

    this.element.innerHTML = `
    <ul class="app__items">
      ${store.state.items
        .map(item => {
          return `
          <li>${item}<button aria-label="Delete this item">×</button></li>
        `;
        })
        .join('')}
    </ul>
  `;

    this.element
      .querySelectorAll('button')
      .forEach((button, index) => {
        button.addEventListener('click', () => {
          store.dispatch('clearItem', { index });
        });
      });
  }
}

export default List;
