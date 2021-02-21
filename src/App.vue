<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link to="/mainpage">
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Welcome page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/roulettePage">
          <v-list-item-action>
            <v-icon>mdi-blur-radial</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>All in one page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/gameBoardAndSpin">
          <v-list-item-action>
            <v-icon>mdi-baby-face-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gameboard and spin timer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/statsAndAction">
          <v-list-item-action>
            <v-icon>mdi-alert-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Statistics and action log</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Aardvark technical task</v-toolbar-title>
    </v-app-bar>

      <v-content>
        <v-container fluid  class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2021 Jonas Ribikauskas</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null
    })
  }
</script>