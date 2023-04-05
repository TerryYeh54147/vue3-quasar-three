<template>
  <!-- <TransformControls :object="boxRef" v-bind="transformState" /> -->
  <TresMesh ref="boxRef" :position="props.pos" cast-shadow class="selected">
    <TresBoxGeometry :args="props.args"> </TresBoxGeometry>
    <TresMeshStandardMaterial :color="color" />
  </TresMesh>
</template>

<script setup lang="ts">
import { shallowRef, shallowReactive, computed, PropType } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { TransformControls, useTweakPane } from '@tresjs/cientos';
import type { RGB, TransformState } from 'src/models/geometry';
import _ from 'lodash';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  pos: {
    type: Array<number>,
    default: [0, 0, 0],
  },
  args: {
    type: Array<number>,
    default: [1, 1, 1],
  },
  color: {
    type: Object as PropType<RGB>,
    default: () => ({
      r: 0,
      g: 0,
      b: 0,
    }),
  },

  // transformState: {
  //   type: Object as PropType<TransformState>,
  //   required: true,
  // },
});
const boxRef = shallowRef();
const color = computed(() => props.color);

const { onLoop } = useRenderLoop();
onLoop(({ delta, elapsed }) => {
  if (!boxRef.value) return;
  boxRef.value.material.color = color.value;
});
</script>
