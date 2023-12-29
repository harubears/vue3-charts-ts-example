<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

// Using aliases to avoid ESLint error:
// 'no-reserved-component-names'
import {
    Chart,
    Grid,
    Marker as ChartMarker,
    Line as LineChartComponent,
    Area as AreaChartComponent
} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/src/types'

import { plByMonth } from '@/data'

export default defineComponent({
    name: 'LineChart',
    components: { Chart, Grid, ChartMarker, LineChartComponent, AreaChartComponent },
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
                type: 'band'
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
            <Grid strokeDasharray="2,2" />
            <AreaChartComponent :dataKeys="['name', 'pl']" type="monotone" :areaStyle="{ fill: 'url(#grad)' }" />
            <LineChartComponent :dataKeys="['name', 'pl']" type="monotone" :lineStyle="{
                stroke: '#9f7aea'
            }" />
            <ChartMarker :value="1000" label="Mean." color="green" :strokeWidth="2" strokeDasharray="6 6" />
            <defs>
                <linearGradient id="grad" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                    <stop offset="100%" stop-color="white" stop-opacity="0.4" />
                </linearGradient>
            </defs>
        </template>

        <template #widgets>
            <Tooltip borderColor="#48CAE4" :config="{
                pl: { color: '#9f7aea' },
                avg: { hide: true },
                inc: { hide: true }
            }" />
        </template>

    </Chart>
</template>