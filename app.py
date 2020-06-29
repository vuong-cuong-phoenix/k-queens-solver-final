import json

from flask import Flask, request
from typing import List, Tuple, Dict, Optional

from csp import CSP
from min_conflict import MinConflict
from queen_arc_constraint import QueenArcConstraint
from state import State
from queen_genetic import solve

app = Flask(__name__)


@app.route('/min-conflict', methods=['POST'])
def min_conflict_solve():
    req_data = request.get_json()
    k: int = req_data['k']
    init_state: List[int] = req_data['initState']
    iteration: int = req_data['iteration']
    columns: List[int] = list(range(k))
    rows: Dict[int, List[int]] = {}
    for column in columns:
        rows[column] = list(range(k))
    csp: CSP[int, int] = CSP(columns, rows)
    for i in range(len(columns) - 1):
        for j in range(i + 1, len(columns)):
            csp.add_constraint(QueenArcConstraint(i, j))
    min_conflict: MinConflict[int, int] = MinConflict(csp, State[int, int]({i: x for i, x in enumerate(init_state)}),
                                                      iteration)
    solution, steps, time = min_conflict.solve()
    response = app.response_class(
        response=json.dumps({"solution": solution.assignment, "steps": steps, "time": time}),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/ga', methods=['POST'])
def ga():
    req_data = request.get_json()
    nq = req_data['nq']
    generation, time = solve(nq)
    response = app.response_class(
        response=json.dumps({"generation": generation, "time": time}),
        status=200,
        mimetype='application/json'
    )
    return response
