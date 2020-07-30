<template>
    <v-layout wrap=""> 
        <v-flex xs12>
        <v-layout wrap align-center>
            <v-flex xs4>
              <v-text-field
                  prepend-icon="search"
                  v-model="search_input"
                  label="Ingrese nombre de Usuario"
                  :disabled="loading"
                  @keyup="onSearchChange"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 pb-2>
            <v-btn
            
                depressed 
                rounded
                small
                color="secondary"
                :disabled="voidTextFiel"
                :loading="loading"
                @click="findUser"
            >
                Buscar
                <v-icon small right>search</v-icon>
            </v-btn>
            </v-flex>
        </v-layout>
        </v-flex>   
           <v-flex xs7>
      <v-card outlined>
        <v-layout wrap pa-2>
          <v-flex xs12 class="d-flex align-center">
              <h3>{{data_title}} </h3> <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate></v-progress-circular>
          </v-flex>
          <v-flex xs12>
              <span class="subtitle-2 grey--text" v-if="enabledUser">No hay registros inválidos</span>
          </v-flex>
          <v-flex xs12>
            <v-carousel show-arrows-on-hover>
              <v-carousel-item>
                <pie-chart :loading="loading" :data="pie_analysis"></pie-chart>
              </v-carousel-item>
              <v-carousel-item>
                <v-card-text>
                  <column-chart :title="titleTop5" :data="topFiveAnalysis"></column-chart>
                  <h3>{{titleTop1}}</h3>
                </v-card-text>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs5>
      <v-card outlined v-if="enabledUser" class="mb-3">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">Perfil de {{user.name}}</v-card-title>
            <v-card-subtitle class="mt-1">
              <v-chip label class="mr-2 mt-2" >ID: {{user.id}}</v-chip>
              <v-chip label class="mt-2">Entradas analizadas: {{n_entries}}</v-chip>
            </v-card-subtitle>
          </div>
          <v-avatar class="ma-5" size="75">
            <v-img v-if="user.icon_img" :src="user.icon_img"></v-img>
          </v-avatar>
        </div>
      </v-card>
      <v-card outlined>
        <v-card-title>Factores
          <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate>
          </v-progress-circular>
        </v-card-title>
        <v-card-text>
          <factor-emo :analysis="analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>       
    <v-flex xs12>
     <v-card  outlined>
        <v-card-title>Tweets
          <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate>
          </v-progress-circular>
        </v-card-title>
        <v-card-text>
           <tw-table :tweets="twTable"></tw-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <Snackbar :key="changeKey" :state="snackbar"></Snackbar>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>