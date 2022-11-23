export const placeAndScaleFigure = (p, points, grid) => {
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