<template>
  <v-layout wrap>
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
          <v-chip label color="primary">{{Math.ceil(item.value)}}%</v-chip>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>