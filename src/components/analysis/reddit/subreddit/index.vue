<template>
  <v-layout wrap elevation="4">
    <v-flex xs12>
      <v-layout wrap align-center>
        <v-flex xs4>
          <v-text-field
            prefix="r/"
            prepend-icon="search"
            v-model="search_input"
            label="Ingrese nombre de subreddit"
            :disabled="loading"
            @keyup="onSearchChange"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 pb-2>
          <v-btn
            depressed 
            rounded
            small
            class="secondary"
            :disabled="voidTextFiel"
            :loading="loading"
            @click="findSubreddit"
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
            <span class="subtitle-2 grey--text" v-if="enabledSub">No hay registros inválidos</span>
          </v-flex>
          <v-flex xs12>
            <v-carousel v-model="carouselItem" show-arrows-on-hover :dark="$vuetify.theme.dark"
   :light="!$vuetify.theme.dark">
              <v-carousel-item >
                <pie-chart :loading="loading" :data="pie_analysis"></pie-chart>
              </v-carousel-item>
              <v-carousel-item>
                <v-card-text class="text-center pt-2">
                  <column-chart :title="titleTop5" :data="topFiveAnalysis"></column-chart>
                  <v-chip v-if="enabledSub" outlined label color="chart1">
                    <h4>{{titleTop1}}</h4>
                  </v-chip>
                </v-card-text>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs5>
      <v-card outlined v-if="enabledSub" class="mb-3">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">{{subreddit.name}}</v-card-title>
            <v-card-subtitle class="mt-1">
              <v-chip label class="mr-2 mt-2" >ID: {{subreddit.id}}</v-chip>
              <v-chip label class="mr-2 mt-2" >Entradas analizadas: {{subreddit.n_entries}}</v-chip>
            </v-card-subtitle>
          </div>
        </div>
      </v-card>
      <v-card outlined>
        <v-card-title>Factores</v-card-title>
        <v-card-text>
          <factor-emo :analysis="sub_analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
     <v-card outlined>
        <v-card-title>Publicaciones</v-card-title>
        <v-card-text>
           <sub-table :submissions="submissionsTable"></sub-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <Snackbar :key="changingKeySnackbar" :state="snackbar"></Snackbar>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>
