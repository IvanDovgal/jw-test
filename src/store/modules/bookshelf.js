const definition = {
  namespaced: true,
  mutations: {
    increment(state) {
      state.count += 1
    }
  }

}

export default function bookshelf(state = {
  count: 1,
  xss: '</script>'
}) {
  return {
    state,
    ...definition
  }
}