<template>
    <v-layout wrap align-center fill-height justify-center>
        <v-flex xs1></v-flex>
        <v-flex xs7 mt-3>
            <v-file-input @change="onFileChange" :rules="rules" v-model="file"  accept=".xlsx*" label="entrada de archivo excel"  dense></v-file-input>
        </v-flex>
        <v-flex xs2>
            <v-btn  @click="submitFile" :disabled="fileInputDisabled" 
             small color="primary">Subir
                <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs7> 
            <v-btn @click="getTemplate" outlined color="green darken-4">
                Descargar Plantilla Excel
                <v-icon class="pb-1" right dark>mdi-cloud-download</v-icon>
            </v-btn>
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