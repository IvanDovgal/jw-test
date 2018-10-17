const module = {
  mutations: {
    increment(state) {
      state.count += 5
    }
  }

}

export default function root(state = {
  count: 1

}) {
  return {
    state,
    ...module
  }
}