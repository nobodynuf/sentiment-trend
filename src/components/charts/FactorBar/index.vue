<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-card class="elevation-0">
                <v-card-text>
                    <v-select
                        v-model="selected"
                        :label="label"
                        :items="factors"
                        return-object
                        item-text="val"
                    ></v-select>
                    <column-chart :data="chartdata"></column-chart>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script src="./index.ts" lang="ts" />
