import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    isLoggedIn: (localStorage.getItem('authUserLoggedIn') === 'true'),
    data: JSON.parse(localStorage.getItem('authUser')),
    isAdmin: (localStorage.getItem('authUserIsAdmin') === 'true')
  }),
  actions: {
    clearUser () {
      this.$reset()
    },
    save(user, isAdmin) {
      this.isLoggedIn = (user ? true : false)
      this.data = user
      this.isAdmin = isAdmin
      localStorage.setItem('authUserLoggedIn', this.isLoggedIn)
      localStorage.setItem('authUser', JSON.stringify(user))
      localStorage.setItem('authUserIsAdmin', this.isAdmin)
    }
  }
})
