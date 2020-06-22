<template>
 <v-container class="twitter" >
    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="4">
          <v-layout wrap pa-3 justify-center> 
            <v-flex xs12>
              <h1 class="text-center">
                <img src="@/assets/twitterIcon.png" width="182">  
              </h1>
            </v-flex>
            <v-flex xs12>
              <v-tabs background-color="#00acee" grow dark>
                <v-tab href="#tab-1">Análisis total</v-tab>
                <v-tab-item value="tab-1">
                  <r-subr></r-subr>
                </v-tab-item>
                <v-tab href="#tab-2">Analizar xxx</v-tab>
                <v-tab-item value="tab-2">
                  <r-sub></r-sub>
                </v-tab-item>
                <v-tab href="#tab-3">Análisis xxx</v-tab>
                <v-tab-item value="tab-3">
                  <r-users></r-users>
                </v-tab-item>
                <v-tab href="#tab-4">Analizar xxx</v-tab>
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
<script src='./Twitter.ts' lang='ts'/>