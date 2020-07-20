<template>
    <v-layout pb-3 wrap align-center fill-height justify-center>
        <v-flex xs7 ml-0 pb-0>
            <v-file-input class="text-left" @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="Ingresar plantilla de datos "  dense></v-file-input>
        </v-flex>
        <v-flex xs5>
            <v-btn  @click="submitFile" :disabled="fileInputDisabled" 
             small color="indigo" outlined>Subir
                <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12 ml-2 text-left > 
            <v-layout>
                <div @click="getTemplate" class="body-2 underline">Descargar plantilla</div>
            </v-layout>
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