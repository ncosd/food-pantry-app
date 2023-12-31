<script setup>
import { onBeforeMount } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { useRouter } from 'vue-router'
import ProfileTabs from '@/components/ProfileTabs.vue'
import { getAuth, sendEmailVerification } from 'firebase/auth'

const props = defineProps({
	uid: String
})

const user = useAuthUserStore()
const router = useRouter()
const auth = getAuth()

const sendVerificationEmail = () => {
	sendEmailVerification(auth.currentUser).then(() => {
		window.alert(`Verification email sent to ${user.data.email}`)
	})
}

onBeforeMount(async () => {
	if (props.uid === '' || props.uid === undefined) {
		props.uid = user.data.uid
	}
})
</script>

<template>
	<div class="container">
		<ProfileTabs activeTab="Account" :uid="props.uid"></ProfileTabs>

		<div class="mt-3" v-if="user.data">
			{{ user.data.email }}
			<template v-if="user.data.emailVerified"><i class="bi bi-patch-check" /> </template>
			<template v-else>
				<button class="btn btn-sm btn-outline-secondary ms-2" type="button" :onClick="sendVerificationEmail">Verify</button>
			</template>
		</div>
	</div>
</template>
