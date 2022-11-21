export default class Line {
    constructor(x1, y1, x2, y2) {
        this.p1 = [x1, y1]
        this.p2 = [x2, y2]
        this.cut = null
    }

    render = (p) => {
        if (!this.cut) {
            p.stroke(255);
            p.line(...this.p1, ...this.p2)
        }
    }
    
    getPoints = () => [this.p1, this.p2]
}
