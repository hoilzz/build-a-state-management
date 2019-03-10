export default {
  // 각 액션은 payload를 mutation에 전달하고, 
  // 데이터를 store로 커밋
  addItem(context, payload) {
    context.commit('addItem', payload)
  },
  clearItem(context, payload) {
    context.commit('clearItem', payload);
  }
}