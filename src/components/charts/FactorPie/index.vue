<template>
    <v-layout wrap>
        <v-flex xs12>
            <div>
            <v-card>
                <v-card-title class="text--black">
                    <v-select
                        class="text--black"
                        v-model="selected"
                        :label="label"
                        :items="factors"
                        return-object
                        item-text="val"
                    ></v-select>
                      </v-card-title>
                       <v-card-text>
                    <pie-chart :title="title" :data="chartdata" ></pie-chart>
                </v-card-text>
            </v-card>
            </div>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
