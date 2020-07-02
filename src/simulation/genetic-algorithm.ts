import * as interfaces from "@/interfaces/interfaces";

const kNumber = 4;

const firstState: interfaces.Position[] = [];
const secondState: interfaces.Position[] = [];
const firstIndiState: interfaces.Position[] = [];

for (let i = 1; i <= kNumber; ++i) {
    firstState.push({
        x: i,
        y: i,
    });
    secondState.push({
        x: i,
        y: kNumber - i + 1,
    });
    firstIndiState.push({
        x: i,
        y: i,
    });
}

export const firstParent: interfaces.Individual = {
    state: firstState,
    fitnessValue: 14,
    parents: [],
};

export const secondParent: interfaces.Individual = {
    state: secondState,
    fitnessValue: 10,
    parents: [],
};

export const firstIndividual: interfaces.Individual = {
    state: firstIndiState,
    fitnessValue: 20,
    parents: [firstParent, secondParent],
};

