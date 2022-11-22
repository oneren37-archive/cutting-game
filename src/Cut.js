import {collideLineLine} from "./helpers/collide"
import {filterInPlace} from "./helpers/filter"
import Line from "./Line"
import Figure from "./Figure"
import Point from "./Point"

export default class Cut {
    constructor(grid, figures) {
        this.grid = grid
        this.figures = figures

        this.pos = [0, 0]
        this.startPoint = null
        this.endPoint = null

        this.isMoving = false
    }

    update(x, y) {
        this.pos = [...this.grid.gridify([x, y])]
    }

    hadleStart() {
        this.startPoint = [...this.grid.gridify(this.pos)]
        this.isMoving = true
    }

    handleEnded() {
        this.isMoving = false
        this.endPoint = [...this.pos]
        const newFigures = []
        this.figures.forEach(f => {
            const c = this.cut(f)
            if (!c) return 
            newFigures.push(...c)
        })
        this.figures.push(...newFigures)
        filterInPlace(this.figures, f => !f.unused)
        console.log(this.figures)
        console.log(this.figures.map(f => f.getArea()))
    }

    show(p) {
        if (this.isMoving) p.line(...this.startPoint, ...this.pos)
    }

    cut(figure) {
        const collisions = figure.lines.map(line => ({
                line,
                collision: collideLineLine(
                    ...line.getPoints()[0], 
                    ...line.getPoints()[1],
                    ...this.startPoint,
                    ...this.endPoint,
                    true)
            }))
            .filter(c => c.collision.x !== false) // нашли все коллизии
        
        if (collisions.length < 2) return 
        if (collisions.length === 2 
            && collisions[0].collision.x === collisions[1].collision.x
            && collisions[0].collision.y === collisions[1].collision.y) return

        const isPointsEquals = (p1, p2) => (
            p1 && p2 && p1[0] === p2[0] && p1[1] === p2[1]
        )

        const newPoints = []
        const newLine = []
        
        collisions.forEach(c => { // ищем какие линии разрезаны
            const collPoint = [
                Math.round(c.collision.x),
                Math.round(c.collision.y)
            ]
        
            if (!newLine.find(el => isPointsEquals(el, collPoint))) newLine.push(collPoint)
            if (!figure.points.find(el => isPointsEquals(el.pos, collPoint))) newPoints.push(collPoint)
            
            if (!isPointsEquals(c.line.p1, collPoint) && !isPointsEquals(c.line.p2, collPoint)) {
                c.line.cut = collPoint
                figure.lines.push(new Line(...c.line.getPoints()[0], ...collPoint))
                figure.lines.push(new Line(...c.line.getPoints()[1], ...collPoint))
                figure.points.push(new Point(collPoint))
            }
        })

        if (figure.lines.find(line => {
            const [p1, p2] = line.getPoints()
            return (isPointsEquals(p1, newLine[0]) && isPointsEquals(p2, newLine[1]) ||
                isPointsEquals(p2, newLine[0]) && isPointsEquals(p1, newLine[1]))
        })) return

        figure.lines.push(new Line(...newLine[0], ...newLine[1]))
        figure.update()

        const graph = figure.buildGraph()

        const nodes = Object.keys(graph)
        const entryPoint = nodes.find(node => graph[node].length === 3).split(',').map(e => +e)
        const directions = graph[entryPoint].filter(node => graph[node].length === 2)

        function getNewFig(entryPoint, direction) {
            let currNode = direction
            let prevNode = entryPoint
            const lines = []
            const points = [prevNode]

            while (graph[currNode].length !== 3) {
                lines.push(new Line(...prevNode, ...currNode))
                points.push(currNode)

                const t = graph[currNode].find(node => !isPointsEquals(node, prevNode))
                prevNode = currNode
                currNode = t
            }

            lines.push(new Line(...prevNode, ...currNode))
            lines.push(new Line(...currNode, ...entryPoint))
            points.push(currNode)

            return new Figure(points, lines)
        }

        figure.unused = true

        return [
            getNewFig(entryPoint, directions[0]), 
            getNewFig(entryPoint, directions[1])
        ]
    }
}