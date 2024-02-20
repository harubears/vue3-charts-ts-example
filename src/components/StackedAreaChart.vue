<script lang="ts">
import { defineComponent, ref, Ref, provide } from 'vue'
import {
    Chart,
    Grid,
    Tooltip,
    Area as AreaChartComponent
} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/src/types'
import { plByMonth } from '@/data'

export default defineComponent({
    name: 'AreaChart',
    components: {
        Chart, Grid, Tooltip,
        AreaChartComponent
    },
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
            <AreaChartComponent :dataKeys="['name', 'pl']" type="normal" :areaStyle="{ fill: 'url(#grad-pl)' }" />
            <AreaChartComponent :dataKeys="['name', 'avg']" type="normal" :areaStyle="{ fill: 'url(#grad-avg)' }" />
            <AreaChartComponent :dataKeys="['name', 'inc']" type="normal" :areaStyle="{ fill: 'url(#grad-inc)' }" />
            <defs>
                <linearGradient id="grad-pl" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="yellow" stop-opacity="1" />
                    <stop offset="50%" stop-color="orange" stop-opacity="1" />
                    <stop offset="100%" stop-color="red" stop-opacity="1" />
                </linearGradient>
                <linearGradient id="grad-avg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="green" stop-opacity="0.5" />
                    <stop offset="50%" stop-color="green" stop-opacity="1" />
                    <stop offset="100%" stop-color="green" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="grad-inc" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="blue" stop-opacity="1" />
                    <stop offset="50%" stop-color="red" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="red" stop-opacity="0" />
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