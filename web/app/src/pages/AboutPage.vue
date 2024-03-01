<template>
<div class="container">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink :to="{name:'HomePage'}">Home</RouterLink></li>
      <li class="breadcrumb-item active" aria-current="page">About</li>
    </ol>
  </nav>

  <h1>About Food Pantry App</h1>
  <p>Food Pantry App was created to help operating a food pantry that focuses on providing food to guests.</p>
  <p>If you would like to volunteer to work on FPA, report a bug, or make a suggestion, please
    go to <a href="https://github.com/ncosd/food-pantry-app">https://github.com/ncosd/food-pantry-app</a> and create an issue.
  </p>
</div>
</template>
