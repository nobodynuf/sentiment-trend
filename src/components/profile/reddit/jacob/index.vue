<template>
  <v-card outlined>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs6 align-self-center>
          <v-text-field
            :disabled="loading"
            v-model="user_input"
            label="Busca un usuario en Reddit:"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-btn :loading="loading" align-self-center outlined @click="searchUser">
            Buscar
            <v-icon right small>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 v-if="has_request">
          <v-layout wrap>
            <v-flex xs6>
              <v-card outlined>
                <v-img height="300" :src="profile.icon"></v-img>
                
                <v-card-title>
                    {{profile.username}}
                    <v-chip color="black" text-color="white" label class="ml-3">{{profile.user_id}}</v-chip>
                    <v-chip v-if="profile.is_mod" color="teal" text-color="white" label class="ml-3">Moderador</v-chip>
                    <v-chip v-if="profile.is_employee" color="amber" text-color="white" label class="ml-3">Moderador</v-chip>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs6 pl-3>
              <v-card outlined>
                <v-card-title>
                  Actitud positiva
                  <v-chip
                    class="ml-3"
                    :color="chip_color.positivism"
                    label
                  >{{profile.factors.positivism.polarity}}%</v-chip>
                  
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-layout wrap align-center>
                    <v-flex xs3>
                      <span class="body-1">Positivo</span>
                    </v-flex>
                    <v-flex xs8>
                      <v-progress-linear
                        rounded
                        color="light-green lighten-1"
                        v-model="profile.factors.positivism.indexes.positive"
                        height="25"
                        reactive
                      >
                        <strong>{{ Math.ceil(profile.factors.positivism.indexes.positive, 2) }}%</strong>
                      </v-progress-linear>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs3 mt-2>
                      <span class="body-1">Negativo</span>
                    </v-flex>
                    <v-flex xs8 mt-2>
                      <v-progress-linear
                        rounded
                        color="red lighten-1"
                        v-model="profile.factors.positivism.indexes.negative"
                        height="25"
                        reactive
                      >
                        <strong>{{ Math.ceil(profile.factors.positivism.indexes.negative, 2) }}%</strong>
                      </v-progress-linear>
                    </v-flex>
                    <v-flex xs1></v-flex>
                    <v-flex xs3 mt-2>
                        <span class="body-1">Neutral</span>
                    </v-flex>
                    <v-flex xs8 mt-2>
                      <v-progress-linear
                        rounded
                        color="amber"
                        v-model="profile.factors.positivism.indexes.neutral"
                        height="25"
                        reactive
                      >
                        <strong>{{ Math.ceil(profile.factors.positivism.indexes.neutral, 2) }}%</strong>
                      </v-progress-linear>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-card class="mt-5" outlined>
                  <v-card-title>
                  Regulación Emocional
                  <v-chip
                    class="ml-3"
                    :color="chip_color.emo_reg"
                    label
                  >{{emo_reg_text}}</v-chip>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex xs3 mt-2>
                        <span class="body-1">Objetividad</span>
                    </v-flex>
                    <v-flex xs8 mt-2>
                      <v-progress-linear
                        rounded
                        color="indigo"
                        v-model="profile.factors.emotional_regulation.object_index"
                        height="25"
                        reactive
                      >
                        <strong>{{ Math.ceil(profile.factors.emotional_regulation.object_index, 2) }}%</strong>
                      </v-progress-linear>
                    </v-flex>
                    </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script src='./index.ts' lang='ts'/>