<template>
  <v-layout wrap>
     <v-flex mt-3 xs12>
      <v-layout wrap align-center>
        <v-flex xs1></v-flex>
        <v-flex xs3>
          <v-file-input @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="entrada de archivo excel"  dense></v-file-input>
        </v-flex> 
        <v-flex xs1 class="mb-2">
          <v-btn :disabled="fileInputDisabled" @click="onUpload" small color="primary">Subir
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs7></v-flex>
        <v-flex xs12>   
          <v-layout wrap align-center>
            <v-flex xs7>
              <v-card outlined v-if="fileSet.length > 0" class="mx-auto">
                <v-card-title>Lista de archivos subidos</v-card-title>
                  <v-data-table
                  hide-default-header
                  hide-default-footer
                  :items="tableFileSet"
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
            <v-flex xs5>
            </v-flex>
          </v-layout>
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
              <span class="subtitle-2 text--grey" v-if="!loading">No hay registros inválidos</span>
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
       <v-card outlined>
        <v-card-title>Subreddits</v-card-title>
        <v-card-text v-if="!loading">
           <r-table :subreddits="subreddits"></r-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>