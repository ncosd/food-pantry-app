import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    isLoggedIn: (localStorage.getItem('authUserLoggedIn') === 'true'),
    data: JSON.parse(localStorage.getItem('authUser')),
    isAdmin: (localStorage.getItem('authUserIsAdmin') === 'true'),
    isVolunteer: (localStorage.getItem('authUserIsVolunteer') === 'true'),
    isPending: (localStorage.getItem('authUserIsPending') === 'true'),
    isGuest: (localStorage.getItem('authUserIsGuest') === 'true'),
  }),
  actions: {
    clearUser () {
      this.$reset()
    },
    save(user, isAdmin, isVolunteer, isPending, isGuest) {
      this.isLoggedIn = (user ? true : false)
      this.data = user
      this.isAdmin = isAdmin
      this.isVolunteer = isVolunteer
      this.isPending = isPending
      this.isGuest = isGuest
      localStorage.setItem('authUserLoggedIn', this.isLoggedIn)
      localStorage.setItem('authUser', JSON.stringify(user))
      localStorage.setItem('authUserIsAdmin', this.isAdmin)
      localStorage.setItem('authUserIsVolunteer', this.isVolunteer)
      localStorage.setItem('authUserIsPending', this.isPending)
      localStorage.setItem('authUserIsGuest', this.isGuest)
    }
  }
})
