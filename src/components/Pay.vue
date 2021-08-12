<template>
  <v-row>
    <v-dialog v-model="showPay" persistent max-width="500">
      <v-card class="rounded-lg">
        <h2 class="pl-2 pt-2 pb-2">Pay</h2>
        <div class="pr-5 pl-5">
          <v-alert
            text
            type="info"
            color="blue"
            class="caption font-weight-bold"
          >
            Hola {{ user.nombre }}!, esperamos que hayas encontrado todo lo que
            buscabas
          </v-alert>
          <p class="ma-0 subtitle-2">
            Total de su compra:
            {{
              new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(total)
            }}
          </p>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="pr-5 pl-5">
          <v-text-field
            outlined
            color="green"
            label="Confirmar compra"
            placeholder="Por favor ingrese la cantidad que se le indica"
            type="number"
            dense
            v-model="pago"
            :rules="ruleRequired"
          ></v-text-field>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize" color="grey" text @click="cancelar">
            Cancelar
          </v-btn>
          <v-btn
            class="text-capitalize white--text"
            depressed
            color="blue"
            @click="confirmarPago()"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Pay",
  data() {
    return {
      pago: null,
      valid: true,
      ruleRequired: [(v) => !!v || "Campo requerido"],
    };
  },
  props: {
    showPay: {
      type: Boolean,
    },
    total: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(["vaciarProducto"]),
    confirmarPago() {
      if (this.pago < this.total) {
        this.showMessageError();
      } else if (this.pago > this.total) {
        let cambio = this.pago - this.total;
        let message = `Gracias por su compra, vuelva pronto.`;
        let texto = `pagó con: $${this.pago}.00, su cambio: $${cambio}.00`;
        this.showMessageSuccessful(message, texto);
      } else {
        this.$swal({
          icon: "success",
          title: `<h4 style="font-family: 'Segoe UI'">Gracias por su compra, vuelva pronto.</h4>`,
          confirmButtonText: `<span style="font-family: 'Segoe UI'">Ok!</span>`,
        });
        this.$emit("cancel");
        this.$refs.form.reset();
        this.vaciarProducto();
        this.$router.push({ name: "Store" });
      }
    },
    showMessageSuccessful(message, texto) {
      this.$swal({
        icon: "success",
        title: `<h4 style="font-family: 'Segoe UI'">${message}</h4>
        <span style="font-family: 'Segoe UI'">${texto}</span>`,
        confirmButtonText: `<span style="font-family: 'Segoe UI'">Ok!</span>`,
      });
      this.$emit("cancel");
      this.$refs.form.reset();
      this.vaciarProducto();
      this.$router.push({ name: "Store" });
    },
    showMessageError() {
      this.$swal({
        icon: "error",
        title: `<h4 style="font-family: 'Segoe UI'">Oops...</h4>`,
        html: `<span style="font-family: 'Segoe UI'">Por favor ingrese una cántidad válida.</span>`,
        confirmButtonText: `<span style="font-family: 'Segoe UI'">Ok!</span>`,
      });
    },
    cancelar() {
      this.$emit("cancel");
      this.$refs.form.reset();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
</style>