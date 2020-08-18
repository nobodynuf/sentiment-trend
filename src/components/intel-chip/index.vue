<template>
    <div v-if="analysis && Object.keys(analysis).length > 0">
        <v-layout wrap>
            <v-flex xs12 class="text-center">
                
                <v-tooltip left>
                    <template v-slot:activator="{on}">
                        <v-chip v-on="on" label class="mr-1 mb-1">Inteligencia Emocional: {{ intel }}%</v-chip>
                    </template>
                    <span class="pre-fmt">{{ intel_desc }}</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs6 class="text-center">
                <v-tooltip left>
                    <template v-slot:activator="{on}">
                        <v-chip
                            v-on="on"
                            label
                            :color="emotional_cap_color"
                            class="white--text mr-1 mb-1"
                            >Capital Emocional: {{ emotional_capital }}%</v-chip
                        >
                    </template>
                    <span class="pre-fmt">{{ desc.emo_cap }}</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs6 class="text-center">
                <v-tooltip left>
                    <template v-slot:activator="{on}">
                        <v-chip
                            v-on="on"
                            label
                            :color="relational_cap_color"
                            class="white--text px-5 mr-1 mb-1"
                            >Capital Relacional: {{ relational_capital }}%</v-chip
                        >
                    </template>
                    <span class="pre-fmt">{{ desc.rel_cap }}</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs3 class="text-center">
                <v-tooltip left>
                    <template v-slot:activator="{on}">
                        <v-chip v-on="on" label :color="ce_color" class="white--text mr-1 mb-1"
                            >CE: {{ ce_index }}%</v-chip
                        >
                    </template>
                    <span class="pre-fmt">{{ desc.ce }}</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs3 class="text-center">
                <v-tooltip left>
            <template v-slot:activator="{on}">
                <v-chip v-on="on" label :color="ae_color" class="white--text mr-1 mb-1"
                    >AE: {{ ae_index }}%</v-chip
                >
            </template>
            <span class="pre-fmt">{{ desc.ae }}</span>
        </v-tooltip>
            </v-flex>
            <v-flex xs3 class="text-center">
                <v-tooltip left>
            <template v-slot:activator="{on}">
                <v-chip v-on="on" label :color="cs_color" class="white--text mr-1 mb-1"
                    >CS: {{ cs_index }}%</v-chip
                >
            </template>
            <span class="pre-fmt">{{ desc.cs }}</span>
        </v-tooltip>
            </v-flex>
            <v-flex xs3 class="text-center">
                <v-tooltip left>
            <template v-slot:activator="{on}">
                <v-chip v-on="on" label :color="rs_color" class="white--text mr-1 mb-1"
                    >RS: {{ rs_index }}%</v-chip
                >
            </template>
            <span class="pre-fmt">{{ desc.rs }}</span>
        </v-tooltip>
            </v-flex>
        </v-layout>

        
        
        
    </div>
</template>
<script src="./index.ts" lang="ts" />
<style scoped>
.pre-fmt {
    white-space: pre;
}
</style>
