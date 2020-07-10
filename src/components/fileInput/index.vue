<template>
  <v-layout wrap align-center fill-height justify-center>
    <v-flex xs7 px-0 pb-0>
      <v-file-input
        @change="onFileChange"
        :rules="rules"
        v-model="file"
        accept=".xlsx*"
        label="Ingresar de plantilla de datos:"
        dense
      >
      </v-file-input>
    </v-flex>
    <v-flex xs2>
      <v-btn @click="submitFile" :disabled="fileInputDisabled" small color="primary">
        Subir
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs3></v-flex>
    <v-flex xs12>
      <div role="button" tabindex="0" class="template-btn body-2" @click="getTemplate">Descargar plantilla</div>
    </v-flex>
    <v-flex xs12>
      <v-card outlined v-if="fileSet.length > 0" class="mx-auto">
        <v-card-title>Lista de archivos subidos</v-card-title>
        <v-data-table
          hide-default-header
          hide-default-footer
          :items="tableFileSet"
          :headers="subTable.headers"
        >
          <template v-slot:item._actions="{item}">
            <v-icon class="mr-2">mdi-eye</v-icon>
            <v-icon @click="deleteFile(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>
<style>
.template-btn {
  color: green;
  text-decoration: underline;
}
</style>