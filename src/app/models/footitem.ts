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
export class FoodItem {
    constructor(
        public FIID: number,
        public name: string,
        public carbohydrate: number,
        public colestrol: number,
        public fat: number,
        public fiber: number,
        public kcal: number,
        public protein: number,
        public saturatedFat: number,
        public unsaturatedFat: number,
        public water: number,
        public addedSugar: number,
        public suppliment?: boolean,
        public grams?: number,
    ) { }
}
export class FoodPortionSum {
    constructor(
        public carbohydrateSum: number,
        public colestrolSum: number,
        public fatSum: number,
        public fiberSum: number,
        public kcalSum: number,
        public proteinSum: number,
        public saturatedFatSum: number,
        public unsaturatedFatSum: number,
        public waterSum: number,
        public addedSugarSum: number
    ) { }
}