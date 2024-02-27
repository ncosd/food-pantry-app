<script setup>
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions"
import SortableTableHeader from "./SortableTableHeader.vue"

const emit = defineEmits(["refreshList", "sort-list"])

const props = defineProps({
  volunteers: Array,
  sortBy: String,
  sortAsc: Boolean,
})

const formatDate = t => {
  let d = t.toDate()
  let result = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
  return result
}

const niy = () => {
  alert("Not implemented yet.")
}

const functions = getFunctions()
const setVolunteer = httpsCallable(functions, "setVolunteerv2")

const updateApprove = async id => {
  try {
    const resp = await setVolunteer({ id: id })
    console.log(JSON.stringify(resp))

    const db = getFirestore()
    const vProfileStateRef = await doc(db, "volunteerprofilestate", id)
    await updateDoc(vProfileStateRef, { status: "active" })
    console.log("approved" + id)
    emit("refreshList")
  } catch (err) {
    console.log("error " + err)
  }
}

const inactivateVolunteer = httpsCallable(functions, "inactivateVolunteerv2")

const sort = param => {
  emit("sort-list", param)
}

const updateInactive = async id => {
  try {
    const resp = await inactivateVolunteer({ id: id })
    console.log("inactivateVolunteer=" + JSON.stringify(resp))

    const db = getFirestore()
    const vProfileStateRef = await doc(db, "volunteerprofilestate", id)
    await updateDoc(vProfileStateRef, { status: "inactive" })
    console.log("inactive " + id)
    emit("refreshList")
  } catch (err) {
    console.log("error " + err)
  }
}

const download = (event) => {
  const anchor = document.createElement('a')
  let data = '"First-name","Last-Name","email","isDriver","isApprovedDriver"\n'
  for (let i=0; i<props.volunteers.length; i++) {
    let v = props.volunteers[i]
    let row = [v.firstname, v.lastname, v.email, v.isDriver, v.isApprovedDriver].join(',') + '\n'
    data = data + row
  }

  anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data)
  anchor.target = '_blank'
  anchor.download = 'volunteers.csv'
  anchor.click()

}
</script>

<template>
  <div class="container">
    <div class="table-responsive-md">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <SortableTableHeader heading="First Name" sortKey="firstname" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sort" />
            <SortableTableHeader heading="Last Name" sortKey="lastname" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sort" />
            <SortableTableHeader heading="Email" sortKey="email" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sort" />
            <th scope="col">Driver</th>
            <SortableTableHeader heading="Status" sortKey="status" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sort" />
            <th scope="col">Action</th>
            <SortableTableHeader heading="Updated" sortKey="updated" :sortBy="sortBy" :sortAsc="sortAsc" @sort-list="sort" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in volunteers" :key="v.email">
            <td>{{ v.firstname }}</td>
            <td>{{ v.lastname }}</td>
            <td>
              <router-link :to="{ name: 'Profile', params: { uid: v.userid } }">{{ v.email }}</router-link>
            </td>
            <td>
              <i v-if="v.isDriver" class="bi bi-car-front" title="Driver"></i>
              <i v-if="v.isApprovedDriver" class="ms-2 bi bi-check-circle text-success" title="Approved Driver"></i>
            </td>
            <td>{{ v.status }}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1" @click="updateApprove(v.userid)">Approve</button>
              <button class="btn btn-sm btn-secondary" @click="updateInactive(v.userid)">Deactivate</button>
            </td>
            <td>{{ formatDate(v.updated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-3">
      <button class="btn btn-secondary" @click="download"><i class="bi bi-filetype-csv"></i> Download CSV</button>
    </div>
  </div>
</template>
