<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-snackbar :timeout="snackbarTime" :color="snackbarColor" v-model="snackbar">
                    {{ text }}
            </v-snackbar>
        </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>