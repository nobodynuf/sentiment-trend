<template>
  <v-layout wrap>
    <v-flex v-if="table.data.length != 0" class="text-left pr-5"> 
      <v-chip small tile label text-color="white" :color="color0_25" class="mr-2">0% - 25%</v-chip>
      <v-chip small tile label text-color="white" :color="color26_50" class="mr-2">26% - 50%</v-chip>
      <v-chip small tile label text-color="white" :color="color51_75" class="mr-2">51% - 75%</v-chip>
      <v-chip small tile label text-color="white" :color="color76_100">76% - 100%</v-chip>
      </v-flex>
    <v-flex xs12>      
      <v-data-table
        :items="table.data"
        :headers="table.headers"
        :items-per-page="4"
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