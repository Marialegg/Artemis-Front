<template>
  <v-col id="profile">
    <h2 class="h4-em">
      PERFIL
    </h2>

    <section class="contForm">
      <v-card color="transparent">
        <label class="h7-em" for="nombre">NOMBRE</label>
        <v-text-field
          v-model="nombre"
          id="nombre"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="dni">DNI</label>
        <v-text-field
          v-model="dni"
          id="dni"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="apellido">APELLIDO</label>
        <v-text-field
          v-model="apellido"
          id="apellido"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="wallet">WALLET</label>
        <v-text-field
          v-model="wallet"
          id="wallet"
          solo
          disabled
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="discord">DISCORD</label>
        <v-text-field
          v-model="discord"
          id="discord"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="email">EMAIL</label>
        <v-text-field
          v-model="email"
          id="email"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent" class="profesion">
        <label class="h7-em" for="profesion">PROFESION</label>
        <v-text-field
          v-model="profesion"
          id="profesion"
          solo
        >
        </v-text-field>
      </v-card>
      <v-card color="transparent" class="biografia">
        <label class="h7-em" for="biografia">BIOGRAFIA</label>
        <v-textarea
          v-model="biografia"
          id="biografia"
          solo
        >
        </v-textarea>
      </v-card>
      <v-card color="transparent">
        <label class="h7-em" for="pais">PAIS</label>
        <v-text-field
          v-model="pais"
          id="pais"
          solo
        >
        </v-text-field>
      </v-card>
    </section>

    <v-col align="center">
      <v-btn class="h7-em" rounded>
        SAVE FORM
      </v-btn>
    </v-col>
  </v-col>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      nombre: "",
      dni: "",
      apellido: "",
      wallet: "",
      discord: "",
      email: "",
      profesion: "",
      biografia: "",
      pais: "",
    }
  },
  methods: {
  }
};
</script>

<style src="./Profile.scss" lang="scss" />
