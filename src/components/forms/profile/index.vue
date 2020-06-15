<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card outlined>
        <v-layout wrap pa-2 justify-center>
          <v-flex xs12>
            <h1 class="text-center">
              <v-icon color="#FF4301" x-large>mdi-reddit</v-icon>Reddit
            </h1>
          </v-flex>
          <v-flex xs12>
            <v-tabs background-color="teal" dark>
              <v-tab href="#tab-1">Análisis total</v-tab>
              <v-tab-item value="tab-1">
                <v-layout wrap>
                  <v-flex xs6>
                    <v-card outlined>
                      <v-layout wrap pa-2>
                        <v-flex xs12>
                          <h3>123 Registros</h3>
                          <span class="subtitle-2 text--grey">No hay registros inválidos</span>
                        </v-flex>
                        <v-flex xs12>
                          <v-carousel cycle :show-arrows="false">
                            <v-carousel-item>
                              <pie-chart></pie-chart>
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
                      <v-card-text>
                        <v-layout wrap v-for="i in 20" :key="i" align-center>
                          <v-flex xs3>Factor {{i}}</v-flex>
                          <v-flex xs9>
                            <v-progress-linear rounded height="10px" value="70"></v-progress-linear>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <v-card outlined>
                      <v-card-text>
                        <v-data-table></v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tab-item>
              <v-tab href="#tab-2">Analizar Subreddit</v-tab>
              <v-tab-item value="tab-2">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field prepend-icon="search" label="Ingrese nombre de subreddit: "></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-card outlined>
                      <v-layout wrap pa-2>
                        <v-flex xs12>
                          <h3>0 Registros</h3>
                          <span class="subtitle-2 text--grey">No hay registros inválidos</span>
                        </v-flex>
                        <v-flex xs12>
                          <v-carousel cycle :show-arrows="false">
                            <v-carousel-item>
                              <pie-chart></pie-chart>
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
                      <v-card-text>
                        <v-layout wrap v-for="i in 20" :key="i" align-center>
                          <v-flex xs3>Factor {{i}}</v-flex>
                          <v-flex xs9>
                            <v-progress-linear rounded height="10px" value="70"></v-progress-linear>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <v-card outlined>
                      <v-card-text>
                        <v-data-table></v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tab-item>
              <v-tab href="#tab-3">Análisis Usuarios</v-tab>
              <v-tab-item value="tab-3">
                <v-layout wrap>
                  <v-flex xs6>
                    <v-card outlined>
                      <v-layout wrap pa-2>
                        <v-flex xs12>
                          <h3>123 Registros</h3>
                          <span class="subtitle-2 text--grey">No hay registros inválidos</span>
                        </v-flex>
                        <v-flex xs12>
                          <v-carousel cycle :show-arrows="false">
                            <v-carousel-item>
                              <pie-chart></pie-chart>
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
                      <v-card-text>
                        <v-layout wrap v-for="i in 20" :key="i" align-center>
                          <v-flex xs3>Factor {{i}}</v-flex>
                          <v-flex xs9>
                            <v-progress-linear rounded height="10px" value="70"></v-progress-linear>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <v-card outlined>
                      <v-card-text>
                        <v-data-table></v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tab-item>
              <v-tab href="#tab-4">Analizar Usuario</v-tab>
              <v-tab-item value="tab-4">
                <v-layout wrap>
                  <v-flex xs4 class="d-flex align-center">
                    <v-text-field prepend-icon="search" label="Ingrese nombre de usuario: "></v-text-field>
                  </v-flex>
                  <v-flex xs2 class="d-flex align-center"><v-btn depressed color="primary" small>Buscar <v-icon small right>search</v-icon> </v-btn></v-flex>
                  <v-flex xs12></v-flex>
                  <v-flex xs6>
                    <v-card outlined>
                      <v-layout wrap pa-2>
                        <v-flex xs12>
                          <h3>123 Registros</h3>
                          <span class="subtitle-2 text--grey">No hay registros inválidos</span>
                        </v-flex>
                        <v-flex xs12>
                          <v-carousel cycle :show-arrows="false">
                            <v-carousel-item>
                              <pie-chart></pie-chart>
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
                      <v-card-text>
                        <v-layout wrap v-for="i in 20" :key="i" align-center>
                          <v-flex xs3>Factor {{i}}</v-flex>
                          <v-flex xs9>
                            <v-progress-linear rounded height="10px" value="70"></v-progress-linear>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12>
                    <v-card outlined>
                      <v-card-text>
                        <v-data-table></v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./index.ts' lang='ts'/>