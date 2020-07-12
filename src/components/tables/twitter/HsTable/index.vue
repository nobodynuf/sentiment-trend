<template>
  <v-layout wrap align-center fill-height justify-center>
    <v-flex xs12>
      <v-card flat>
        <v-btn-toggle v-model="toggle_exclusive" mandatory>
          <v-btn>
            <v-icon>mdi-table</v-icon>
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
          <v-btn outlined color="primary" small @click="checkDetail(item.name)">revisar</v-btn>
        </template>
      </v-data-table>
    <v-container v-if="toggle_exclusive == 1">
      <v-row >
        <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="2">
          <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
            class="pt-0 pb-3 px-2">
            <v-hover  v-slot:default="{ hover }">
              <v-card class="pa-1 pb-0" outlined 
                @click="checkDetail(item.name)"
                :class="{ 'on-hover': hover }"
              >
                  <h4 class="text-left text--secondary">{{item.name}}</h4> 
                    <v-fade-transition>
                      <v-overlay
                        opacity="0.08"
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
          <v-list-item class="text-right">
            <v-list-item-subtitle>{{itemsPerPage}} Hashtags por página</v-list-item-subtitle>
          <v-list-item-subtitle
            v-if="page != pageCount"
          >{{page*itemsPerPage - itemsPerPage+1}}-{{page*itemsPerPage}} de {{subTable.data.length}}</v-list-item-subtitle>
          <v-list-item-subtitle
            v-else
          >{{page*itemsPerPage - itemsPerPage+1}}-{{subTable.data.length}} de {{subTable.data.length}}</v-list-item-subtitle>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
    </v-flex>
      <v-dialog v-model="detail_modal" width="1140px">
        <v-layout wrap v-if="detail_modal">
          <v-flex xs12>
            <v-card outlined>
              <v-card-title v-if="hashtag">
                <v-layout wrap>
                  <v-flex xs12>
                    <span class="subtitle-1">Hashtag en detalle</span>
                    <br />
                    <span class="h3">{{hashtag.name}}</span>
                  </v-flex>
                  <v-flex xs12>
                    <v-chip label small color="primary">Tweets: {{hashtag.tweets.length}}</v-chip>
                    <v-chip label color="white">
                      <v-img width="30px" :src="emoji"></v-img>
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md class="px-0">
                  <v-layout wrap>
                    <v-flex xs7>
                    </v-flex>
                    <v-flex xs5>
                      <v-card outlined>
                        <v-card-title>Factores</v-card-title>
                        <v-card-text>
                          <factor-emo :analysis="hs_analysis"></factor-emo>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>