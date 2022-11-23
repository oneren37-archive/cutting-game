
import Line from "./Line"
import Point from "./Point"

export default class Figure {
    constructor(points, lines) {
        if (arguments.length === 1) {
            this.points = points.map(p => new Point(p))
            this.lines = []
            for (let i = 1; i < points.length; i++) {
                this.lines.push(new Line(...points[i-1], ...points[i]))
            }
            this.lines.push(new Line(...points[points.length-1], ...points[0]))
        }
        else {
            this.points = points.map(p => new Point(p))
            this.lines = lines
        }
        this.area = this.getArea()
    }

    buildGraph() {
        this.graph = {}
        this.lines.forEach(line => {
            const [p1, p2] = line.getPoints()

            this.graph[p1] = this.graph[p1] ? [...this.graph[p1], p2] : [p2]
            this.graph[p2] = this.graph[p2] ? [...this.graph[p2], p1] : [p1]
        })
        return this.graph
    }

    render(p) {
        this.lines.forEach(line => line.render(p))
        this.points.forEach(point => point.render(p))
        p.text(
            `${this.area}`, 
            Math.round(this.points.reduce((sum, p) => sum+p.x, 0)/this.points.length),
            Math.round(this.points.reduce((sum, p) => sum+p.y, 0)/this.points.length)
        )
    }

    update() {
        this.lines = this.lines.filter(line => !line.cut)
    }

    getArea() {
        const n = this.points.length
        let s1 = 0
        let s2 = 0

        for (let i = 0; i < n-1; i++) {
            s1 += this.points[i].x*this.points[i+1].y
            s2 += this.points[i+1].x*this.points[i].y
        }

        return (Math.abs(s1 - s2 + this.points[n-1].x*this.points[0].y - this.points[0].x*this.points[n-1].y))/2
    }
}