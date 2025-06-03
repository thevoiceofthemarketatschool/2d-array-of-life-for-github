function step () {
    layer_neighbors.image.fill(0)
    listofcellXtemp = []
    listofcellYtemp = []
    for (let index = 0; index <= listofcellX.length - 1; index++) {
        for (let xoffset = 0; xoffset <= 2; xoffset++) {
            finalX = listofcellX[index] + (xoffset - 1)
            if (finalX == -1) {
                finalX = width - 1
                if (solidBorders) {
                    continue;
                }
            } else if (finalX == width) {
                finalX = 0
                if (solidBorders) {
                    continue;
                }
            }
            for (let yoffset = 0; yoffset <= 2; yoffset++) {
                finalY = listofcellY[index] + (yoffset - 1)
                if (finalY == -1) {
                    finalY = height - 1
                    if (solidBorders) {
                        continue;
                    }
                } else if (finalY == height) {
                    finalY = 0
                    if (solidBorders) {
                        continue;
                    }
                }
                layer_neighbors.image.setPixel(finalX, finalY, layer_neighbors.image.getPixel(finalX, finalY) + 1)
                if (layer_neighbors.image.getPixel(finalX, finalY) == 3 && (layer_buffer.image.getPixel(finalX, finalY) != alivecolor && layer_buffer.image.getPixel(finalX, finalY) != 2)) {
                    listofcellXtemp.push(finalX)
                    listofcellYtemp.push(finalY)
                    if (layer_visual.image.getPixel(finalX, finalY) == alivecolor) {
                        layer_buffer.image.setPixel(finalX, finalY, alivecolor)
                    } else {
                        layer_buffer.image.setPixel(finalX, finalY, 2)
                    }
                }
            }
        }
    }
    layer_visual.image.fill(0)
    listofcellX = []
    listofcellY = []
    for (let index2 = 0; index2 <= listofcellXtemp.length - 1; index2++) {
        finalX = listofcellXtemp[index2]
        finalY = listofcellYtemp[index2]
        if (layer_buffer.image.getPixel(finalX, finalY) == alivecolor && layer_neighbors.image.getPixel(finalX, finalY) == 4 || layer_neighbors.image.getPixel(finalX, finalY) == 3) {
            layer_visual.image.setPixel(finalX, finalY, alivecolor)
            listofcellX.push(finalX)
            listofcellY.push(finalY)
        }
    }
    layer_buffer.image.fill(0)
}
function cursorValid () {
    return cursor.x > layer_visual.left && cursor.x < layer_visual.right && (cursor.y > layer_visual.top && cursor.y < layer_visual.bottom)
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    if (notstarted && cursorValid()) {
        if (layer_visual.image.getPixel(cursor.x, cursor.y) == 0) {
            layer_visual.image.setPixel(cursor.x, cursor.y, alivecolor)
            listofcellX.push(cursor.x)
            listofcellY.push(cursor.y)
        } else {
            layer_visual.image.setPixel(cursor.x, cursor.y, 0)
            for (let value = 0; value <= listofcellX.length - 1; value++) {
                if (cursor.x == listofcellX[value] && cursor.y == listofcellY[value]) {
                    listofcellX.removeAt(value)
                    listofcellY.removeAt(value)
                    break;
                }
            }
        }
    }
})
browserEvents.onMouseMove(function (x, y) {
    X = x
    Y = y
})
browserEvents.Y.onEvent(browserEvents.KeyEvent.Pressed, function () {
    step()
})
browserEvents.I.onEvent(browserEvents.KeyEvent.Pressed, function () {
    invisible = !(invisible)
    layer_neighbors.setFlag(SpriteFlag.Invisible, invisible)
})
browserEvents.U.onEvent(browserEvents.KeyEvent.Pressed, function () {
    notstarted = !(notstarted)
})
let Y = 0
let X = 0
let finalY = 0
let finalX = 0
let listofcellYtemp: number[] = []
let listofcellXtemp: number[] = []
let listofcellX: number[] = []
let listofcellY: number[] = []
let alivecolor = 0
let solidBorders = false
let height = 0
let width = 0
let cursor: Sprite = null
let layer_neighbors: Sprite = null
let layer_visual: Sprite = null
let layer_buffer: Sprite = null
let invisible = false
let notstarted = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 100
    export const ARCADE_SCREEN_HEIGHT = 100
}
scene.setBackgroundColor(2)
notstarted = true
invisible = true
let layer_grid = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
layer_buffer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
layer_visual = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
layer_neighbors = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
cursor = sprites.create(img`
    6 6 6 
    6 6 6 
    6 6 6 
    `, SpriteKind.Player)
layer_neighbors.setFlag(SpriteFlag.Invisible, true)
while (0 >= width) {
    width = game.askForNumber("board width", 4)
}
while (0 >= height) {
    height = game.askForNumber("board height", 4)
}
let gridgap = 4
solidBorders = game.ask("Solid borders?")
layer_buffer.setImage(image.create(width, height))
layer_visual.setImage(image.create(width, height))
layer_neighbors.setImage(image.create(width, height))
layer_grid.setImage(image.create(width, height))
layer_buffer.left = -1
layer_neighbors.left = -1
layer_grid.left = -1
layer_visual.left = -1
layer_buffer.top = -1
layer_neighbors.top = -1
layer_visual.top = -1
layer_grid.top = -1
layer_grid.image.fill(12)
for (let index = 0; index <= width - 1; index++) {
    for (let index2 = 0; index2 <= height - 1; index2++) {
        if (index % gridgap == 0 || index2 % gridgap == 0) {
            layer_grid.image.setPixel(index, index2, 11)
        }
    }
}
alivecolor = 1
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(50, 50)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
listofcellY = []
listofcellX = []
game.showLongText("Y to step, U to start, I to see the neighbor layer, and WASD/arrows to move camera", DialogLayout.Full)
game.onUpdateInterval(100, function () {
    if (listofcellX.length == 0) {
        layer_neighbors.image.fill(0)
        notstarted = true
    }
    if (!(notstarted)) {
        step()
    }
})
game.onUpdateInterval(10, function () {
    cursor.setPosition(Math.round(mySprite.x + (X - 50)), Math.round(mySprite.y + (Y - 50)))
    if (notstarted) {
        for (let xoffset = 0; xoffset <= 2; xoffset++) {
            for (let yoffset = 0; yoffset <= 2; yoffset++) {
                if (alivecolor == layer_visual.image.getPixel(cursor.x + (xoffset - 1), cursor.y + (yoffset - 1))) {
                    cursor.image.setPixel(xoffset, yoffset, 9)
                } else {
                    cursor.image.setPixel(xoffset, yoffset, 6)
                }
            }
        }
    } else {
        cursor.setImage(img`
            . . . 
            . . . 
            . . . 
            `)
    }
})
