<template>
  <v-app id="error">
    <v-container fluid class="error-page center divcol">
      <v-row justify="center" align="center">
        <v-col id="containerNotFound">
          <!-- content -->
          <span class="text404 bold">404</span>
          <v-col class="paddtopdel center">
            <span class="textNotFound bold">Sorry Wrong Page</span>
          </v-col>
          <v-col class="center">
            <v-btn href="#/" id="buttonNotFound" class="bold">Homepage</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style src="./Error.scss" lang="scss"></style>
