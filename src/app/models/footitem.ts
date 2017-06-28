export class CalendarFoodPortion {
    constructor(
        public id: number,
        public foodItem_FIID: number,
        public fid: string,
        public title: string,
        public className: string,
        public quantity: number,
        public start: string,
        public kcal: number,
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
        public quantity?: number,
    ) { }
}
export class FoodPortionDTO {
    constructor(
        public FPID: number,
        public quantity: number,
        public foodItem_FIID : number,
        public sunday: boolean,
        public monday: boolean,
        public tuesday: boolean,
        public wednesday: boolean,
        public thursday: boolean,
        public friday: boolean,
        public saturday: boolean,
        public className: string,
        public timeOfDay: string
    ) { }
}
export class FoodPortionSum {
    constructor(
        public id: number,
        public fid: string,
        public carbohydrateSum: number,
        public colestrolSum: number,
        public fatSum: number,
        public fiberSum: number,
        public kcalSum: number,
        public proteinSum: number,
        public saturatedFatSum: number,
        public unsaturatedFatSum: number,
        public waterSum: number,
        public addedSugarSum: number,
        public grams?: number
    ) { }
}