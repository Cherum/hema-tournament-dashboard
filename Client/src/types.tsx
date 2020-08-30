
export interface Fencer {
    name: string,
    nationality: string,
    clubName: string,
    clubId: number,
    rank: number,
    rating: number,
    wins: number,
    losses: number,
    draws: number,
    userid: number,
    pastEvents?: any
}

export enum FightResult {
    Win = "Win",
    Loss = "Loss",
    Draw = "Draw"
}
export interface Fight {
    eventName: string,
    fighter1: string,
    fighter2: string,
    resultForFighter1: FightResult
    resultForFighter2: FightResult
}