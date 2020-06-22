<template>
  <v-layout wrap>
    <v-flex class="text-center"> 
      <v-chip small tile label text-color="white" color="amber darken-1">0% - 25%</v-chip>
      <v-chip small tile label text-color="white" color="orange darken-1">26% - 50%</v-chip>
      <v-chip small tile label text-color="white" color="orange darken-4">51% - 75%</v-chip>
      <v-chip small tile label text-color="white" color="red darken-3">76% - 100%</v-chip>
      </v-flex>
    <v-flex xs12>      
      <v-data-table
        :items="table.data"
        :headers="table.headers"
        :items-per-page="5"
        :footer-props="{
                  'itemsPerPageText' : table.rowsPerPageText
              }"
        :no-data-text="table.noDataText"
      >
        <template v-slot:item.value="{item}">
          <v-chip label :color="getColor(item.value)" text-color="white">{{Math.ceil(item.value)}}%</v-chip>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>