<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="4">
          <v-layout wrap pa-3 justify-center>
            <v-flex xs12 class="text-center">
                <v-list-item-title class="align-items: center ">
                  <v-list-item-icon class="mr-1">
                    <v-icon color="reddit" size="40px">mdi-reddit</v-icon> 
                  </v-list-item-icon>
                  <v-list-item-icon>
                    <v-img 
                      width="80px"
                      src="@/assets/redditText.png"
                    ></v-img>  
                  </v-list-item-icon>
                </v-list-item-title>
            </v-flex>
            <v-flex xs12>
              <v-tabs v-model="tab" color="reddit" grow>
                <v-tab href="#tab-1">Análisis total</v-tab>
                <v-tab-item class="mt-3" value="tab-1">
                  <r-subr @selected-subreddit="selectedSubredditEvent($event)"></r-subr>
                </v-tab-item>
                <v-tab href="#tab-2">Analizar Subreddit</v-tab>
                <v-tab-item class="mt-3" value="tab-2">
                  <r-sub :key="updateTabSubreddit"></r-sub>
                </v-tab-item>
                <v-tab href="#tab-3">Análisis Usuarios</v-tab>
                <v-tab-item  class="mt-3" value="tab-3">
                  <r-users @selected-user="selectedUserEvent($event)"></r-users>
                </v-tab-item>
                <v-tab href="#tab-4">Analizar Usuario</v-tab>
                <v-tab-item class="mt-3" value="tab-4">
                  <r-user :key="updateTabUser"></r-user>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src='./Reddit.ts' lang='ts'/>