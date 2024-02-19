<script setup>
import { ref } from 'vue'
import OrdersTabs from '@/components/OrdersTabs.vue'
import dayjs from 'dayjs'
import { VueDraggable } from 'vue-draggable-plus'

const showSaveMessage = ref(false)
const showErrMessage = ref(false)
const saveMessage = ref('')
const errMessage = ref('')


const items = ref([
  {
    name: 'Apples',
    id: 'apples',
    num: 6,
    maxTotal: 400,
    weight: 6,      // weight in ounces
  },
  {
    name: 'Beans',
    id: 'beans',
    num: 2,
    maxTotal: 400,
    weight: 6,
  },
  {
    name: 'Milk',
    id: 'milk',
    num: 1,
    maxTotal: 400,
    weight: 6,
  },
  {
    name: 'Peas',
    id: 'peas',
    num: 2,
    maxTotal: 400,
    weight: 6,
  },
  {
    name: 'Rice',
    id: 'rice',
    num: 1,
    maxTotal: 400,
    weight: 6,
  },
  {
    name: 'Diapers',
    id: 'diapers',
    num: 1,
    maxTotal: 20,
    weight: 6,
  },
  {
    name: 'Toothpaste',
    id: 'toothpaste',
    num: 1,
    maxTotal: 10,
    weight: 6,
  },
])

const formData = ref({
  beginDate: dayjs().toDate(),
  endDate: dayjs().toDate(),
  numMaxOrders: 200,
  items: [],
  estimatedTotalWeight: 0,
})

const orderForm = ref(formData)

const calculateWeight = () => {
  let total = 0
  for (let i=0; i< formData.value.items.length; i++) {
    total += formData.value.items[i].weight * formData.value.items[i].num
  }
  formData.value.estimatedTotalWeight = total
}

const onAddOrder = (ev) => {
  calculateWeight()
}

const onRemoveOrder = (ev) => {
  calculateWeight()
}

</script>

<template>
<div class="container">
  <OrdersTabs activeTab="Form" />

  <form>
    <div v-if="showSaveMessage" class="text-bg-success">{{saveMessage}}</div>
    <div v-if="showErrMessage" class="text-bg-danger">{{errMessage}}</div>

    <div class="row my-3">
      <div class="col">
        <label class="form-label" for="beginDate">Date and time Order form opens</label>
        <input id="beginDate" type="text" class="form-control" v-model="orderForm.beginDate" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="endDate">Date and time order form closes</label>
        <input id="endDate" type="text" class="form-control" v-model="orderForm.endDate" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label" for="numMaxOrders">Maximum Number of Orders allowed</label>
        <input id="numMaxOrders" type="text" class="form-control" v-model="orderForm.numMaxOrders" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <div class="py-3">Choose Items</div>
        <div class="d-flex ">
          <div class="d-flex col-6 flex-column">
            <div>On Form</div>
            <VueDraggable v-model="orderForm.items"
                          class="d-flex flex-column border w-75"
                          group="items"
                          style="min-height:200px;"
                          @add="onAddOrder"
                          @remove="onRemoveOrder"
                          >
              <div v-for="item in orderForm.items" :key="item.id" class="border border-1 p-2">
                {{ item.name }} - {{ item.num }}
              </div>
            </VueDraggable>
          </div>
          <div class="d-flex col-6 flex-column">
            <div>Inventory</div>
            <VueDraggable v-model="items" group="items" class="d-flex flex-column w-75 border"
                          style="min-height:200px;">
              <div v-for="item in items" :key="item.id" class="border border-1 p-2">
                {{ item.name }} - {{ item.num }}
              </div>
            </VueDraggable>
          </div>
        </div>
      </div>
    </div>


    <div class="row mb-3">
      <div class="col">
        <div class="py-3">Item Limits</div>
        <div class="table-responsive-md">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th>Num in Order</th>
                <th>Maximum total all orders</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in orderForm.items" :key="i.id">
                <td>{{i.name}}</td>
                <td><input type="text" v-model="i.num" /></td>
                <td><input type="text" v-model="i.maxTotal" /></td>
              </tr>
              <tr v-for="i in items" :key="i.id">
                <td>{{i.name}}</td>
                <td><input type="text" v-model="i.num" /></td>
                <td><input type="text" v-model="i.maxTotal" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        Estimated weight of order: {{ orderForm.estimatedTotalWeight / 16.0 }} pounds
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <button class="btn btn-primary" disabled>Save</button>
      </div>
    </div>



  </form>

</div>
</template>
