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
            @keyup="onSearchChange"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn
            depressed
            small
            color="primary"
            class="white--text"
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
            <v-carousel :show-arrows="true">
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
      <v-card outlined v-if="user" class="mb-3">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">Perfil de {{user.name}}</v-card-title>
            <v-card-subtitle class="mt-1">
              <v-chip label class="mr-2 mt-2" >ID: {{user.id}}</v-chip>
              <v-chip label v-if="user.is_gold" class="mr-2 mt-2" color="amber" >Gold</v-chip>
              <v-chip label v-if="user.is_mod" class="mr-2 mt-2" color="blue lighten-2">Moderador</v-chip>
              <v-chip label class="mt-2">Entradas analizadas: {{n_entries}}</v-chip>
            </v-card-subtitle>
          </div>
          <v-avatar class="ma-5" size="75">
            <v-img :src="user.icon_img"></v-img>
          </v-avatar>
        </div>
      </v-card>
      <v-card outlined>
        <v-card-title>Factores</v-card-title>
        <v-card-text v-if="enabledSub">
          <factor-emo :analysis="analysis"></factor-emo>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card outlined>
        <v-card-title>Publicaciones</v-card-title>
        <v-card-text v-if="enabledSub">
          <SubTable :submissions="user.submissions"></SubTable>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>