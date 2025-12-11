export interface Option {
    name: string;
    value: string;
    cant?: number;
}

export interface OptionCheck extends Option{
    checked?:boolean;
}