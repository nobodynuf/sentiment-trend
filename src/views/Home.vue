<template>
 <v-container class="home" >
    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="4">
          <v-layout wrap pa-4 justify-center>
            <v-flex xs12 >
              <h1 class="text-center">Panel de Análisis</h1>
            </v-flex>
            <v-row>
              <v-col cols="6">
                 <v-card outlined>
                <pie-chart></pie-chart>
                 </v-card>
              </v-col> 
              <v-col cols="6">
                <v-card outlined>
                  <line-chart></line-chart>
                </v-card>
              </v-col > 
              <v-col cols="6">
                <v-card class="elevation-5">
                  <factor-chart :title="'Manifestación Emocional por Subreddit'" :data="subreddit_splited_data" :n_entries="entries.default.reddit.subreddit"></factor-chart>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="elevation-5">
                  <factor-chart :title="'Manifestación Emocional por Redditors'" :data="rusers_splited_data" :n_entries="entries.default.reddit.users"></factor-chart>
                </v-card>
              </v-col> 
            </v-row>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src='./Home.ts' lang='ts'/>