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
    choice: Position;
}

export interface Individual {
    state: Position[];
    fitnessValue: number;
    parents: [Individual, Individual] | [];
}

export interface Generation {
    individuals: Individual[];
}

export interface MinConflictPost {
    k: number;
    initState: number[];
    iteration: number;
}
