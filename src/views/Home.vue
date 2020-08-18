<template>
    <v-container class="home">
        <v-layout wrap>
            <v-flex xs12>
                <v-card elevation="4">
                    <v-layout wrap pa-4 justify-center>
                        <v-flex xs12>
                            <h1 class="text-center">Panel de Análisis</h1>
                        </v-flex>
                        <v-flex xs2> </v-flex>
                        <v-flex xs7>
                            <file-input
                                :datatype="fileInputType"
                                @home="receivedHomeEvent"
                            ></file-input>
                        </v-flex>
                        <v-flex xs8 text-center mb-5>
                            <v-card class="elevation-3">
                                <v-layout>
                                    <v-flex xs6 mb-3>
                                        <v-list-item-title class="align-items: center ">
                                            <v-list-item-icon class="mr-0">
                                                <v-icon color="twitter" size="30px"
                                                    >mdi-twitter</v-icon
                                                >
                                            </v-list-item-icon>
                                            <v-list-item-icon>
                                                <v-img
                                                    width="80px"
                                                    src="@/assets/twitterText.png"
                                                ></v-img>
                                            </v-list-item-icon>
                                        </v-list-item-title>
                                        <v-btn-toggle
                                            v-model="toggle_twitter"
                                            color="twitter"
                                            mandatory
                                            rounded
                                        >
                                            <v-btn small outlined>Datos por defecto</v-btn>
                                            <v-btn
                                                :disabled="twitterTemplateDataDisabled"
                                                small
                                                outlined
                                                >Datos de plantilla</v-btn
                                            >
                                        </v-btn-toggle>
                                        <h4
                                            v-if="twitterTitle != ''"
                                            class="mt-4"
                                            color="grey"
                                            label
                                            outlined
                                        >
                                            {{ twitterTitle }}
                                        </h4>
                                    </v-flex>
                                    <v-flex xs6 mb-3>
                                        <v-list-item-title class="align-items: center ">
                                            <v-list-item-icon class="mr-0">
                                                <v-icon color="reddit" size="30px"
                                                    >mdi-reddit</v-icon
                                                >
                                            </v-list-item-icon>
                                            <v-list-item-icon>
                                                <v-img
                                                    width="60px"
                                                    src="@/assets/redditText.png"
                                                ></v-img>
                                            </v-list-item-icon>
                                        </v-list-item-title>
                                        <v-btn-toggle
                                            v-model="toggle_reddit"
                                            color="reddit"
                                            mandatory
                                            rounded
                                        >
                                            <v-btn small outlined>Datos por defecto</v-btn>
                                            <v-btn
                                                :disabled="redditTemplateDataDisabled"
                                                small
                                                outlined
                                                >Datos de plantilla</v-btn
                                            >
                                        </v-btn-toggle>
                                        <h4
                                            v-if="redditTitle != ''"
                                            class="mt-4"
                                            color="grey"
                                            label
                                            outlined
                                        >
                                            {{ redditTitle }}
                                        </h4>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 text-center>
                            <v-layout>
                                <v-flex xs6 class="mr-4 ml-0">
                                    <v-card outlined>
                                        <v-card-text>
                                            <intel-chip :analysis="twitter_analysis"></intel-chip>
                                        </v-card-text>
                                    </v-card>
                                    <v-card outlined class="mt-2">
                                        <factor-chart
                                            :title="'Manifestación Emocional por Hashtag'"
                                            :data="hashtag_split_data"
                                        ></factor-chart>
                                    </v-card>
                                    <v-card class="mt-2" outlined>
                                        <pie-chart :data="hashtag_pie_analysis"></pie-chart>
                                    </v-card>
                                </v-flex>
                                <v-flex xs6 class="ml-4 mr-0">
                                    <v-card outlined>
                                        <v-card-text>
                                            <intel-chip :analysis="reddit_analysis"></intel-chip>
                                        </v-card-text>
                                    </v-card>
                                    <v-card outlined class="mt-2">
                                        <factor-chart
                                            :title="'Manifestación Emocional por Subreddit'"
                                            :data="subreddit_split_data"
                                        ></factor-chart>
                                    </v-card>
                                    <v-card class="mt-2" outlined>
                                        <pie-chart :data="subreddit_pie_analysis"></pie-chart>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script src="./Home.ts" lang="ts" />
