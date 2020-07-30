<template>
    <v-layout pb-3 pt-3 wrap align-center fill-height justify-center>
        <v-flex xs7  pb-0>
            <v-file-input class="text-left" :disabled="loading" @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="Ingresar plantilla de datos "  dense></v-file-input>
        </v-flex>
        <v-flex pb-3 xs5>
            <v-btn @click="submitFile" small depressed rounded
              :loading="loading" :disabled="fileInputDisabled" color="secondary">Subir
                <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12 ml-2 text-left > 
            <v-layout>
                <div @click="getTemplate" class="body-2 underline">Descargar plantilla</div>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-snackbar :timeout="snackbarTime" :color="snackbarColor" v-model="snackbar">
               {{ text }}
            </v-snackbar>
        </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>
<style scoped>
.underline {
  text-decoration: underline;
  color: green;
  cursor: pointer;
}
</style>