<template>
    <v-layout wrap=""> 
        <v-flex xs12>
        <v-layout wrap align-center>
            <v-flex xs4>
              <v-text-field
                  prepend-icon="search"
                  v-model="search_input"
                  label="Ingrese nombre de Usuario: "
                  :disabled="loading"
                  @keyup="onSearchChange"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
            <v-btn
                depressed
                small
                color="primary"
                :disabled="voidTextFiel"
                :loading="loading"
                @click="findUser"
            >
                Buscar
                <v-icon small right>search</v-icon>
            </v-btn>
            </v-flex>
        </v-layout>
        </v-flex>   
           <v-flex xs7>
      <v-card outlined>
        <v-layout wrap pa-2>
          <v-flex xs12>
            <v-carousel show-arrows-on-hover>
              <v-carousel-item>
                <pie-chart :loading="loading" :data="pie_analysis"></pie-chart>
              </v-carousel-item>
              <v-carousel-item>
                <line-chart></line-chart>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs5>
      <v-layout wrap>
        <v-flex v-if="enabledUser" xs12>
          <v-card outlined>
            <TwUserProfile :twitterUser="user" :nEntries="n_entries"></TwUserProfile>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card outlined>
            <v-card-title>Factores
              <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate>
              </v-progress-circular>
            </v-card-title>
            <v-card-text>
              <factor-emo :analysis="analysis"></factor-emo>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>       
    <v-flex xs12>
     <v-card  outlined>
        <v-card-title>Tweets
          <v-progress-circular v-if="loading" class="ml-3" size="30" width="2" indeterminate>
          </v-progress-circular>
        </v-card-title>
        <v-card-text v-if="enabledUser">
           <tw-table :tweets="user.tweets"></tw-table>
        </v-card-text>
      </v-card>
    </v-flex>
    </v-layout>
</template>
<script src='./index.ts' lang='ts'/>