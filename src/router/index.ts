import { createRouter, createWebHistory } from 'vue-router'
import LineChart from '../components/LineChart.vue'
import BarChart from '../components/BarChart.vue'
import StackedBarChart from '../components/StackedBarChart.vue'
import AreaChart from '../components/AreaChart.vue'
import StackedAreaChart from '../components/StackedAreaChart.vue'
import PieChart from '../components/PieChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/line-chart',
      name: 'LineChart',
      component: LineChart
    },
    {
      path: '/bar-chart',
      name: 'BarChart',
      component: BarChart
    },
    {
      path: '/stacked-bar-chart',
      name: 'StackedBarChart',
      component: StackedBarChart
    },
    {
      path: '/area-chart',
      name: 'AreaChart',
      component: AreaChart
    },
    {
      path: '/stacked-area-chart',
      name: 'StackedAreaChart',
      component: StackedAreaChart
    },
    {
      path: '/pie-chart',
      name: 'PieChart',
      component: PieChart
    },
    {
      path: '/',
      redirect: '/line-chart'
    }
  ]
})

export default router