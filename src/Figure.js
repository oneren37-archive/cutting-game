
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
    }

    update() {
        this.lines = this.lines.filter(line => !line.cut)
        this.render()
    }
}