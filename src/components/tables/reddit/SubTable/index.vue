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
          <v-btn outlined color="indigo" small @click="checkDetail(item.id)">revisar</v-btn>
        </template>
      </v-data-table>
    <v-container v-if="toggle_exclusive == 1">
    <v-row >
        <v-col class="py-0 px-0" v-for="(item, index) in subTable.data"
          :key="index" cols="4">
          <v-col v-if="((index + 1)  > ((page*itemsPerPage) - itemsPerPage)) && ((index + 1) <= (page*itemsPerPage))"
            class="pt-0 pb-3 px-2">
            <v-hover  v-slot:default="{ hover }">
              <v-card class="pa-1 pb-0" outlined 
                @click="checkDetail(item.id)"
                :class="{ 'on-hover': hover }"
              >
              <h5 class="text-center text--secondary">{{item.name}}</h5> 
                  <v-divider></v-divider>
                  <div class="text-center pa-0">
                  <h5 v-if="item.n_comments !=1">{{item.n_comments}} Comentarios</h5>
                  <h5 v-else>{{item.n_comments}} Comentario</h5>
                </div>
                    <v-fade-transition>
                      <v-overlay
                        opacity="0.7"
                        v-if="hover"
                        absolute
                        color="primary"
                      >
                        <v-card-title> Ver más información</v-card-title>
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
            <v-list-item-subtitle>{{itemsPerPage}} Post por página</v-list-item-subtitle>
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
              <v-card-title v-if="submission.name">
                <v-layout wrap>
                  <v-flex xs12>
                    <span class="subtitle-1">Publicación en detalle</span>
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
                    <v-chip label small color="primary">Comentarios: {{submission.n_comments}}</v-chip>
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
                      <v-card outlined>
                        <v-card-text>
                          <v-menu
                            v-if="submission.text"
                            v-model="menu_body"
                            offset-y
                            max-width="400px"
                          >
                            <template v-slot:activator="{on, attrs}">
                              <v-btn
                                @click="translate_body(submission.text)"
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
                          <v-markdown v-if="submission.text">{{submission.text}}</v-markdown>
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