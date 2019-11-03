import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    // 認証トークンのみ、永続化
    paths: ['user.accessToken', 'user.client', 'user.uid']
  })(store)
}
