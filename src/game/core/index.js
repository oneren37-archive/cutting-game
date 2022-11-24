import * as p5 from "p5"
import Grid from "./Grid"
import Cut from "./Cut"
import Figure from "./Figure"
import { placeAndScaleFigure } from './helpers/place'

export const init = (state, onCut) => {
    const s = (p) => {
        const grid = new Grid(
            p.windowWidth,
            p.windowHeight,
            Math.round(Math.min(p.windowWidth, p.windowHeight)/40)
        )
        const figures = [new Figure(placeAndScaleFigure(p, state.figure, grid))]
        const cut = new Cut(grid, figures, onCut)
        
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
    
        p.touchStarted = () => cut.hadleStart(p.mouseX, p.mouseY)
        p.touchEnded = () => cut.handleEnded()
    }
    
    const P5 = new p5(s);
}