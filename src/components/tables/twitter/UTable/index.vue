<template>
  <v-layout wrap align-center fill-height justify-center>
    <v-flex xs12>
      <v-card flat>
        <v-btn-toggle v-model="toggle_exclusive" mandatory>
          <v-btn>
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-card>
      <v-data-table v-if="toggle_exclusive == 0"
          :items="subTable.data"
          :headers="subTable.headers"
          :footer-props="{
              'itemsPerPageText' : subTable.rowsPerPageText
          }"
          :no-data-text="subTable.noDataText"
      >
          <template  v-slot:item._actions="{item}">
            <v-btn  color="primary" small @click="setUser(item.id)">revisar</v-btn>
          </template>
      </v-data-table>
      <v-container v-if="toggle_exclusive == 1" class="px-0">
        <v-row class="px-0">
          <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="3">
            <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
                class="pt-0 pb-3 px-2">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 3 : 0"
                  outlined
                  @click="setUser(item.id)"
                  :class="{ 'on-hover': hover }"
                >
                  <h4 class="text-start pl-3 pt-2 pb-0">{{item.name}}</h4>  
                  <v-card-text class="caption pl-3 py-0 px-2">{{item.description}}</v-card-text>      
                  <v-fade-transition>
                    <v-overlay
                      opacity="0.09"
                      v-if="hover"
                      absolute
                      color="primary"
                    >
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
          </v-col>
          <v-col  cols="4">
            <v-pagination  v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
          </v-col>
          <v-col cols="4">
            <v-list-item class="text-right">
              <v-list-item-subtitle>{{itemsPerPage}} Entradas por página</v-list-item-subtitle>
              <v-list-item-subtitle v-if="page != pageCount">
                {{page*itemsPerPage - itemsPerPage+1}}-{{page*itemsPerPage}} de {{subTable.data.length}}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                {{page*itemsPerPage - itemsPerPage+1}}-{{subTable.data.length}} de {{subTable.data.length}}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
      </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>