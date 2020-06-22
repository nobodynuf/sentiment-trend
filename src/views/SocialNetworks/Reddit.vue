<template>
  <v-container class="reddit" >
    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="4">
          <v-layout wrap pa-3 justify-center>
            <v-flex xs12>
              <h1 class="text-center">
                <img src="@/assets/redditIcon.png" width="150" >  </h1>
            </v-flex>
            <v-flex xs12>
              <v-tabs app background-color="#FF4301" grow dark>
                <v-tab href="#tab-1">Análisis total</v-tab>
                <v-tab-item value="tab-1">
                  <r-subr></r-subr>
                </v-tab-item>
                <v-tab href="#tab-2">Analizar Subreddit</v-tab>
                <v-tab-item value="tab-2">
                  <r-sub></r-sub>
                </v-tab-item>
                <v-tab href="#tab-3">Análisis Usuarios</v-tab>
                <v-tab-item value="tab-3">
                  <r-users></r-users>
                </v-tab-item>
                <v-tab href="#tab-4">Analizar Usuario</v-tab>
                <v-tab-item value="tab-4">
                  <r-user></r-user>
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