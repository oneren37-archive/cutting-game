export default class Grid {
    constructor(width, height, gap) {
        this.width = width
        this.height = height
        this.gap = gap
    }

    render(p) {
        p.fill(255)
        p.stroke(40);
        for (let i = 0; i < this.width/this.gap; i++) {
            p.line(i*this.gap, 0, i*this.gap, this.height)
        }

        for (let i = 0; i < this.height/this.gap; i++) {
            p.line(0, i*this.gap, this.width, i*this.gap,)
        }
    }

    gridify(pos) {
        return pos.map(e => Math.round(e/this.gap)*this.gap)
    }

    ungrigify(pos) {
        return pos.map(e => e*this.gap)
    }
}
