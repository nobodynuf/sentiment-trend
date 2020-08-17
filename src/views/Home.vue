<template>
 <v-container class="home" >
    <v-layout wrap>
      <v-flex xs12>
        {{redditTemplateDataDisabled}}
        <v-card elevation="4">
          <v-layout wrap pa-4 justify-center>
            <v-flex xs12 >
              <h1 class="text-center">Panel de Análisis</h1>
            </v-flex>
            <v-flex xs8 text-center mb-5>
              <v-card class="elevation-5">
                <v-layout>
                  <v-flex xs6 mb-5>
                    <v-list-item-title class="align-items: center ">
                      <v-list-item-icon class="mr-0">
                        <v-icon color="twitter" size="30px">mdi-twitter</v-icon> 
                      </v-list-item-icon>
                      <v-list-item-icon>
                        <v-img 
                          width="80px"
                          src="@/assets/twitterText.png"
                        ></v-img>  
                      </v-list-item-icon>
                    </v-list-item-title>
                    <v-btn-toggle v-model="toggle_twitter" color="twitter" mandatory rounded>
                      <v-btn disabled small outlined>Datos por defecto</v-btn>
                      <v-btn disabled small outlined>Datos de plantilla</v-btn>
                    </v-btn-toggle>
                  </v-flex>
                  <v-flex xs6 mb-5> 
                    <v-list-item-title class="align-items: center ">
                      <v-list-item-icon class="mr-0">
                        <v-icon color="reddit" size="30px">mdi-reddit</v-icon> 
                      </v-list-item-icon>
                      <v-list-item-icon>
                        <v-img 
                          width="60px"
                          src="@/assets/redditText.png"
                        ></v-img>  
                      </v-list-item-icon>
                    </v-list-item-title>
                    <v-btn-toggle v-model="toggle_reddit" color="reddit" mandatory rounded>
                      <v-btn small outlined>Datos por defecto</v-btn>
                      <v-btn :disabled="redditTemplateDataDisabled" small outlined>Datos de plantilla</v-btn>
                    </v-btn-toggle>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            
            <v-flex xs12 text-center>
              <v-layout>
                <v-flex xs6 class="mr-4 ml-0">
                  <v-card disabled outlined>
                    <line-chart></line-chart>
                  </v-card>
                  <v-card disabled class="mt-2" outlined>
                      <line-chart></line-chart>
                    </v-card>
                </v-flex> 
                <v-flex xs6 class="ml-4 mr-0">
                  <v-card outlined>
                    <factor-chart :title="'Manifestación Emocional por Subreddit'" :data="subreddit_default_split_data" :n_entries="entries.default.reddit.subreddit"></factor-chart>
                  </v-card>
                  <v-card class="mt-2" outlined>
                    <factor-chart :title="'Manifestación Emocional por Redditors'" :data="rusers_splited_data" :n_entries="entries.default.reddit.users"></factor-chart>
                  </v-card>
                </v-flex> 
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src='./Home.ts' lang='ts'/>