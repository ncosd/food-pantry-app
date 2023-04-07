<template>
  <div class="col border text-secondary">
    {{date.getDate()}}
    <div><a href="/volunteer/admin/cal-new/?d={{date.toISOString()}}" class="btn btn-secondary btn-sm">+</a></div>

  </div>
</template>

<script>

export default {
  name: 'CalDay',
  data() {
    return {
      date: new Date()
    }
  }
}
</script>
