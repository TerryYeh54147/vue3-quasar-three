<script setup lang="ts">
import { ref, shallowReactive } from 'vue';
import { useRenderLoop } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { Color, BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three';
const boxRef = ref();
const boxPosition = ref([0, 0, 0]);
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
const { onLoop } = useRenderLoop();
onLoop(({ delta, elapsed }) => {
  if (!boxRef.value) return;
});
</script>
<template>
  <TresCanvas window-size v-bind="state">
    <TresPerspectiveCamera
      :args="[75, 1, 0.1, 1000]"
      :position="[3, 1, 4]"
      :look-at="[1000, 10, 1000]"
    />
    <OrbitControls make-default/>
    <TresScene>
      <TransformControls :object="boxRef" />
      <TresMesh>
        <TresBoxGeometry ref="boxRef" :args="boxArgs" :position="boxPosition">
        </TresBoxGeometry>
        <TresMeshNormalMaterial></TresMeshNormalMaterial>
      </TresMesh>
    </TresScene>
    <TresAxesHelper />
  </TresCanvas>
</template>
