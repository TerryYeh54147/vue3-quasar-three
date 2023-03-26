<script setup lang="ts">
import * as THREE from 'three';
import { WebGLRenderer, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, onMounted } from 'vue';

const [width, height] = [window.innerWidth, window.innerHeight - 50];
let canvasArea = ref<HTMLCanvasElement | null>(null);
let scene = new THREE.Scene();
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let addItems = ref([{ label: 'cube', icon: 'view_in_ar' }]);
let controls = OrbitControls;
onMounted(() => {
  init();
});
function init() {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  scene.add(camera);
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0.5, 1.0, 0.5).normalize();
  scene.add(light);

  // helper
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
  const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x333333);
  scene.add(grid);

  // test
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  renderer = new THREE.WebGLRenderer({
    canvas: canvasArea.value as unknown as HTMLCanvasElement,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderScene();
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderScene);
  controls.update();

  window.addEventListener('resize', onWindowResize);
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderScene();
};
const renderScene = () => {
  renderer.render(scene, camera);
};
function addsceneElem(type: string) {
  if (type === 'cube') {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 'blue' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }
}
</script>

<template>
  <q-btn-dropdown class="dropBtn" color="primary" icon="add" rounded>
    <q-list>
      <q-item
        v-for="(item, i) in addItems"
        :key="`dropBtn${i}`"
        clickable
        v-close-popup
        @click="addsceneElem(item.label)"
      >
        <q-item-section avatar>
          <q-avatar :icon="item.icon"></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
  <canvas ref="canvasArea"></canvas>
</template>

<style scoped lang="scss">
.dropBtn {
  z-index: 1;
}
</style>
