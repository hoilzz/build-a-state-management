import PubSub from '../lib/pubsub';

class Store {
  constructor(params) {
    let self = this;
    this.actions = {};
    this.mutations = {};
    this.state = {};
    // 주어진 시간에 객체가 무엇을하고 있을지 결정하는데 사용
    this.status = 'resting';
    // events 엘리먼트로 붙일 새로운 PubSub jhhhyhhy 생성.
    this.events = new PubSub();
    if ('actions' in params) {
      this.actions = params.actions;
    }
    if ('mutations' in params) {
      this.mutations = params.mutations;
    }

    // Store 객체가 모든 변화를 추적하는 방법
    // set 연산을 trapping
    // state 의 set을 캐치하여 변경에 대해 컨트롤(거부)할 수 있는 기회 제공.
    this.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        console.log('\n\nthis: \n\n', self);
        self.events.publish('stateChange', self.state);

        // mutation 상태가 아니면 상태가 수동 업데이트 되었음을 의미.
        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting';

        return true;
      },
    });
  }

  /**
   *@desc action을 찾곶 ㅗㄴ재한다면, 상태를 설정하고 모든 로그를 유지하는 로깅그룹 생성, 액션 호출
   *
   * @param {*} actionKey
   * @param {*} payload
   * @returns
   * @memberof Store
   */
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action ${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    this.status = 'action';

    this.actions[actionKey](this, payload);

    console.groupEnd();

    return true;
  }

  /**
   * @desc mutation이 발견되면, 그것을 실행하고 리턴값으로 새로운 state를 얻는다.
   *
   * @param {*} mutationKey
   * @param {*} payload
   * @returns
   * @memberof Store
   */
  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation ${mutationKey} doesn't exist`);
      return false;
    }

    this.status = 'mutation';

    const nextState = this.mutations[mutationKey](
      this.state,
      payload,
    );

    this.state = Object.assign(this.state, nextState);

    return true;
  }
}

export default Store;
