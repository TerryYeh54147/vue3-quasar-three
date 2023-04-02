<script setup lang="ts">
import { shallowReactive } from 'vue';
import { OrbitControls } from '@tresjs/cientos';
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three';
import BoxComponent from './geometry/BoxComponent.vue';

const [width, height] = [window.innerWidth, window.innerHeight - 50];

const state = shallowReactive({
  clearColor: 'grey',
  shadows: true,
  alpha: false,
  physicallyCorrectLights: true,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
});
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
      <BoxComponent :pos="[1, 1, 1]" :args="[2, 2, 2]" />
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
