class Cube {
    constructor() {
        this.faces = {
            U: Array(9).fill('w'),
            D: Array(9).fill('y'),
            F: Array(9).fill('g'),
            B: Array(9).fill('b'),
            L: Array(9).fill('o'),
            R: Array(9).fill('r'),
        };
        this.history = [];
    }

    getStateString() {
        return Object.values(this.faces).flat().join('');
    }

    rotateFace(face, clockwise = true, saveHistory = true) {
        const map = clockwise ? [6, 3, 0, 7, 4, 1, 8, 5, 2] : [2, 5, 8, 1, 4, 7, 0, 3, 6];
        const rotated = [...this.faces[face]];
        for (let i = 0; i < 9; i++) {
            rotated[i] = this.faces[face][map[i]];
        }
        this.faces[face] = rotated;

        if (saveHistory) {
            this.history.push({ face, clockwise });
        }
    }

    clearHistory() {
        this.history = [];
    }

    getHistory() {
        return [...this.history];
    }
}

const cube = new Cube();

function scrambleCube() {
    cube.clearHistory();
    const faces = ['U', 'D', 'F', 'B', 'L', 'R'];
    for (let i = 0; i < 20; i++) {
        const face = faces[Math.floor(Math.random() * 6)];
        const clockwise = Math.random() > 0.5;
        cube.rotateFace(face, clockwise, true);
    }
    displayCube();
}

function solveCube() {
    const history = cube.getHistory().reverse();
    let i = 0;

    function applyStep() {
        if (i < history.length) {
            const move = history[i];
            cube.rotateFace(move.face, !move.clockwise, false);
            displayCube();
            i++;
            setTimeout(applyStep, 300);
        } else {
            alert("Cube solved!");
            cube.clearHistory();
        }
    }

    applyStep();
}

function displayCube() {
    const svg = getCubeSvg(cube.getStateString());
    document.getElementById("cube-container").innerHTML = svg;
}

function getCubeSvg(cubeStr) {
    return `<pre style="font-family: monospace; background: white; padding: 10px;">${cubeStr}</pre>`;
}