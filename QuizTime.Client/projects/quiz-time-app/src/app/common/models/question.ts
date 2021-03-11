export class Question {
    public constructor(
        public id: number,
        public content: string,
        public answer: string,
        public category: string,
        public isAnswered?: boolean,
        public possibleAnswers: string[] = []
    ) { }
}
