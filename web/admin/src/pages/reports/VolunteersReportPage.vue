<script setup>
import ReportsTab from '@/components/reports/ReportsTab.vue'

</script>

<template>
  <div class="container">
    <ReportsTab activeTab="Volunteers" />

    <h1>Reporting - Monthly Volunteer Hours</h1>
    <h2>October 2023</h2>
    <table class="table table-striped">
      <thead>
      <tr>
        <td>Week</td>
        <td>Potential Hours</td>
        <td>Filled Hours</td>
        <td>Number Volunteers</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Oct 1-7</td>
        <td>7</td>
        <td>4</td>
        <td>1</td>
      </tr>
      <tr>
        <td>Oct 8-14</td>
        <td>10</td>
        <td>4</td>
        <td>1</td>
      </tr>

      <tr>
        <td>Oct 15-21</td>
        <td>7</td>
        <td>4</td>
        <td>1</td>
      </tr>

      <tr>
        <td>Oct 22-28</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>

      <tr>
        <td>Oct 29 - Nov 4</td>
        <td>10</td>
        <td>4</td>
        <td>1</td>
      </tr>

      <tr>
        <td>Total</td>
        <td>40</td>
        <td>22</td>
        <td>1</td>
      </tr>
      </tbody>

    </table>


  </div>
</template>
