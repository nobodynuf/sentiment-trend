<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout wrap align-center>
        <v-flex xs6>
          <v-text-field
            prepend-icon="search"
            v-model="search_input"
            label="Ingrese nombre de Usuario: "
            :disabled="loading"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn
            depressed
            small
            color="primary"
            :disabled="loading"
            :loading="loading"
            @click="findUser"
          >
            Buscar
            <v-icon small right>search</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs6>
      <v-card outlined>
        <v-layout wrap pa-2>
          <v-flex xs12>
            <img height="50px" width="50px" :src="iconImg" />
          </v-flex>
          <v-flex xs12>
            <v-carousel :show-arrows="false">
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
    <v-flex xs6>
      <v-card outlined>
        <v-card-title>Factores</v-card-title>
        <v-card-text v-if="enabledSub">
          <factor-emo :analysis="analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-card outlined>
        <v-card-title>Publicaciones</v-card-title>
        <v-card-text v-if="enabledSub">
          <SubTable :submissions="user.submissions"></SubTable>
        </v-card-text>
      </v-card>
    
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>