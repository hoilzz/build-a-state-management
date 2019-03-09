class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * @desc callback이 있을 경우 해당 이벤트에 푸쉬해놓고 publish 때 호출.
   * @memberof PubSub
   */
  subscribe = (event, callback) => {
    if(event in this.events) {
      this.events[event] = [];
    }
    return this.events[event].push(callback);
  }

  /**
   * @desc 이벤트가 있는 경우, 저장된 콜백은 반복 호출하면서 데이터를 전달.
   * @memberof PubSub
   */
  publish = (event, data = {}) => {
    if(!event in this.events) {
      return [];
    }
    return this.events[event].map(callback => callback(data));
  }
}

export default PubSub;  