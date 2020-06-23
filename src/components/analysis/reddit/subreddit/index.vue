<template>
  <v-layout wrap elevation="4">
    <v-flex xs12>
      <v-layout wrap align-center>
        <v-flex xs1></v-flex>
        <v-flex xs3>
          <v-text-field
            prepend-icon="search"
            v-model="search_input"
            label="Ingrese nombre de subreddit: "
            :disabled="loading"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn
            depressed
            small
            color="primary"
            :disabled="loading"
            :loading="loading"
            @click="findSubreddit"
          >
            Buscar
            <v-icon small right>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs3>
          <v-file-input @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="entrada de archivo excel"  dense></v-file-input>
        </v-flex> 
        <v-flex xs1 class="mb-2">
          <v-btn :disabled="fileInputDisabled" @click="onUpload" small color="primary">Subir
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>   
      <v-layout wrap align-center>
        <v-flex xs7>
        </v-flex>
        <v-flex xs5>
          <v-card outlined v-if="fileSet.length > 0" class="mx-auto">
            <v-card-title>Lista de archivos subidos</v-card-title>
              <v-data-table
              hide-default-header
              hide-default-footer
              :items="fileSet"
              :headers="subTable.headers"
              >
              <template v-slot:item._actions="{item}">
                <v-icon  class="mr-2">
                  mdi-eye
                </v-icon>
                <v-icon @click="deleteFile(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs7>
      <v-card outlined>
        <v-layout wrap pa-2>
          <v-flex xs12>
            <h3>{{n_entries}} Registros</h3>
            <span class="subtitle-2 text--grey">No hay registros inválidos</span>
          </v-flex>
          <v-flex xs12>
            <v-carousel show-arrows-on-hover>
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
        <v-card-text v-if="enabledSub">
          <factor-emo :analysis="subreddit.analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
     <v-card outlined>
        <v-card-title>Publicaciones</v-card-title>
        <v-card-text v-if="enabledSub">
           <sub-table :submissions="subreddit.submissions"></sub-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>