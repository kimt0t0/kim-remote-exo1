/**
 * Variables
 */

let isMouseDown = false
let canvas = document.createElement('canvas')
let body = document.getElementsByTagName('body')[0]
let ctx = canvas.getContext('2d')
let linesArray = []
let currentSize = 5
let currentColor = '#c81464'
let currentBg = '#ffffff'

/**
 * Create and configure the canvas (drawing zone) inside the DOM
 */
function createCanvas () {
    canvas.id = 'canvas'
    canvas.width = parseInt(document.getElementById('sizeX').value)
    canvas.height = parseInt(document.getElementById('sizeY').value)
    canvas.style.zIndex = 8
    canvas.style.position = 'absolute'
    canvas.style.border = '1px solid black'
    ctx.fillStyle = currentBg
    ctx.fillRect(0,0,canvas.width, canvas.height)
    body.appendChild(canvas)
}

/**
 * Redraw draw from linesArray
 */
function redraw () {
    for (let i = 1; i < linesArray.length; i++) {
        ctx.beginPath()
        ctx.moveTo(linesArray[i-1].x, linesArray[i-1].y)
        ctx.lineWidth = linesArray[i].size
        ctx.lineCap = 'round'
        ctx.strokeStyle = linesArray[i].color
        ctx.lineTo(linesArray[i].x, linesArray[i].y)
        ctx.stroke()
    }
}

/**
 * Store a new line inside linesArray
 * @param {*} x 
 * @param {*} y 
 * @param {*} size 
 * @param {*} color 
 */
 function store (x, y, size, color) {
    linesArray.push({
        'x': x,
        'y': y,
        'size': size,
        'color': color
    })
}

/**
 * Save canvas to local storage
 */
function save () {
    localStorage.removeItem('savedCanvas')
    localStorage.setItem('savedCanvas', JSON.stringify(linesArray))
}

/**
 * Load canvas from local storage
 */
function load () {
    if (localStorage.getItem('savedCanvas')) {
        linesArray = JSON.parse(localStorage.getItem('savedCanvas'))
        redraw()
    } else {
        alert('No saved canvas in local storage')
    }
}

/**
 * Clear canvas from local storage
 */
function clearCache () {
    localStorage.removeItem('savedCanvas')
    linesArray = []
}

/**
 * Download the canvas to PNG file
 * @param {*} link the HTML element to link download
 * @param {*} canvas the canvas to download
 * @param {*} filename the filename for the download
 */
function downloadCanvas (link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL()
    link.download = filename
}

/**
 * Return the mouse position inside the canvas
 * @param {*} canvas the canvas
 * @param {*} evt the mouse event
 * @returns {object} the mouse position
 */
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

/**
 * Start a new draw line from mouse position 
 * @param {*} canvas the canvas
 * @param {*} evt the mouse event
 */
function mouseDown (canvas, evt) {
    let mousePos = getMousePos(canvas, evt)
    isMouseDown = true
    ctx.moveTo(mousePos.x, mousePos.y)
    ctx.beginPath()
    ctx.lineWidth = currentSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = currentColor
}

/**
 * Draw the line from initial position to the new mouse position
 * @param {*} canvas 
 * @param {*} evt 
 */
function mouseMove (canvas, evt) {
    if (isMouseDown) {
        let mousePos = getMousePos(canvas, evt)
        ctx.lineTo(mousePos.x, mousePos.y)
        ctx.stroke()
        store(mousePos.x, mousePos.y, currentSize, currentColor)
    }
}

/**
 * Stop line draw
 */
function mouseUp () {
    isMouseDown = false
    store()
}

/**
 * Events
 */

// Mouse moves
canvas.addEventListener('mousedown', (e) => mouseDown(canvas, e))
canvas.addEventListener('mousemove', (e) => mouseMove(canvas, e))
canvas.addEventListener('mouseup', mouseUp)

// Colors
document.getElementById('colorpicker').addEventListener('change', function () {
    currentColor = this.value
})
document.getElementById('bgcolorpicker').addEventListener('change', function () {
    ctx.fillStyle = this.value
    ctx.fillRect(0,0,canvas.width, canvas.height)
    redraw()
    currentBg = ctx.fillStyle
})

// Tools
document.getElementById('eraser').addEventListener('click', function () {
    currentSize = 50
    currentColor = ctx.fillStyle
})
document.getElementById('clear').addEventListener('click', function () {
    createCanvas()
    linesArray = []
})

// Sizes
document.getElementById('controlSize').addEventListener('change', function () {
    currentSize = this.value
    document.getElementById('showSize').innerHTML = this.value
})
document.getElementById('canvasUpdate').addEventListener('click', function () {
    createCanvas()
    redraw()
})

// Storage
document.getElementById('save').addEventListener('click', save)
document.getElementById('load').addEventListener('click', load)
document.getElementById('clearCache').addEventListener('click', clearCache)

document.getElementById('saveToImage').addEventListener('click', function () {
    downloadCanvas(this, 'canvas', 'masterpiece.png')
}, false)

createCanvas()