import * as p5 from "p5"
import Grid from "./Grid"
import Cut from "./Cut"
import Figure from "./Figure"
import {defaultFigure} from "./helpers/consts"

const placeAndScaleFigure = (p, points, grid) => {
    points = points.map(p => grid.ungridify(p))

    const windowCenterX = Math.round(p.windowWidth/2)
    const windowCenterY = Math.round(p.windowHeight/2)
    const figureCenterX = Math.round(points.reduce((sum, p) => sum+p[0], 0)/points.length)
    const figureCenterY = Math.round(points.reduce((sum, p) => sum+p[1], 0)/points.length)
    const offset = [windowCenterX - figureCenterX, windowCenterY - figureCenterY]

    points = points.map(p => [p[0] + offset[0], p[1] + offset[1]])
    points = points.map(p => grid.gridify(p))

    return points
}

const s = (p) => {
    const grid = new Grid(
        p.windowWidth,
        p.windowHeight,
        Math.round(Math.min(p.windowWidth, p.windowHeight)/40)
    )
    const figures = [new Figure(placeAndScaleFigure(p, defaultFigure, grid))]
    const cut = new Cut(grid, figures)
    
    p.setup = () =>  {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.indowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        p.background(0)
        grid.render(p)
        figures.forEach(f => f.render(p))
        cut.update(p.mouseX, p.mouseY)
        cut.show(p)
    }

    p.touchStarted = () => cut.hadleStart()
    p.touchEnded = () => cut.handleEnded()
}

const P5 = new p5(s);



