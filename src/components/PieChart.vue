<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { Chart, Responsive, Pie, Tooltip } from 'vue3-charts'
import { ChartAxis } from 'vue3-charts/src/types'

import { plByMonth } from '@/data'

export default defineComponent({
    name: 'PieChart',
    components: { Chart, Responsive, Pie, Tooltip },
    setup() {
        const data = ref(plByMonth)
        const axis: Ref<ChartAxis> = ref({
            // Even though the axis is hidden, the 'domain' and 'type' properties are mandatory.
            // Also, need to be set as 'band' type
            primary: {
                hide: true,
                domain: ['dataMin', 'dataMax'],
                type: 'band'
            },
            secondary: {
                hide: true,
                domain: ['dataMin', 'dataMax'],
                type: 'band'
            }
        })

        return { data, axis }
    }
})
</script>

<template>
    <Responsive class="w-full">
        <template #main="{ width }">
            <Chart direction="circular" :size="{ width, height: 400 }" :data="data" :margin="{
                left: Math.round((width - 360) / 2),
                top: 20,
                right: 0,
                bottom: 20
            }" :axis="axis" :config="{ controlHover: false }">
                <template #layers>
                    <Pie :dataKeys="['name', 'pl']" :pie-style="{
                        innerRadius: 100,
                        padAngle: 0.02,
                        cornerRadius: 10,
                        colors: ['red', 'orange', 'brown', 'green', 'blue', 'purple', 'pink']
                    }" />
                </template>
                <template #widgets>
                    <Tooltip :config="{
                        name: {},
                        avg: { hide: true },
                        pl: { label: 'value' },
                        inc: { hide: true }
                    }" hideLine />
                </template>
            </Chart>
        </template>
    </Responsive>
</template>