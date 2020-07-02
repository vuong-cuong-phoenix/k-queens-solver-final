export interface Position {
    x: number;
    y: number;
}

export interface Conflict {
    position: Position;
    value: number;
}

export interface Step {
    conflicts: Conflict[];
    queen: number;
    destination: Position;
}

export interface Individual {
    state: Position[];
    fitnessValue: number;
    parents: [Individual, Individual] | [];
}

export interface Generation {
    individuals: Individual[];
}

