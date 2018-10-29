import { LitElement, html, customElement, property }
    from '@polymer/lit-element';
import { CellVal, fillGrid, GridVals, UnsolvedGrid, invalidCells }
    from '../sudoku';
import { solutions } from '../solver';
import { CellChangeEvent } from './grid';

const style = html`
<style>
    :host {
        --cell-size: 10vmin;
    }

    :host {
        font-family: 'sans-serif';
    }

    :host .wrapper {
        background-color: darkgray;
        text-align: center;
        border-radius: 1vmin;
        padding: 1vmin;

        box-shadow: black 0 0.5vmin 2vmin;
    }

    :host .wrapper > h2 {
        font-size: 5vmin;
        margin: 1vmin;
        color: white;
        text-shadow: black 0 0 2vmin;
    }

    :host .wrapper .button-wrapper {
        display: flex;
        margin-top: 1vmin;
        align-content: stretch;
    }

    :host .wrapper .button-wrapper > * {
        flex-grow: 1;
        font-size: 4vmin;
        border: 0;
        border-radius: 1vmin;
        height: 8vmin;
        font-family: "sans-serif";
    }

    :host .wrapper .button-wrapper .clear-grid {
        background: grey;
        color: black;
        margin-right: 0.5vmin;
        cursor: pointer;
    }

    :host .wrapper .button-wrapper .view-source {
        background: black;
        color: white;
        margin-left: 0.5vmin;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
`;

type State = {
    invalids: GridVals<boolean>;
    constraints: UnsolvedGrid;
    solution?: GridVals<CellVal>;
};

@customElement('sudoku-solver' as any)
export class Solver extends LitElement {
    @property()
    state: State = {
        invalids: fillGrid(() => false),
        constraints: fillGrid(() => undefined)
    };

    readonly onCellChange = (e: CellChangeEvent) => {
        const constraints = this.state.constraints.slice() as UnsolvedGrid;
        constraints[e.index] = e.value;

        this.setConstraints(constraints);
    };

    onClear = (e: Event) => this.setConstraints(fillGrid(() => undefined));

    setConstraints(constraints: UnsolvedGrid): void {
        const invalids = invalidCells(constraints);

        let solution;
        if(invalids.every(x => !x))
            solution = solutions(constraints).next().value;

        this.state = {
            invalids,
            constraints,
            solution: solution
        };
    }

    render() {
        return html`
            ${style}
            <div class="wrapper">
                <h2>Sudoku Solver!</h2>
                <sudoku-grid
                    .invalids="${this.state.invalids}"
                    .constraints="${this.state.constraints}"
                    .solution="${this.state.solution}"
                    @cellchange="${this.onCellChange}"
                >
                </sudoku-grid>

                <div class="button-wrapper">
                    <button
                        class="clear-grid"
                        @click="${this.onClear}"
                    >
                        Clear Grid
                    </button>
                    <a
                        class="view-source"
                        href="https://github.com/tomcumming/sudoku-solver"
                    >
                        View Source
                    </a>
                </div>
            </div>
        `;
    }
}
