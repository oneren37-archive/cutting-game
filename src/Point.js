export default class Point {
    constructor(pos) {
        this.pos = pos
        this.x = pos[0]
        this.y = pos[1]
    }

    render = (p) => {
        p.stroke(255);
        p.ellipse(this.pos[0], this.pos[1], 4)
        // p.text(`${this.pos[0]}, ${this.pos[1]}`, this.pos[0]+10, this.pos[1]+10)
    }
}
