<template>
 <v-container >
    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="4">
          <v-layout wrap pa-3 justify-center> 
            <v-flex xs12>
              <h1 class="text-center">
                <v-icon color="twitter" size="40px">mdi-twitter</v-icon> Twitter
              </h1>
            </v-flex>
            <v-flex xs12>
              <v-tabs v-model="tab" color="twitter" grow>
                <v-tab href="#tab-1">Análisis total</v-tab>
                <v-tab-item class="mt-3" value="tab-1">
                  <t-hasht></t-hasht>
                </v-tab-item>
                <v-tab href="#tab-2">Analizar Hashtag</v-tab>
                <v-tab-item class="mt-3" value="tab-2">
                  <t-hash></t-hash>
                </v-tab-item>
                <v-tab href="#tab-3">Análisis Usuarios</v-tab>
                <v-tab-item class="mt-3" value="tab-3">
                  <t-users></t-users>
                </v-tab-item>
                <v-tab href="#tab-4">Analizar Usuario</v-tab>
                <v-tab-item class="mt-3" value="tab-4">
                  <t-user></t-user>
                </v-tab-item>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src='./Twitter.ts' lang='ts'/>