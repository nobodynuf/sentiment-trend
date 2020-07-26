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
      <v-data-table 
          v-if="toggle_exclusive == 0"
          :items="subTable.data"
          :headers="subTable.headers"
          :footer-props="{
              'itemsPerPageText' : subTable.rowsPerPageText
          }"
          :no-data-text="subTable.noDataText"
      >
        <template  v-slot:item._actions="{item}">
          <v-btn outlined color="primary" small @click="setHashtag(item.name)">revisar</v-btn>
        </template>
      </v-data-table>
    <v-container v-if="toggle_exclusive == 1">
      <v-row >
        <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="2">
          <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
            class="pt-0 pb-3 px-2">
            <v-hover  v-slot:default="{ hover }">
              <v-card class="pa-1 pb-0"
                :elevation="hover ? 5 : 0" 
                outlined 
                @click="setHashtag(item.name)"
                :class="{ 'on-hover': hover }"
              >
                  <h4 class="text-left text--secondary">{{item.name}}</h4> 
                    <v-fade-transition>
                      <v-overlay
                        opacity="0.055"
                        v-if="hover"
                        absolute
                        color="black"
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
          <v-list-item class="pt-1">
              <p  class="pl-0 caption">{{itemsPerPage}} Entradas por página</p >
              <p  class="pl-5 caption" v-if="page != pageCount">
                {{page*itemsPerPage - itemsPerPage+1}}-{{page*itemsPerPage}} de {{subTable.data.length}}
              </p >
              <p  class="pl-5 caption"  v-else>
                {{page*itemsPerPage - itemsPerPage+1}}-{{subTable.data.length}} de {{subTable.data.length}}
              </p>
            </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>