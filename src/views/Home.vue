<template>
  <v-container class="home">
    <h1>Main Page</h1>
    <v-row>
      <v-col cols=6>
        <pie-chart></pie-chart>
      </v-col> 
      <v-col cols="6">
        <line-chart></line-chart>
      </v-col > 
      <v-col cols="12">
        <column-chart></column-chart>
      </v-col> 
    </v-row>
   
  </v-container>
</template>
<script src='./Home.ts' lang='ts'/>