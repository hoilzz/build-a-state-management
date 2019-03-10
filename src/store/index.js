import PubSub from '../lib/pubsub';

class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    // 주어진 시간에 객체가 무엇을하고 있을지 결정하는데 사용
    this.status = 'resting';
    // events 엘리먼트로 붙일 새로운 PubSub 인스턴스를 생성.
    this.events = new PubSub();

    if('actions' in params) {
      this.actions = params.actions;
    }

    if('mutations' in params) {
      this.mutations = params.mutations;
    }

    // Store 객체가 모든 변화를 추적하는 방법
    this.state = new Proxy((params.state || {}), {
      set: function(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`)

        this.events.publish()
      }
    });
  }

  
  
}

export default Store;