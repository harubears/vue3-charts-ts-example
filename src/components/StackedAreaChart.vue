<script lang="ts">
import { defineComponent, ref, Ref, provide } from 'vue'

// Using aliases to avoid ESLint error:
// 'no-reserved-component-names'
import {
    Chart,
    Grid,
    Tooltip,
    Marker as ChartMarker,
    Area as AreaChartComponent
} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/src/types'

import { plByMonth } from '@/data'

export default defineComponent({
    name: 'LineChart',
    components: { Chart, Grid, Tooltip, ChartMarker, AreaChartComponent },
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
                domain: ['dataMin', 'dataMax + 100'],
                type: 'band'    // show the every value of the data
            },
            secondary: {
                domain: ['dataMin', 'dataMax + 100'],
                type: 'linear',
                ticks: 8
            }
        })

        provide('layerProps', {
            stacked: true, // enable stacking
        });

        return { data, direction, margin, axis }
    }
})
</script>

<template>
    <Chart :size="{ width: 500, height: 420 }" :data="data" :margin="margin" :direction="direction" :axis="axis">

        <template #layers>
            <Grid strokeDasharray="2,2" />

            <AreaChartComponent :dataKeys="['name', 'pl']" type="monotone" :areaStyle="{ fill: 'url(#grad-pl)' }" />
            <AreaChartComponent :dataKeys="['name', 'avg']" type="monotone" :areaStyle="{ fill: 'url(#grad-avg)' }" />
            <AreaChartComponent :dataKeys="['name', 'inc']" type="monotone" :areaStyle="{ fill: 'url(#grad-inc)' }" />

            <ChartMarker :value="1200" label="Target" color="black" :strokeWidth="2" strokeDasharray="6 6" />

            <defs>
                <linearGradient id="grad-pl" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#FF6347" stop-opacity="1" />
                    <stop offset="100%" stop-color="#FF6347" stop-opacity="0.8" />
                </linearGradient>
                <linearGradient id="grad-avg" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#3CB371" stop-opacity="1" />
                    <stop offset="100%" stop-color="#3CB371" stop-opacity="0.8" />
                </linearGradient>
                <linearGradient id="grad-inc" gradientTransform="rotate(90)">
                    <stop offset="0%" stop-color="#1E90FF" stop-opacity="1" />
                    <stop offset="100%" stop-color="#1E90FF" stop-opacity="0.8" />
                </linearGradient>
            </defs>
        </template>

        <template #widgets>
            <Tooltip borderColor="#48CAE4" :config="{
                pl: { color: '#FF6347' },
                avg: { color: '#3CB371' },
                inc: { color: '#1E90FF' }
            }" />
        </template>

    </Chart>
</template>