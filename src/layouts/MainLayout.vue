<template>
  <q-layout view="lHh Lpr lFf ">
    <q-drawer v-model="leftDrawerOpen" persistent show-if-above dark behavior="desktop" :width="200">
      <q-list class="q-py-sm">
        <q-toolbar-title class="text-center">{{ appName }}</q-toolbar-title>
      </q-list>
      <q-separator />
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'ThreeJs',
    icon: '3d_rotation',
    to: '/treejs',
  },
  {
    title: 'TresJs',
    icon: 'view_in_ar',
    to: '/',
  },
];

const leftDrawerOpen = ref(true);
const appName = process.env.APP_NAME;
</script>
