<template>
  <div>
    <v-app>
      <v-app-bar app color="pink" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-toolbar-title style="font-size: 30px; font-weight: bold"
            >Demo Task</v-toolbar-title
          >
        </div>

        <v-spacer></v-spacer>

        <v-btn to="/" text class="mr-2">
          <span class="mr-2">Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn to="/details" text>
          <span class="mr-2">Details</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
      <router-view></router-view>
    </v-app>
  </div>
</template>