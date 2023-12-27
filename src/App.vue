<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/line-chart">Line Chart</RouterLink>
      <RouterLink to="/bar-chart">Bar Chart</RouterLink>
      <RouterLink to="/stacked-bar-chart">Stacked Bar Chart</RouterLink>
      <RouterLink to="/area-chart">Area Chart</RouterLink>
      <RouterLink to="/stacked-area-chart">Stacked Area Chart</RouterLink>
      <RouterLink to="/pie-chart">Pie Chart</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 10px 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
}

nav a {
  color: #495057;
  text-decoration: none;
}

nav a:hover {
  color: #007bff;
}

nav a.router-link-exact-active {
  color: #007bff;
}

@media (max-width: 600px) {
  nav {
    flex-direction: column;
    padding: 10px 0;
  }

  nav a {
    margin-bottom: 10px;
  }
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
}
</style>
