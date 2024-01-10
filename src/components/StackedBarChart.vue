<script lang="ts">
import { defineComponent, ref, Ref, provide } from 'vue'

// Using aliases to avoid ESLint error:
// 'no-reserved-component-names'
import {
    Chart,
    Grid,
    Tooltip,
    Marker as ChartMarker,
    Bar,
} from 'vue3-charts'
import { Direction, ChartAxis } from 'vue3-charts/src/types'

import { plByMonth } from '@/data'

export default defineComponent({
    name: 'BarChart',
    components: { Chart, Grid, Tooltip, ChartMarker, Bar },
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
    <Chart :size="{ width: 500, height: 420 }" :data="data" :margin="margin" :direction="direction" :axis="axis" >

        <template #layers>
            <Grid strokeDasharray="2,2" />
            <Bar :dataKeys="['name', 'pl']" :barStyle="{ fill: '#FF6347' }" /> <!-- Tomato -->
            <Bar :dataKeys="['name', 'avg']" :barStyle="{ fill: '#3CB371' }" /> <!-- Medium Sea Green -->
            <Bar :dataKeys="['name', 'inc']" :barStyle="{ fill: '#1E90FF' }" /> <!-- Dodger Blue -->
            <ChartMarker :value="1200" label="Target" color="black" :strokeWidth="2" strokeDasharray="6 6" />
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