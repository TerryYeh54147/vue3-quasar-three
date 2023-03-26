<script setup lang="ts">
import { ref, shallowReactive, shallowRef } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import {
  OrbitControls,
  useTweakPane,
  TransformControls,
} from '@tresjs/cientos';
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three';
const [width, height] = [window.innerWidth, window.innerHeight - 50];

const boxRef = shallowRef();
const boxPosition = ref([10, 10, 1000]);
const boxArgs = ref([1, 1, 1]);
const state = shallowReactive({
  clearColor: 'grey',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
});

const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
});

//  params control pane
const { pane } = useTweakPane();
pane
  .addBlade({
    view: 'list',
    label: 'outputEncoding',
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
});

const check = () => {
  console.log('===check===');
};
</script>
<template>
  <TresCanvas window-size v-bind="state">
    <OrbitControls make-default />
    <TresPerspectiveCamera
      visible
      :args="[75, width / height, 0.1, 1000]"
      :position="[3, 1, 10]"
      :look-at="[0, 0, 0]"
    />
    <TresScene>
      <TransformControls :object="boxRef" v-bind="transformState"/>
      <TresMesh ref="boxRef" cast-shadow @contextmenu="check()">
        <TresBoxGeometry :args="boxArgs" :position="boxPosition">
        </TresBoxGeometry>
        <TresMeshToonMaterial color="grey" />
      </TresMesh>

      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[0, 8, 4]"
        :intensity="1.5"
        cast-shadow
      />
    </TresScene>
    <TresAxesHelper />
    <TresGridHelper />
  </TresCanvas>
</template>
