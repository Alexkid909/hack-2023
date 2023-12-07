<template>
  <div class="root">
    <v-app>
      <header class="header pt-3">
        <div class="d-flex justify-center">
          <h1 class="main-header">Fettle</h1>
        </div>
      </header>
      <!-- <v-app-bar app color="grey lighten-3 py-4" height="150">
        <template>
          <v-app-bar-title>
          </v-app-bar-title>
        </template>
      </v-app-bar> -->

      <v-main>
        <v-container class="mt-10 d-flex justify-center main">
          <v-sheet color="white" elevation="5" max-width="640px">
            <v-card height="100%" class="px-10 py-6 text-center">
              <router-view></router-view>
            </v-card>
          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

.root {
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    &.header {
      box-shadow: 0 5px 10px 1px gray;
      background-color: #f5f5f5;
      z-index: 2;
    }
  }

  .main-header {
    font-family: "Alfa Slab One";
    color: #ff5722;
    font-size: 76px;
  }

  .main {
    padding-top: 120px;
  }

  .survey-button {
    min-width: 44px !important;
  }

  .v-input {
    div[role="radiogroup"] {
      display: flex;
      flex-direction: row !important;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .v-radio {
    position: relative;
    > div {
      visibility: hidden;
      position: absolute;
      width: 0;
      height: 0;
    }
  }

  .key {
    width: 100%;
  }
}
</style>
