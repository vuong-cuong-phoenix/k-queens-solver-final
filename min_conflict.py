from typing import Generic, Optional, List
import random
from csp import CSP
from constraint import V, D
from state import State


class MinConflict(Generic[V, D]):
    def __init__(self, csp: CSP[V, D], initial_state: State[V, D], max_steps: int) -> None:
        self.csp: CSP[V, D] = csp
        self.csp.current_state = initial_state
        self.max_steps: int = max_steps
        for variable in csp.variables:
            if variable not in initial_state.assignment:
                raise LookupError('Initial State should be full')

    def solve(self) -> Optional[State[V, D]]:
        csp = self.csp
        history: List[State[V, D]] = [csp.current_state]
        for i in range(self.max_steps):
            conflicted_variables = self.csp.conflicted()
            if not conflicted_variables:
                return csp.current_state
            choice: V = random.choice(conflicted_variables)
            _: int
            best_value: D
            _, best_value = min(((csp.conflict_value(choice, value), value) for value in csp.domains[choice]),
                                key=lambda x: (x[0], random.random))
            if history.count(csp.current_state.next_state(choice, best_value)) > 3:  # repeat too many time?
                new_domain = filter(lambda x: x != best_value, csp.domains[choice])
                _, best_value = min(((csp.conflict_value(choice, value), value) for value in new_domain),
                                    key=lambda x: (x[0], random.random))  # find a new best_value
            csp.current_state = csp.current_state.next_state(choice, best_value)
            if len(history) == 10:  # enforce recent 10 histories
                history = history[1:] + [csp.current_state]
            else:
                history.append(csp.current_state)

        return None
