import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'

export const fencer1Club: Club = {
    name: "Schwabenfedern",
    city: "Ulm",
    website: "http://www.schwabenfedern.de/",
    facebook: "https://www.facebook.com/Schwabenfedern/",
    fighterCount: 16,
    clubid: 278
}

export const fencer2Club: Club = {
    name: "Twerchhau e. V.",
    city: "Berlin",
    website: "https://twerchhau.de/",
    facebook: "https://www.facebook.com/Twerchhau-eV-Historisches-Fechten-Berlin-554652537889326/",
    fighterCount: 8,
    clubid: 659
}

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