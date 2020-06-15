<template>
  <v-layout wrap align-center fill-height justify-center>
    <v-flex xs12>
      <hc-chart v-if="!loading" :options="options"></hc-chart>
      <v-card class="px-5 pt-0" outlined v-if="loading" color="white">
        <v-card-text class="d-flex justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>