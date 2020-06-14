import getopt
import sys
from typing import List, Tuple, Dict, Optional

from csp import CSP
from min_conflict import MinConflict
from queen_arc_constraint import QueenArcConstraint
from state import State


def main(argv: List[str]) -> None:
    size: int = 0
    try:
        opts: List[Tuple[str, str]]
        args: List[str]
        opts, args = getopt.getopt(argv, 'hs:', ['size='])
    except getopt.GetoptError:
        print('queens.py -s <size>')
        sys.exit(2)

    opt: str
    arg: str
    for opt, arg in opts:
        if opt == '-h':
            print('queens.py -s <size>')
            sys.exit(2)
        elif opt in ('-s', '--size'):
            try:
                size = int(arg)
            except ValueError:
                print('Error: size must be int. queens.py -s <size>')
                sys.exit(2)
    columns: List[int] = list(range(size))
    rows: Dict[int, List[int]] = {}
    for column in columns:
        rows[column] = list(range(size))
    csp: CSP[int, int] = CSP(columns, rows)
    for i in range(len(columns) - 1):
        for j in range(i+1, len(columns)):
            csp.add_constraint(QueenArcConstraint(i, j))
    min_conflict: MinConflict[int, int] = MinConflict(csp, State[int, int]({i: 0 for i in range(size)}), 1000)
    solution: Optional[State[int, int]] = min_conflict.solve()
    if solution is None:
        print("No solution found!")
    else:
        print(solution.assignment)


if __name__ == "__main__":
    main(sys.argv[1:])
