export class Result {
    public constructor(
        public chartLabels: string[],
        public chartData: number[],
        public chartType: string,
        public colors: { backgroundColor: string[]; }[]
    ) { }
}