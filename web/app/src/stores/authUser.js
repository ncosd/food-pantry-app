import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    loggedIn: false,
    data: null
  }),
  actions: {

    // easily reset state using `$reset`
    clearUser () {
      this.$reset()
    }
  }
});
