export interface Position {
    x: number;
    y: number;
}

export interface Conflict {
    position: Position;
    value: number;
}

export interface Step {
    conflicts: Array<Conflict>;
    queen: number;
    destination: Position;
}

