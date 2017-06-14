export class CalendarTraining {
    constructor(
        public id: number,
        public exercise_EID: number,
        public title: string,
        public className: string,
        public dow: number[],
        public start?: any,
        public reps?: number,
        public sets?: number,
        public duration?: number,
        public rest?: number
    ) { }
}
export class TrainingDTO {
    constructor(
        public exercise_EID: number,
        public className: string,
        public sunday: boolean,
        public monday: boolean,
        public tuesday: boolean,
        public wednesday: boolean,
        public thursday: boolean,
        public friday: boolean,
        public saturday: boolean,
        public timeOfDay?: string,
        public numberOfReps?: number,
        public numberOfSets?: number,
        public durationMin?: number,
        public restBetweenMin?: number,
    ) { }
}