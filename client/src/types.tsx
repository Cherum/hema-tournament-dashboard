
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
    pastEvents?: any,
    opponentStatistic?: any
}