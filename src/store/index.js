/* Mutations, actions and getters */
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    ready:false
  },
  actions,
  mutations,
  getters
}
