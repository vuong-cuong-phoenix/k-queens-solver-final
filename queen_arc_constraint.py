from typing import Dict, List

from constraint import Constraint, V, D


class QueenArcConstraint(Constraint[int, int]):

    def __init__(self, q1: int, q2: int) -> None:
        super().__init__([q1, q2])
        self.q1 = q1
        self.q2 = q2

    def is_satisfied(self, assignment: Dict[int, int]) -> bool:
        if assignment.get(self.q1) is not None and assignment.get(self.q2) is not None:
            col1, col2, row1, row2 = self.q1, self.q2, assignment[self.q1], assignment[self.q2]
            if row1 == row2:
                return False
            if abs(row2 - row1) == abs(col2 - col1):
                return False
        return True

    def get_conflicted(self, assignment: Dict[int, int]) -> List[V]:
        if not self.is_satisfied(assignment):
            return [self.q1, self.q2]
        return []
