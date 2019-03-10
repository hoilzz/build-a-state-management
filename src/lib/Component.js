import Store from '../store/store';

/**
 * @desc store와 통신하기 위해, store에 저장된 것을 기반으로
 * 독립적으로 업데이트하는 3가지 주요 영역을 가질거다.
 * 1. submit된 아이템 리스트
 * 2. 그 아이템들의 비주얼 카운트
 * 3. that's visually hidden with more accurate information for screen readers.
 * - 이 세가지는 모두 다른 일을 하지만, local state를 통제하기 위해 공유되는 무언가로부터 베네핏을 얻음.
 * @class Component
 */
class Component {
  constructor(props = {}) {
    this.render = this.render || function() {};

    // state 프로퍼티가 store 클래스의 인스턴스 이므로, store의 메서드와 속성 사용 가능.
    // 전역 stateChange 이벤트를 구독하므로 컴포넌트 객체가 react 할 수 있다.
    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () =>
        this.render(),
      );
    }

    if ('element' in props) {
      this.element = props.element;
    }
  }
}

export default Component;
