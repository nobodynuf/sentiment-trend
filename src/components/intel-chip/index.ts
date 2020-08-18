import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import {$debug} from "@/utils"
import {Analysis} from "@/types"

@Component
export default class IntelChip extends Vue {
    @Prop()
    analysis!: Analysis

    readonly factor0_19 = "factor0_19"
    readonly factor20_39 = "factor20_39"
    readonly factor40_59 = "factor40_59"
    readonly factor60_79 = "factor60_79"
    readonly factor80_100 = "factor80_100"

    criteriaTable = [
        {percentage: "0% a 19%", criterion: "Crítico", color: "factor0_19"},
        {percentage: "20% a 39%", criterion: "Insuficiente", color: "factor20_39"},
        {percentage: "40% a 59%", criterion: "Regular", color: "factor40_59"},
        {percentage: "60% a 79%", criterion: "Suficiente", color: "factor60_79"},
        {percentage: "80% a 100%", criterion: "Excelente", color: "factor80_100"},
    ]

    getColor(value: number) {
        if (value > 79) return this.factor80_100
        else if (value > 59) return this.factor60_79
        else if (value > 39) return this.factor40_59
        else if (value > 19) return this.factor20_39
        else return this.factor0_19
    }

    keys = {
        ce: ["asertividad", "autoconciencia_emocional", "autoestima"],
        ae: ["tolerancia_frustracion", "motivacion_logro", "optimismo"],
        cs: [
            "comprension_organizativa",
            "empatia",
            "percepcion_comprension_emocional",
            "relacion_social",
        ],
        rs: [
            "colaboracion_cooperacion",
            "desarrollar_estimular",
            "conciencia_critica",
            "liderazgo",
            "manejo_conflictos",
            "violencia",
        ],
    }

    desc = {
        ce: `[CE] Autoconciencia Emocional
Factores: 
    → Asertividad
    → Autoconciencia Emocional
    → Autoestima
[CE] = Promedio(Factores)`,
        ae: `[AE] Autorregulación Emocional
Factores:
    → Tolerancia a la Frustracion
    → Motivación al Logro
    → Optimismo
[AE] = Promedio(Factores)`,
        cs: `[CS] Conciencia Emocional Social
Factores:
    → Comprensión Organizativa
    → Empatía
    → Percepción y Comprensión Emocional
    → Relación Social
[CS] = Promedio(Factores)`,
        rs: `[RS] Regulación Emocional Social
Factores:
    → Colaboración y Cooperación
    → Desarrollar y Estimular a los demás
    → Conciencia Crítica
    → Liderazgo
    → Manejo de conflictos
    → Violencia
[RS] = Promedio(Factores)`,
        emo_cap: `Capital Emocional = Promedio(CE ; AE)`,
        rel_cap: `Capital Relacional = Promedio(CS ; RS)`,
    }

    mean(values: number[]): number {
        return values.reduce((a, b) => a + b, 0) / values.length
    }

    get ce_values() {
        return this.keys["ce"].map(key => this.analysis[key])
    }

    get ce_index() {
        return Math.floor(this.mean(this.ce_values))
    }

    get ce_color() {
        return this.getColor(this.ce_index)
    }

    get ae_values() {
        return this.keys["ae"].map(key => this.analysis[key])
    }

    get ae_index() {
        return Math.floor(this.mean(this.ae_values))
    }

    get ae_color() {
        return this.getColor(this.ae_index)
    }

    get cs_values() {
        return this.keys["cs"].map(key => this.analysis[key])
    }

    get cs_index() {
        return Math.floor(this.mean(this.cs_values))
    }

    get cs_color() {
        return this.getColor(this.cs_index)
    }

    get rs_values() {
        return this.keys["rs"].map(key => this.analysis[key])
    }

    get rs_index() {
        return Math.floor(this.mean(this.rs_values))
    }

    get rs_color() {
        return this.getColor(this.rs_index)
    }

    get emotional_capital() {
        return this.mean([this.ce_index, this.ae_index])
    }

    get emotional_cap_color() {
        return this.getColor(this.emotional_capital)
    }

    get relational_capital() {
        return this.mean([this.cs_index, this.rs_index])
    }

    get relational_cap_color() {
        return this.getColor(this.relational_capital)
    }

    get intel() {
        return this.mean([this.emotional_capital, this.relational_capital])
    }

    get intel_index(){
        if (this.intel > 175) return "Extremadamente Alto"
        else if (this.intel > 150) return "Excelente"
        else if (this.intel > 125) return "Muy Bueno"
        else if (this.intel > 100) return "Bueno"
        else if (this.intel > 75) return "Normal"
        else if (this.intel > 50) return "Regular"
        else if (this.intel > 25) return "Insuficiente"
        else return "Crítico"
    }

    get intel_desc(){
        return `[IE] Inteligencia Emocional
[IE] = Promedio(Capital Emocional ; Capital Relacional)

Escala:
    → [0-25] Crítico
    → [26-50] Insuficiente
    → [51-75] Regular
    → [76-100] Normal
    → [101-125] Bueno
    → [126-150] Muy Bueno
    → [151-175] Excelente
    → [176-200] Extremadamente Alto

[IE] = ${this.intel}% [${this.intel_index}]`
    }
}
