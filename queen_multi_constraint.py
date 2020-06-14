from typing import Dict, List

from constraint import Constraint, V, D


class QueenMultiConstraint(Constraint[int, int]):

    def __init__(self, columns: List[int]) -> None:
        super().__init__(columns)
        self.columns: List[int] = columns

    def is_satisfied(self, assignment: Dict[int, int]) -> bool:
        for col1, row1 in assignment.items():
            for col2 in range(col1 + 1, len(self.columns)):
                if col2 in assignment:
                    row2: int = assignment[col2]
                    if row1 == row2:
                        return False
                    if abs(row2 - row1) == abs(col2 - col1):
                        return False
        return True

    def get_conflicted(self, assignment: Dict[int, int]) -> List[int]:
        conflicted_variable: List[int] = []
        for col1, row1 in assignment.items():
            for col2 in range(col1 + 1, len(self.columns)):
                if col2 in assignment:
                    row2: int = assignment[col2]
                    if row1 == row2 or abs(row2 - row1) == abs(col2 - col1):
                        conflicted_variable.extend([col1, col2])
        return list(set(conflicted_variable))
