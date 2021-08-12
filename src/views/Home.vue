<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="showCreateAccount = true"
        class="text-capitalize font-weight-bold white--text"
      >
        Crear Cuenta
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row class="d-flex justify-center mt-15">
      <v-col md="6" lg="4" sm="6" cols="12">
        <v-card max-width="360" class="ma-auto" elevation="2" rounded="lg">
          <v-col cols="12" class="d-flex justify-center">
            <v-icon class="color" color="blue" size="130"
              >mdi-storefront</v-icon
            >
          </v-col>
          <v-col cols="12" v-if="error != ''">
            <v-alert outlined type="error" text dense>{{ error }}</v-alert>
          </v-col>

          <v-form class="pr-5 pl-5" @submit.prevent="iniciarSesion()">
            <v-text-field
              outlined
              dense
              v-model="user.mail"
              color="blue"
              label="Usuario"
              required
            ></v-text-field>
            <v-text-field
              outlined
              dense
              v-model="user.password"
              color="blue"
              label="Contraseña"
              type="password"
              required
            ></v-text-field>
            <v-btn
              class="text-capitalize font-weight-bold white--text"
              block
              color="blue"
              dark
              depressed
              :loading="loading"
              type="submit"
              >Iniciar sesión</v-btn
            >
            <v-row>
              <v-col cols="12" class="d-flex justify-center pt-5 pb-5">
                <router-link
                  :to="{ name: 'Reset-Password' }"
                  class="enlace font-weight-light blue--text text-subtitle-2"
                  >¿Olvidaste tu contraseña?</router-link
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <CreateAccount
      @cancel="showCreateAccount = false"
      :showCreateAccount="showCreateAccount"
    />
  </div>
</template>

<script>
import { db, auth } from "../services/firebase";
import { mapMutations } from "vuex";
import CreateAccount from "../components/CreateAccount.vue";

export default {
  name: "Home",
  components: {
    CreateAccount,
  },
  data: () => ({
    loading: false,
    showCreateAccount: false,
    user: {
      mail: "macarioluisangel006@gmail.com",
      password: "123456",
    },
    error: "",
    userData: "",
  }),
  methods: {
    ...mapMutations(["setUser"]),
    async iniciarSesion() {
      this.loading = true;
      try {
        this.userData = await this.getUser();
        this.setUser(this.userData);
        if (this.userData.rol == "admin") {
          this.$router.push({ name: "Store" });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async getUser() {
      try {
        const response = await auth.signInWithEmailAndPassword(
          this.user.mail,
          this.user.password
        );
        let user = await this.getDataUser(response.user.uid);
        return user;
      } catch (error) {
        this.error = error.message;

        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
    async getDataUser(uid) {
      try {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="css">
</style>

