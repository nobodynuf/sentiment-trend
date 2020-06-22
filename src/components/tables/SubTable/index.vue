<template>
    <v-layout wrap align-center fill-height justify-center>
        <v-flex xs12>
            <v-card outlined>
                <v-card-text>
                    <v-data-table
                        :items="submissions"
                        :headers="subTable.headers"
                        :footer-props="{
                            'itemsPerPageText' : subTable.rowsPerPageText
                        }"
                        :no-data-text="subTable.noDataText"
                    >
                        <template v-slot:item._actions="{item}">
                            {{item.id}}
                        <v-btn outlined color="indigo" small @click="checkDetail(item.id)">revisar</v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
    <v-dialog v-model="detail_modal" width="1140px">
      <v-layout wrap v-if="submission">
        <v-flex xs12>
          <v-card outlined>
            <v-card-title v-if="submission.name">
              <v-layout wrap>
                <v-flex xs12>
                  <span class="subtitle-1">Entrada de Subreddit</span>
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