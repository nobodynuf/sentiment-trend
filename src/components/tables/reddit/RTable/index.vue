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
      <v-data-table v-if="toggle_exclusive == 0"
          :items="subTable.data"
          :headers="subTable.headers"
          :footer-props="{
              'itemsPerPageText' : subTable.rowsPerPageText
          }"
          :no-data-text="subTable.noDataText"
      >
          <template  v-slot:item._actions="{item}">
            <v-btn outlined color="primary" small @click="checkDetail(item.id)">revisar</v-btn>
          </template>
      </v-data-table>
      <v-container v-if="toggle_exclusive == 1" class="px-0">
        <v-row class="px-0">
          <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="12">
            <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
                class="pt-0 pb-3 px-2">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  outlined
                  @click="checkDetail(item.id)"
                  :class="{ 'on-hover': hover }"
                >
                  <h4 class="text-start pl-3 pt-2 pb-0">{{item.name}}</h4>  
                  <v-card-text class="caption pl-3 py-0 px-2">{{item.description}}</v-card-text>      
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
      <v-dialog v-model="detail_modal" width="1140px">
        <v-layout wrap v-if="detail_modal">
          <v-flex xs12>
            <v-card outlined>
              <v-card-title v-if="submission.name">
                <v-layout wrap>
                  <v-flex xs12>
                    <span class="subtitle-1">SubReddit en detalle</span>
                    <br />
                    <span class="h3">{{submission.name}}</span>
                    <v-menu v-model="menu_title" offset-y max-width="400px">
                      <template v-slot:activator="{on, attrs}">
                        <v-btn
                          @click="translate_title(submission.name)"
                          small
                          outlined
                          fab
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon small>translate</v-icon>
                        </v-btn>
                      </template>
                      <v-card class>
                        <v-card-text>{{translated_title}}</v-card-text>
                      </v-card>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <v-chip label small color="primary" class="mr-3">ID: {{submission.id}}</v-chip>
                    <v-chip label small color="primary" class="mr-3">suscriptores: {{submission.subscribers}}</v-chip>
                    <v-chip label small color="primary">Publicaciones: {{submission.n_entries}}</v-chip>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md class="px-0">
                  <v-layout wrap>
                    <v-flex xs7>
                      <v-card outlined>
                        <v-card-text>
                          <v-menu
                            v-if="submission.description"
                            v-model="menu_body"
                            offset-y
                            max-width="400px"
                          >
                            <template v-slot:activator="{on, attrs}">
                              <v-btn
                                @click="translate_body(submission.description)"
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
                          <v-markdown v-if="submission.description">{{submission.description}}</v-markdown>
                          <span class="body-1 font-italic" v-else>Entrada sin cuerpo</span>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs5>
                      <v-card outlined>
                        <v-card-title>Factores</v-card-title>
                        <v-card-text>
                          <factor-emo :analysis="sub_analysis"></factor-emo>
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