<template>
  <v-layout wrap >
    <v-flex xs12 v-if="table.data.length != 0">
      <v-layout >
        <v-flex class="pr-1" xs3 v-for="(item, i) in criteriaTable" :key="i"> 
          <v-card class="text-center white--text font-weight-bold caption" :color="item.color">
            <p>{{item.percentage}}</p>
            <p>{{item.criterion}}</p>
          </v-card>
        </v-flex>
      </v-layout>
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
        <template v-slot:[`item.value`]="{item}">
          <v-chip label :color="getColor(item.value)" text-color="white">{{Math.ceil(item.value)}}%</v-chip>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>