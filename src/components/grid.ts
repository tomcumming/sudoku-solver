import { LitElement, html, customElement, property }
    from '@polymer/lit-element';

import { CellVal, GridVals, cellIndex, UnsolvedGrid } from '../sudoku';

export class CellChangeEvent extends Event {
    constructor(
        readonly index: number,
        readonly value: undefined | CellVal
    ) {
        super('cellchange')
    }
}

const style = html`
<style>
    :host {
        --border-size: 1px; // calc(var(--cell-size) * 0.05);
    }

    :host .grid {
        display: flex;
        flex-direction: column;
        border: var(--border-size) solid black;
    }

    :host .row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
    }

    :host .row[data-group-end] {
        border-bottom: var(--border-size) solid black;
    }

    :host .cell {
        width: var(--cell-size);
        height: var(--cell-size);
        border-left: var(--border-size) solid black;
        border-top: var(--border-size) solid black;

        background: white;
    }

    :host .cell[data-group-end] {
        border-right: var(--border-size) solid black;
    }

    :host .cell input[data-invalid] {
        background: pink;
    }

    :host .cell input {
        border: 0;
        width: var(--cell-size);
        height: var(--cell-size);
        text-align: center;
        font-size: calc(var(--cell-size) * 0.8);
    }
</style>
`;

@customElement('sudoku-grid' as any)
export class Grid extends LitElement {
    @property()
    invalids?: GridVals<boolean>;

    @property()
    constraints?: UnsolvedGrid;

    @property()
    solution?: GridVals<CellVal>;

    readonly onInput = (e: Event) => {
        const currentTarget: HTMLInputElement = e.currentTarget as any;
        this.changedCell(currentTarget, currentTarget.value);
    };

    readonly onKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        const currentTarget: HTMLInputElement = e.currentTarget as any;
        currentTarget.blur();
        const val = parseInt(e.key);
        this.changedCell(currentTarget, e.key);
    }

    private changedCell(
        el: HTMLInputElement,
        txtVal: string
    ) {
        const val = parseInt(txtVal);
        const safeVal: undefined | CellVal = val > 0 && val < 10
            ? val as CellVal
            : undefined;
        const index = cellIndex(
            Number(el.getAttribute('data-col')),
            Number(el.getAttribute('data-row')));
        this.dispatchEvent(new CellChangeEvent(index, safeVal));
    }

    render() {
        const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            .map(y => {
                const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
                    .map(x => {
                        const value = this.constraints === undefined
                            ? undefined
                            : this.constraints[cellIndex(x, y)];

                        const placeholder = this.solution !== undefined
                            ? this.solution[cellIndex(x, y)].toString()
                            : '';

                        const invalid = this.invalids !== undefined
                            ? this.invalids[cellIndex(x, y)]
                            : false;

                        return html`
                            <div
                                class="cell"
                                ?data-group-end="${x % 3 === 2}"
                            >
                                <input
                                    type="number"
                                    min="1"
                                    max="9"
                                    data-row="${y}"
                                    data-col="${x}"
                                    ?data-invalid="${invalid}"
                                    @input="${this.onInput}"
                                    @keydown="${this.onKeyDown}"
                                    .value="${value === undefined ? '' : value}"
                                    placeholder="${placeholder}"
                                    />
                            </div>
                        `;
                    });

                return html`
                    <div
                        class="row"
                        ?data-group-end="${y % 3 === 2}"
                    >
                        ${cells}
                    </div>
                `;
            });

        return html`
            ${style}
            <div class="grid">
                ${rows}
            </div class="grid">
        `;
    }
}
