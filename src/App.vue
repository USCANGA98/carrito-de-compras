<template>
  <v-app>
    <AppBar v-if="$route.path != '/' && $route.path != '/reset-password'" />
    <v-main class="white">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
export default {
  name: 'App',
components:{
  AppBar,
},
  data: () => ({
    //
  }),
};
</script>
