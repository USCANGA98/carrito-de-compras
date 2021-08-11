<template>
  <v-app>
    <AppBar v-if="$route.name != 'Home' && $route.name != 'Reset-Password' && $route.name != 'CreateAccount'" />
    <v-main class="grey lighten-4">
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
