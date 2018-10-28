export type CellVal = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type GridVals<T> = [
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T,
    T, T, T, T, T, T, T, T, T
];

export type UnsolvedGrid = GridVals<undefined | CellVal>;

export function cellIndex(x: number, y: number): number {
    return y * 9 + x;
}

export function fillGrid<T>(f: (idx: number) => T): GridVals<T> {
    let grid = [];
    for(let index = 0; index < 9 * 9; index += 1)
        grid.push(f(index));
    return grid as GridVals<T>;
}

export function cellIsValid(
    index: number,
    partialSolution: CellVal[],
    constraints: UnsolvedGrid,
    newValue?: CellVal
): boolean {
    function valueAt(cellIndex: number): undefined | CellVal {
        if(partialSolution.length > cellIndex)
            return partialSolution[cellIndex];
        else if(constraints[cellIndex] !== undefined)
            return constraints[cellIndex];
        else
            return cellIndex === index
                ? newValue
                : undefined;
    }

    const value = valueAt(index);
    if(value === undefined)
        return true;

    const row = Math.floor(index / 9);
    const col = index % 9;

    // Check Row
    for(let idx = row * 9; idx < row * 9 + 9; idx += 1)
        if(idx !== index && valueAt(idx) === value)
            return false;

    // Check Col
    for(let idx = col; idx < 9 * 9; idx += 9)
        if(idx !== index && valueAt(idx) === value)
            return false;

    // Check Square
    for(let y = 0; y < 3; y += 1) {
        for(let x = 0; x < 3; x += 1) {
            const base = Math.floor(row / 3) * 3 * 9 + Math.floor(col / 3) * 3;
            const idx = base + x + 9 * y;
            if(idx !== index && valueAt(idx) === value)
                return false;
        }
    }

    return true;
}

export function invalidCells(
    constraints: UnsolvedGrid
): GridVals<boolean> {
    let invalids = [];
    for(let idx = 0; idx < 9 * 9; idx += 1)
        invalids.push(!cellIsValid(idx, [], constraints));
    return invalids as GridVals<boolean>;
}
