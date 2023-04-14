import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    isLoggedIn: (localStorage.getItem('authUserLoggedIn') === 'true'),
    data: JSON.parse(localStorage.getItem('authUser')),
    isAdmin: (localStorage.getItem('authUserIsAdmin') === 'true'),
    isVolunteer: (localStorage.getItem('authUserIsVolunteer') === 'true'),
  }),
  actions: {
    clearUser () {
      this.$reset()
    },
    save(user, isAdmin, isVolunteer) {
      this.isLoggedIn = (user ? true : false)
      this.data = user
      this.isAdmin = isAdmin
      this.isVolunteer = isVolunteer
      localStorage.setItem('authUserLoggedIn', this.isLoggedIn)
      localStorage.setItem('authUser', JSON.stringify(user))
      localStorage.setItem('authUserIsAdmin', this.isAdmin)
      localStorage.setItem('authUserIsVolunteer', this.isVolunteer)
    }
  }
})
