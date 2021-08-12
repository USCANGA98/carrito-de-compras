<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-dialog persistent max-width="800" v-model="showCreateAccount">
            <v-card class="ma-auto" rounded="lg" max-width="800">
              <v-container>
                <h2 class="mb-5">Datos personales</h2>
                <v-row>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Nombre(s)"
                      placeholder="Ingresa tu nombre(s)"
                      v-model="user.nombre"
                      :rules="ruleRequired"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Ingresa tu apellido"
                      placeholder="Ingresa tu apellido paterno"
                      v-model="user.apellidoPaterno"
                      :rules="ruleRequired"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Apellido Materno"
                      placeholder="Ingresa tu apellido materno"
                      v-model="user.apellidoMaterno"
                      :rules="ruleRequired"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-file-input
                      color="green"
                      prepend-icon
                      prepend-inner-icon="mdi-file-document-outline"
                      label="Fotografía"
                      outlined
                      show-size
                      dense
                      :rules="ruleDocument"
                      accept="application/pdf, image/*"
                      @change="input($event, 'imagen')"
                    ></v-file-input>
                  </v-col>
                </v-row>
                <h2 class="mb-5">Cuenta</h2>
                <v-row>
                  <v-col cols="12">
                    <div class="pr-10 pl-10">
                      <v-alert
                        text
                        type="error"
                        class="caption font-weight-bold"
                      >
                        Guarde estos datos en un lugar seguro, y en caso de
                        extravío...llame a emergencias! :(
                      </v-alert>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Correo electrónico"
                      placeholder="Ingresa tu correo electrónico"
                      dense
                      v-model="mail"
                      :rules="ruleMail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Correo electrónico"
                      placeholder="Repite tu correo electrónico"
                      dense
                      :disabled="mail == ''"
                      v-model="mailRepeat"
                      :rules="ruleMailRepeat"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Contraseña"
                      placeholder="Ingresa tu contraseña"
                      dense
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      :rules="rulePassword"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Contraseña"
                      placeholder="Repite tu contraseña"
                      dense
                      v-model="passwordRepeat"
                      :rules="rulePasswordRepeat"
                      :disabled="password == ''"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-row>
                    <v-col cols="6">
                      <v-tooltip color="grey darken-3" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="text-capitalize white--text"
                            v-bind="attrs"
                            v-on="on"
                            block
                            large
                            outlined
                            text
                            color="red"
                            dark
                            @click="$emit('cancel')"
                            >Cancelar</v-btn
                          >
                        </template>
                        <span>Cancelar</span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="6">
                      <v-tooltip color="grey darken-3" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :loading="loading"
                            class="text-capitalize"
                            v-bind="attrs"
                            v-on="on"
                            block
                            large
                            depressed
                            color="green"
                            dark
                            @click="setInfo"
                            >Enviar información</v-btn
                          >
                        </template>
                        <span>Enviar Información</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-form>

    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}</v-snackbar>
  </v-container>
</template>

<script>
import { auth, storage, db } from "../services/firebase";
export default {
  name: "CreateAccount",
  props: {
    showCreateAccount: {
      type: Boolean,
    },
  },
  data: () => ({
    valid: true,
    text: "",
    mail: "",
    loading: false,
    mailRepeat: "",
    password: "",
    passwordRepeat: "",
    snackbar: false,
    timeout: 5000,
    show1: false,
    show2: false,
    user: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correoElectronico: "",
      contrasena: "",
      rol: "admin",
      uid: "",
      imagen: "",
    },
    menu: false,
    ruleRequired: [(v) => !!v || "Campo requerido"],
    rulePassword: [
      (v) => !!v || "Campo requerido",
      (v) =>
        (v && v.length >= 6) ||
        "La contraseña debe contener al menos 6 caracteres",
    ],
    ruleMail: [
      (v) => !!v || "Campo requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un correo válido",
    ],
    ruleDocument: [
      (v) => !!v || "Campo requerido",
      (v) => !v || v.size < 2000000 || "El archivo solo puede pesar 2 MB!",
    ],
  }),
  methods: {
    async createAccount() {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          this.mailRepeat,
          this.passwordRepeat
        );
        this.user.uid = response.user.uid;
        await this.subirImagen();
      } catch (error) {
        this.text = error.message;
        this.snackbar = true;
        console.log(error);
      }
    },
    input(e) {
      this.user.imagen = e;
    },
    async setInfo() {
      this.loading = true;
      if (!this.$refs.form.validate()) {
        this.text =
          "Faltan campos por llenar y/o la información es incorrecta.";
        this.snackbar = true;
      }

      if (this.$refs.form.validate()) {
        this.overlay = true;
        await this.createAccount();
        this.overlay = false;
      }
    },
    async subirDatosFirebase() {
      this.user.contrasena = this.password;
      this.user.correoElectronico = this.mail;
      let uid = this.user.uid;

      console.log(this.user);

      try {
        const response = await db.collection("users").doc(uid).set(this.user);
        if (response == undefined) {
          alert("Cuenta creada con exito!");
          this.loading = false;
          this.$emit("cancel");
        }
      } catch (error) {
        console.warn(error);
      }
    },

    async subirImagen() {
      const uid = this.user.uid;
      const nombre = this.user.nombre;
      const apellidoPaterno = this.user.apellidoPaterno;
      const apellidoMaterno = this.user.apellidoMaterno;
      try {
        if (this.user.imagen != "") {
          let file = this.user.imagen;
          let storageRef = storage.ref(
            `${nombre} ${apellidoPaterno} ${apellidoMaterno}/${uid}`
          );
          const response = await storageRef.put(file);
          if (response.state == "success") {
            let url = await storageRef.getDownloadURL();
            this.user.imagen = url;
          }
        }

        this.subirDatosFirebase();
      } catch (error) {
        console.warn(error);
      }
    },
  },

  computed: {
    rulePasswordRepeat() {
      return [
        (v) => {
          if (this.passwordRepeat == this.password) return true;
          if (this.password != this.passwordRepeat)
            return "Las contraseñas deben coincidir";
          if (v.length < 6)
            return "La contraseña debe contener al menos 6 caracteres";
        },
      ];
    },
    ruleMailRepeat() {
      return [
        (v) => {
          if (v == this.mail) return true;
          if (v != this.mail) return "Los correos deben coincidir";
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
