<template>
    <v-layout  wrap>
        <v-flex xs12>
            <div>
            <v-card class="elevation-5">
                <v-card-title>
                    <v-select
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
