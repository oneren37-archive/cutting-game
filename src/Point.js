export default class Point {
    constructor(pos) {
        this.pos = pos
    }

    render = (p) => {
        p.stroke(255);
        p.ellipse(this.pos[0], this.pos[1], 4)
        // text(`${this.pos[0]}, ${this.pos[1]}`, this.pos[0]+10, this.pos[1]+10)
    }
}
