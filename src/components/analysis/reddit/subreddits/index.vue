<template>
  <v-layout wrap>
    <v-flex xs7>
      <v-card outlined>
        <v-layout wrap pa-2>
          <v-flex xs12 class="d-flex align-center">
            <h3>{{data_title}} </h3> <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate></v-progress-circular>
          </v-flex>
          <v-flex xs12>
              <span class="subtitle-2 text--grey" v-if="!loading">No hay registros inválidos</span>
          </v-flex>
          <v-flex xs12>
            <v-carousel :show-arrows="false">
              <v-carousel-item>
                <pie-chart :loading="loading" :data="pie_analysis"></pie-chart>
              </v-carousel-item>
              <v-carousel-item>
                <line-chart></line-chart>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs5>
      <v-card outlined>
        <v-card-title>Factores</v-card-title>
        <v-card-text>
          <factor-emo :analysis="analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card outlined>
        <v-card-text>
          <v-data-table></v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>