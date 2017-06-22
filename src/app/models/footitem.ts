export class CalendarFoodPortion {
    constructor(
        public id: number,
        public title: string,
        public className: string,
        public grams: number,
        public start: Date,
        public dow?: number[]
    ) { }
}