const mutations = {
  setProducts(state, products) {
    state.products = products.data
    state.currentPage = products.current_page
    state.pages = products.last_page
  },
  setPage(state, newPage) {
    state.currentPage = newPage
  },
}
export default mutations
