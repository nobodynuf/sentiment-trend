
export interface Subreddit {
    analysis: Analysis
    id: string
    description: string
    name: string
    over18: boolean
    subscribers: number
    n_entries: number
    submissions: RedditSub[]
};

export interface RedditSub {
    id: string
    name: string
    n_comments: number
    text: string
}

export interface RedditUser {
    analysis: Analysis
    id: string
    name: string
    icon_img: string
    n_entries: number
    submissions: RedditSub[]
}

export interface TwitterUser {
    id: string
    name: string
    location: string
    description: string
    url: string
    verified: string
    tweets_counts: number
    tweets: Tweet[]
    n_entries: number
    analysis: Analysis
}

export interface Hashtag {
    name: string
    tweets: Tweet[]
    n_entries: number
    analysis: Analysis
}

export interface Tweet {
    id: string
    retweeted: boolean
    possibly_sensitive: boolean
    retweet_count: number
    text: string
}

export interface Analysis {
    [key:string]: number
}

export interface DataTableHeader<T> {
    text: string,
    align?: 'left' | 'center' | 'right',
    sortable?: boolean,
    value: keyof T | "" | "_actions"
}

export class DataTable<T>{
    dialog: boolean
    search?: string
    headers: DataTableHeader<T>[]
    pagination?: any
    totalItems?: number
    data: T[]
    selectedItem?: T | T[]
    rowsPerPageText?: string
    noDataText?: string
    mode?: 'ADD' | 'EDIT' | 'DELETE'

    constructor({ headers, noDataText, rowsPerPageText }: { headers: DataTableHeader<T>[], noDataText?: string, rowsPerPageText?: string }) {
        this.dialog = false;
        this.search = '';
        this.headers = headers;
        this.pagination = null;
        this.totalItems = 0;
        this.data = [];
        this.selectedItem = undefined;
        this.noDataText = noDataText ? noDataText : 'Sin Registros';
        this.rowsPerPageText = rowsPerPageText ? rowsPerPageText : 'Registros por página';
    }

}

export const factor_emoji = {
    "positive" : "😀",
    "neutral": "😐",
    "negative": "😡"
}

export const tfactor: {[key:string] : string} = {
    asertividad : "Asertividad",
    autoconciencia_emocional : "Autoconciencia Emocional",
    //autocontrol_emocional: "Autocontrol Emocional",
    autoestima: "Autoestima",
    colaboracion_cooperacion: "Colaboración y Cooperación",
    comprension_organizativa: "Comprensión Organizativa",
    //comunicacion_asertiva: "Comunicación Asertiva",
    conciencia_critica: "Conciencia Crítica",
    //desarrollar_estimular_otros: "Desarrollar a los demás",
    desarrollar_estimular: "Desarrollar/Estimular a otros",
    empatia: "Empatía",
    liderazgo : "Liderazgo",
    manejo_conflictos: "Manejo de Conflictos",
    motivacion_logro: "Motivación de Logro",
    optimismo: "Optimismo",
    percepcion_comprension_emocional: "Percepción/Comprensión Emocional",
    relacion_social: "Relación social",
    tolerancia_frustracion: "Tolerancia a la frustración",
    violencia: "Violencia",
}