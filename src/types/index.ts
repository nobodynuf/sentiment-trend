
export interface Subreddit {
    analysis: {[key: string] : number}
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
    analysis: {[key: string] : number}
    id: string
    name: string
    icon_img: string
    n_entries: number
    submissions: RedditSub[]
}

export interface TwitterUser {
    analysis: {[key: string] : number}
    id: string
    name: string
    location: string
    description: string
    url: string
    verified: string
    tweets_counts: number
    tweets: Tweet[]
}

export interface Hashtag {
    analysis: {[key: string] : number}
    name: string
    tweets: Tweet[]
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