<template>
    <v-layout wrap> 
        <v-flex xs9>
            <v-card-title>Perfil de {{twitterUser.name}}</v-card-title>
            <v-card-actions>
            <v-chip class="mr-1" tile label>ID: {{twitterUser.id}}</v-chip>
            <v-chip tile label>Tweets Analizados: {{nEntries}}</v-chip>
             </v-card-actions>
        </v-flex>
        <v-flex xs3>
          <v-img v-if="twitterUser.url"
            :src="twitterUser.url"
          ></v-img>
        </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>