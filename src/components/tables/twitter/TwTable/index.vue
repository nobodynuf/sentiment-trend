<template>
  <v-layout wrap align-center fill-height justify-center>
    <v-flex v-if="subTable.data.length == 0" text-center my-4>
      <v-divider></v-divider>
      <p class="my-4 text--disabled">Sin registro de Tweets</p>
      <v-divider></v-divider>
    </v-flex>
    <v-flex v-else xs12>
      <v-card flat>
        <v-btn-toggle v-model="toggle_exclusive" mandatory>
          <v-btn>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-card>
      <v-data-table 
          v-if="toggle_exclusive == 1"
          :items="subTable.data"
          :headers="subTable.headers"
          :footer-props="{
              'itemsPerPageText' : subTable.rowsPerPageText
          }"
          :no-data-text="subTable.noDataText"
      >
        <template  v-slot:[`item._actions`]="{item}">
          <v-btn outlined color="primary" small @click="checkDetail(item.id)">revisar</v-btn>
        </template>
      </v-data-table>
    <v-container v-if="toggle_exclusive == 0">
      <v-row >
        <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="4">
          <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
            class="pt-0 pb-3 px-2">
            <v-hover  v-slot:default="{ hover }">
              <v-card class="pa-1 pb-0" outlined
                :elevation="hover ? 5 : 0" 
                @click="checkDetail(item.id)"
                :class="{ 'on-hover': hover }"
              >
                <h5 class="text-left text--secondary">{{item.text}}</h5> 
                <v-divider></v-divider>
                <div class="text-left pa-0">
                  <h5>{{item.retweet_count}} Retweets
                  </h5>
                </div>
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
    <v-dialog v-model="detail_modal" scrollable persistent width="1140px">
      <v-card v-if="detail_modal" outlined>
        <v-layout>
          <v-flex xs11>
            <v-card-title v-if="tweet.text">
              <v-layout wrap>
                <v-flex xs12>
                  <span class="subtitle-1">Tweet en detalle</span>
                  <br />
                </v-flex>
                <v-flex xs12>
                  <v-chip label small color="primary" class="mr-3">ID: {{tweet.id}}</v-chip>
                  <v-chip label small color="primary">Retweets: {{tweet.retweet_count}}</v-chip>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-flex>
          <v-flex xs1 mt-7>
            <v-btn small @click="closingDialogue" fab :elevation="0" color="grey"><v-icon>mdi-window-close</v-icon></v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md class="px-0">
            <v-layout wrap>
              <v-flex xs7>
                <v-card outlined>
                  <v-card-text>
                    <v-menu
                      v-if="tweet.text"
                      v-model="menu_body"
                      offset-y
                      max-width="400px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-btn
                          @click="translate_body(tweet.text)"
                          small
                          outlined
                          fab
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon small>translate</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-text>{{translated_body}}</v-card-text>
                      </v-card>
                    </v-menu>
                    <v-markdown v-if="tweet.text">{{tweet.text}}</v-markdown>
                    <span class="body-1 font-italic" v-else>Entrada sin cuerpo</span>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs5>
                <v-card outlined min-height="420px">
                  <v-card-title>Factores<v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate>
                  </v-progress-circular></v-card-title>
                  <v-card-text>
                    <factor-emo :analysis="tw_analysis"></factor-emo>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="snackbarTime" :color="snackbarColor" v-model="snackbar">
            {{ snackbarText }}
    </v-snackbar>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>