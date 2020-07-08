<template>
    <v-layout wrap> 
        <v-flex xs9>
            <v-card-title>{{hashtag.name}}</v-card-title>
            <v-card-actions>
            <v-chip tile label>Tweets Analizados: {{nEntries}}</v-chip>
             </v-card-actions>
        </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>