<template>
    <v-container class="navBar">     
        <v-navigation-drawer v-model="drawer" clipped app>
            <v-list nav dense>
                <v-list-item
                    flat
                    v-for="link in links"
                    :key="link.route"
                    router
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    <v-app-bar app dense >    
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
            Sentiment Trend
        </v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>
<script src='./navBar.ts' lang='ts'/>