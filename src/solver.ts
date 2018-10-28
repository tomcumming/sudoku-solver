import { GridVals, UnsolvedGrid, CellVal, cellIsValid } from "./sudoku";

export function* solutions(
    constraints: UnsolvedGrid,
    partialSolution: CellVal[] = []
): IterableIterator<GridVals<CellVal>> {
    if(partialSolution.length === 9 * 9)
        yield partialSolution as GridVals<CellVal>;

    if(constraints[partialSolution.length] !== undefined) {
        yield* solutions(
            constraints,
            partialSolution.concat(
                constraints[partialSolution.length] as CellVal));
    } else {
        for(const value of [1, 2, 3, 4, 5, 6, 7, 8, 9] as CellVal[]) {
            const valid = cellIsValid(
                partialSolution.length,
                partialSolution,
                constraints,
                value);
            if(valid)
                yield* solutions(
                    constraints,
                    partialSolution.concat(value));
        }
    }
}
