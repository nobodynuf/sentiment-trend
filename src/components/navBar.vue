<template>
    <v-container class="navBar">   
        
        <v-navigation-drawer v-model="drawer" clipped app>
            <v-list shaped nav dense>
                <v-list-item
                    flat
                    v-for="link in mainLinks"
                    :key="link.route"
                    router
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon large>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-subheader>Social Networks</v-subheader>
                <v-list-item
                    flat
                    v-for="link in socialMediaLinks"
                    :key="link.route"
                    router
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon large :color="link.color">{{ link.icon }}</v-icon>
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
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
  </v-container>
</template>
<script src="https://code.iconify.design/1/1.0.6/iconify.min.js"></script>  
<script src='./navBar.ts' lang='ts'/>