import type { IHall } from "../types"

export class Hall implements IHall {
    id: number
    name: string
    seatMapTemplate: string

    constructor(id: number, name: string, seatMapTemplate: string) {
        this.id = id
        this.name = name
        this.seatMapTemplate = seatMapTemplate
    }
}
