import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'

export const fencerFightHistory: Array<Fight> = [
    {
        eventName: "Frühlingsfechten 2019 (April 2019)",
        fighter1: "Alexander Fürgut",
        fighter2: "Tom Tempel",
        resultForFighter1: FightResult.Win,
        resultForFighter2: FightResult.Loss
    },
    {
        eventName: "Treffen Historischer Fechter Deutschlands 2018 (June 2018)",
        fighter1: "Alexander Fürgut",
        fighter2: "Tom Tempel",
        resultForFighter1: FightResult.Loss,
        resultForFighter2: FightResult.Win
    },
    {
        eventName: "Frei erfunden (June 2018)",
        fighter1: "Alexander Fürgut",
        fighter2: "Tom Tempel",
        resultForFighter1: FightResult.Win,
        resultForFighter2: FightResult.Loss
    }
]