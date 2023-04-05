<script setup lang="ts">
import { ref, shallowReactive, shallowRef, computed } from 'vue';
import { OrbitControls } from '@tresjs/cientos';
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three';
import BoxComponent from './geometry/BoxComponent.vue';
import type { BoxGeometry, RGB, TransformState } from 'src/models/geometry';
import { useTweakPane } from '@tresjs/cientos';

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

const gemoetries = ref<Array<BoxGeometry>>([
  {
    type: 'box',
    title: 'test1',
    args: [1, 1, 1],
    pos: [4, 1, 0],
    color: { r: 255, g: 0, b: 0 },
  },
  {
    type: 'box',
    title: 'test2',
    args: [1, 10, 1],
    pos: [1, 5, 5],
    color: { r: 0, g: 255, b: 0 },
    showPane: true,
  },
]);
function addElem(geometry: string) {
  if (geometry === 'box') {
    const newObj = {
      title: geometry + gemoetries.value.length,
      type: 'box',
      args: [0, 0, 0],
      pos: [1, 1, 1],
    };
    gemoetries.value.push(newObj);
  }
}
console.log(gemoetries.value[0]?.title ?? '');
// object controler
const transformState = shallowReactive<TransformState>({
  target: gemoetries.value[0]?.title ?? '',
  mode: 'translate',
  color: gemoetries.value[0]?.color ?? {
    r: 0,
    g: 0,
    b: 0,
  },
});
//  params control pane
const paneRef = shallowRef();
const { pane } = useTweakPane();
pane.container = 'paneRef';
pane
  .addBlade({
    view: 'list',
    label: 'Target',
    options: gemoetries.value.map((e) => {
      return { text: e.title, value: e.title };
    }),
    value: transformState.target,
  })
  .on('change', (ev) => {
    targetChanged.value = ev.value;
  });

const paramsFolder = pane.addFolder({ title: 'Parameter' });
paramsFolder.addInput(transformState, 'color', { color: { type: 'float' } });
paramsFolder
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
const targetChanged = computed({
  get: () => transformState.target,
  set: (val: string) => {
    transformState.target = val;
    const target = gemoetries.value.find((e) => e.title === val);
    if (target) {
      // dynamically udpate target's parameters in control pane
      transformState.color = target.color as RGB;
      pane.refresh();
    }
  },
});
</script>
<template>
  <TresCanvas window-size v-bind="state">
    <OrbitControls make-default />
    <TresPerspectiveCamera
      visible
      :args="[75, width / height, 0.1, 10000]"
      :position="[10, 5, 10]"
      :look-at="[0, 0, 0]"
    />
    <TresScene>
      <div v-for="(g, idx) in gemoetries" :key="`${g.type}_${idx}`">
        <BoxComponent
          v-if="g.type === 'box'"
          :key="`${g.type}_${idx}`"
          v-bind="g"
        />
      </div>
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
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="secondary" @click="addElem('box')" />
  </q-page-sticky>
  <div ref="paneRef"></div>
</template>
