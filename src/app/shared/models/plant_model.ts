export interface Metric {
    name: string;
    value: number;
    unit: string;
    threshold: number;
}
  
export interface Plant {
    id: number;
    name: string;
    running: boolean;
    metrics: Metric[];
}