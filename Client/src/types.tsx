
export interface Club {
    name: string,
    city: string,
    website?: string,
    facebook?: string,
    fighterCount: number,
    clubid: number
}
export interface HemaEvent {
    name: string,
    fightCount: number,
    winToLossRatio: number
}
export interface Fencer {
    name: string,
    nationality: string,
    clubName: string,
    rank: number,
    rating: number,
    wins: number,
    losses: number,
    draws: number,
    userid: number
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