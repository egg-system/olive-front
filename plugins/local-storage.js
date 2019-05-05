import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    // 認証トークンのみ、永続化
    paths: ['login.accessToken', 'login.client', 'login.uid']
  })(store)
}
