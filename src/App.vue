<template>
    <v-app>
        <navBar />
        <v-content class="grey lighten-3">
            <v-container grid-list-md>
                <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    right
                    color="primary"
                    @click="toTop"
                >
                    <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script src="./App.ts" lang="ts" />
