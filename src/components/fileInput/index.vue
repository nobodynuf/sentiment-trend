<template>
    <v-layout wrap align-center fill-height justify-center>
        <v-flex xs7 pb-0>
            <v-file-input class="text-left" @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="entrada de archivo excel"  dense></v-file-input>
        </v-flex>
        <v-flex xs5 pb-0>
            <v-btn  @click="submitFile" :disabled="fileInputDisabled" 
             small color="primary">Subir
                <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12 pt-0 ml-1 text-left> 
                <div @click="getTemplate" class="body-2 underline">Descargar plantilla</div>
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
</template>
<script src='./index.ts' lang='ts'/>
<style scoped>
.underline {
  text-decoration: underline;
  color: green;
  cursor: pointer;
}
</style>