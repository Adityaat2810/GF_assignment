import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    searchQuery: '',
    searchResults: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    hasMore: true
  },
  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
      // reset pagination when search query changes
      state.currentPage = 1
      state.hasMore = true
    },
    ADD_SEARCH_RESULTS(state, results) {
      // add new result after scroll
      state.searchResults = [...state.searchResults, ...results]
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    INCREMENT_PAGE(state) {
      state.currentPage += 1 
    },
    SET_HAS_MORE(state, hasMore) {
      state.hasMore = hasMore
    }
  },
  actions: {
    async searchImages({ commit, state }, { resetSearch = false } = {}) {
      // Ensure there's a search query
      if (!state.searchQuery) {
        commit('SET_SEARCH_RESULTS', [])
        return
      }

      // Stop if no more results and not resetting
      if (!resetSearch && !state.hasMore) return

      // Reset if it's a new search
      if (resetSearch) {
        commit('SET_SEARCH_RESULTS', [])
        commit('SET_HAS_MORE', true)
        commit('SET_ERROR', null)
        commit('SET_LOADING', true)
      }

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
            page: resetSearch ? 1 : state.currentPage,
            per_page: 12,
            client_id: api
          }
        })

        // Determine if there are more results
        const hasMore = response.data.results.length === 12

        if (resetSearch) {
          commit('SET_SEARCH_RESULTS', response.data.results)
        } else {
          commit('ADD_SEARCH_RESULTS', response.data.results)
        }

        commit('SET_HAS_MORE', hasMore)
        
        // Increment page only if not resetting
        if (!resetSearch) {
          commit('INCREMENT_PAGE')
        }

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
        dispatch('searchImages', { resetSearch: true })
      } else {
        commit('SET_SEARCH_RESULTS', [])
      }
    },
    loadMoreImages({ dispatch }) {
      dispatch('searchImages')
    }
  },
  getters: {
    getSearchQuery: state => state.searchQuery,
    getSearchResults: state => state.searchResults,
    isLoading: state => state.isLoading,
    getError: state => state.error,
    hasMoreResults: state => state.hasMore
  }
})

