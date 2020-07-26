<template>
    <v-app>
        <navBar />
        <v-content class="grey lighten-2">
            <v-container grid-list-md>
                <v-scroll-y-transition>
                <v-btn
                    class="centered"
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    fixed
                    small
                    bottom
                    right
                    color="primary"
                    @click="toTop"
                >
                    <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>
                </v-scroll-y-transition>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script src="./App.ts" lang="ts" />
<style scoped>
.centered {
  top: 50%;
}
</style>