import { Fencer, Club, HemaEvent, Fight, FightResult } from './types'

export const fencer1Club: Club = {
    name: "Schwabenfedern",
    city: "Ulm",
    website: "http://www.schwabenfedern.de/",
    facebook: "https://www.facebook.com/Schwabenfedern/",
    fighterCount: 16,
    clubid: 278
}
export const fencer1: Fencer = {
    name: "Alexander Fürgut",
    nationality: "DE",
    rank: 143,
    rating: 1623.8,
    wins: 35,
    losses: 16,
    draws: 1,
    userid: 3528
}

export const fencer1Events: Array<HemaEvent> = [
    { name: "Flügelschlag Stuttgart 2019 (September 2019)", fightCount: 5, winToLossRatio: 4 / 1 },
    { name: "European Games Invitational Gala Tournament 2019 (June 2019)", fightCount: 4, winToLossRatio: 1 / 3 },
    // "Frühlingsfechten 2019 (April 2019)",
    // "Swordtrip - The Gathering 2019 (April 2019)",
    // "Dürer Turnier 2019 (March 2019)",
    // "Treffen Historischer Fechter Deutschlands 2018 (June 2018)",
    // "Swordtrip - the Gathering 2018 (April 2018)",
    // "Swordfish 2017 (November 2017)"
]

export const fencer2Club: Club = {
    name: "Twerchhau e. V.",
    city: "Berlin",
    website: "https://twerchhau.de/",
    facebook: "https://www.facebook.com/Twerchhau-eV-Historisches-Fechten-Berlin-554652537889326/",
    fighterCount: 8,
    clubid: 659
}
export const fencer2: Fencer = {
    name: "Tom Tempel",
    nationality: "DE",
    rank: 509,
    rating: 1450.6,
    wins: 34,
    losses: 21,
    draws: 3,
    userid: 5602
}

export const fencer2Events: Array<HemaEvent> = [
    { name: "9. Dresdner Fechtschul 2019 (September 2019)", fightCount: 4, winToLossRatio: 2 / 2 },
    { name: "Frühlingsfechten 2019 (April 2019)", fightCount: 5, winToLossRatio: 0 / 5 },
    // "6. Herkules HEMA Turnier Kassel (October 2019)",
    // "Frühlingsfechten 2019 (April 2019)",
    // "Swordtrip - The Gathering 2019 (April 2019)",
    // "Dürer Turnier 2019 (March 2019)",
    // "5. offenes Fechtturnier in Kassel (October 2018)",
    // "8. Dresdner Fechtschul (September 2018)",
    // "Frühlingsfechten 2018 (April 2018)",
    // "Swordtrip - the Gathering 2018 (April 2018)",
    // "4. offenes Fechtturnier in Kassel (November 2017)",
    // "Vasaslaget 2015 (March 2015)"
]

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