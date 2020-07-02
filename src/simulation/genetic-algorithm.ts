import * as interfaces from "@/interfaces/interfaces";

const kNumber = 4;

const firstState: interfaces.Position[] = [];
const secondState: interfaces.Position[] = [];
const firstIndiState: interfaces.Position[] = [];
const secondIndiState: interfaces.Position[] = [];

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
    secondIndiState.push({
        x: i,
        y: kNumber - i + 1,
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
    fitnessValue: 14,
    parents: [firstParent, secondParent],
};

const secondIndividual: interfaces.Individual = {
    state: secondIndiState,
    fitnessValue: 10,
    parents: [secondParent, firstIndividual],
};

export const generations: interfaces.Generation[] = [];

generations.push({
    individuals: [firstParent, secondParent],
});

generations.push({
    individuals: [firstIndividual],
});

generations.push({
    individuals: [secondIndividual],
});

