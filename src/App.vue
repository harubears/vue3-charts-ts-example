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
