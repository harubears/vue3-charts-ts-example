<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

// Using aliases to avoid ESLint error:
// 'no-reserved-component-names'
import { 
    Chart, 
    Grid, 
    Tooltip, 
    Line as LineChartComponent
} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/src/types'

import { plByMonth } from '@/data'

export default defineComponent({
    name: 'LineChart',
    components: { Chart, Grid, Tooltip, LineChartComponent },
    setup() {
        const data = ref(plByMonth)
        const direction: Ref<Direction> = ref('horizontal')
        const margin = ref({
            left: 0,
            top: 20,
            right: 20,
            bottom: 0
        })

        const axis: Ref<ChartAxis> = ref({
            primary: {
                domain: ['dataMin', 'dataMax'],
                type: 'band',
                format: (val: string) => {
                    if (val === 'Feb') {
                        return '😜'
                    }
                    return val
                }
            },
            secondary: {
                domain: ['dataMin', 'dataMax + 100'],
                type: 'linear',
                ticks: 8
            }
        })

        return { data, direction, margin, axis }
    }
})
</script>

<template>
    <Chart :size="{ width: 500, height: 420 }" :data="data" :margin="margin" :direction="direction" :axis="axis">

        <template #layers>
            <!-- Generates a dashed line with 2-pixel dashes and 2-pixel gaps as a Grid -->
            <Grid strokeDasharray="2,2" />

            <LineChartComponent :dataKeys="['name', 'pl']"  :lineStyle="{ stroke: '#FF6347' }" />
            <LineChartComponent :dataKeys="['name', 'avg']" :lineStyle="{ stroke: '#3CB371' }" type="step" />
            <LineChartComponent :dataKeys="['name', 'inc']" :lineStyle="{ stroke: '#1E90FF' }" type="monotone" />

        </template>

        <template #widgets>
            <Tooltip borderColor="#48CAE4" :config="{
                name: { hide: true },
                pl: { color: '#FF6347' },
                avg: { label: 'averange', color: '#3CB371' },
                inc: { color: '#1E90FF' }
            }" />
        </template>

    </Chart>
</template>