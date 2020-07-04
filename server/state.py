from __future__ import annotations
from typing import Generic, Dict
from constraint import V, D


class State(Generic[V, D]):
    def __init__(self, assignment: Dict[V, D]) -> None:
        self.assignment: Dict[V, D] = assignment

    def next_state(self, variable: V, value: D) -> State[V, D]:
        return State({**self.assignment, variable: value})

    def __eq__(self, other) -> bool:
        return self.assignment == other.assignment
