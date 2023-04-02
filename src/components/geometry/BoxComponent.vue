<template>
  <TransformControls :object="boxRef" v-bind="transformState" />
  <TresMesh ref="boxRef" :position="props.pos" cast-shadow>
    <TresBoxGeometry :args="props.args"> </TresBoxGeometry>
    <TresMeshStandardMaterial :color="transformState.color" />
  </TresMesh>
</template>

<script setup lang="ts">
import { ref, shallowRef, shallowReactive } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { TransformControls, useTweakPane } from '@tresjs/cientos';
import _ from 'lodash';

const props = defineProps({
  pos: {
    type: Array<number>,
    default: [0, 0, 0],
  },
  args: {
    type: Array<number>,
    default: [1, 1, 1],
  },
});

const boxRef = shallowRef();

const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
  color: { r: 0, g: 0, b: 0 },
});
//  params control pane
const { pane } = useTweakPane();
pane
  .addBlade({
    view: 'list',
    label: 'Object controler',
    options: [
      { text: 'Translate', value: 'translate' },
      { text: 'Rotate', value: 'rotate' },
      { text: 'Scale', value: 'scale' },
    ],
    value: transformState.mode,
  })
  .on('change', (ev) => {
    transformState.mode = ev.value;
  });
pane.addInput(transformState, 'size');
pane.addInput(transformState, 'color', { color: { type: 'float' } });
// axis
const axisFolder = pane.addFolder({ title: 'Axis' });
axisFolder
  .addBlade({
    view: 'list',
    label: 'axis',
    options: [
      { text: 'X', value: 'X' },
      { text: 'Y', value: 'Y' },
      { text: 'XY', value: 'XY' },
      { text: 'YZ', value: 'YZ' },
      { text: 'XZ', value: 'XZ' },
      { text: 'XYZ', value: 'XYZ' },
    ],
    value: transformState.axis,
  })
  .on('change', (ev) => {
    transformState.axis = ev.value;
  });
axisFolder.addInput(transformState, 'showX');
axisFolder.addInput(transformState, 'showY');
axisFolder.addInput(transformState, 'showZ');

const { onLoop } = useRenderLoop();
onLoop(({ delta, elapsed }) => {
  if (!boxRef.value) return;
  boxRef.value.material.color = transformState.color;
});
</script>
