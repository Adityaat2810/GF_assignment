import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    error: null
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async searchImages({ commit, state }) {
      // Reset previous state
      commit('SET_ERROR', null)
      commit('SET_LOADING', true)
      commit('SET_SEARCH_RESULTS', [])

      const api = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ""

      if (!api) {
        commit('SET_ERROR', 'API key is missing')
        commit('SET_LOADING', false)
        return
      }

      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: state.searchQuery,
            per_page: 12,
            client_id: api
          }
        })

        commit('SET_SEARCH_RESULTS', response.data.results)
        commit('SET_LOADING', false)
      } catch (err) {
        commit('SET_ERROR', 'Failed to fetch images')
        commit('SET_LOADING', false)
        console.error('Search error:', err)
      }
    },
    updateSearchQuery({ commit, dispatch }, query) {
      commit('SET_SEARCH_QUERY', query)
      if (query) {
        dispatch('searchImages')
      } else {
        commit('SET_SEARCH_RESULTS', [])
      }
    }
  },
  getters: {
    getSearchQuery: state => state.searchQuery,
    getSearchResults: state => state.searchResults,
    isLoading: state => state.isLoading,
    getError: state => state.error
  }
})