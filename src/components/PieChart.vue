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
        <template #main>
            <Chart :direction="'circular'" :data="data" :axis="axis">
                <template #layers>
                    <Pie :dataKeys="['name', 'pl']" :pie-style="{ innerRadius: 100, padAngle: 0.05 }" />
                    </template>

                <template #widgets>
                    <Tooltip borderColor="#48CAE4" :config="{
                        avg: { hide: true },
                        pl: { label: 'pl value', color: '#FF6347' },
                        inc: { hide: true }
                    }" hideLine />
                </template>
            </Chart>
        </template>
    </Responsive>
</template>