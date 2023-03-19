import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    isLoggedIn: (localStorage.getItem('authUserLoggedIn') === 'true'),
    data: JSON.parse(localStorage.getItem('authUser'))
  }),
  actions: {
    clearUser () {
      this.$reset()
    },
    save(user) {
      this.isLoggedIn = (user ? true : false)
      this.data = user
      localStorage.setItem('authUserLoggedIn', this.isLoggedIn)
      localStorage.setItem('authUser', JSON.stringify(user))
    }
  }
})
