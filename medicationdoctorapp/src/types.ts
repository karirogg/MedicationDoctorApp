export interface Cycle {
    cycle_id: number,
    date_start: Date,
    date_stop?: Date,
    medication_id: string,
    doctor_id: string
}

export interface Dose {
    dose_id: number,
    cycle_id: number,
    amount: number,
    unit: string,
    hour: string,
    minute: string,
    nth_day: number
}