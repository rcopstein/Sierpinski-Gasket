// Variables

var levels = 1;
var shapes = [];

// Functions

function setLevel(level)
{
  levels = level;
  levelLabel.innerHTML = level;
  shapes = findShapes(start, level);
}

function findShapes(points, levels)
{
  if (levels == 0) return points;

  var p = points.points;
  var points1 = { points: [ p[0], { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }, { x: (p[0].x + p[2].x) / 2, y: (p[0].y + p[2].y) / 2 } ] };
  var points2 = { points: [ p[1], { x: (p[1].x + p[0].x) / 2, y: (p[1].y + p[0].y) / 2 }, { x: (p[1].x + p[2].x) / 2, y: (p[1].y + p[2].y) / 2 } ] };
  var points3 = { points: [ p[2], { x: (p[2].x + p[1].x) / 2, y: (p[2].y + p[1].y) / 2 }, { x: (p[2].x + p[0].x) / 2, y: (p[2].y + p[0].y) / 2 } ] };

  points1 = findShapes(points1, levels-1);
  points2 = findShapes(points2, levels-1);
  points3 = findShapes(points3, levels-1);

  return { shapes: [ points1, points2, points3 ] };
}

function draw()
{
  // Clear canvas

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Setup colors

  context.fillStyle   = '#FFFFFF';
  context.strokeStyle = '#777777';

  // Draw triangles

  console.log("New draw");

  var toDraw = [ shapes ];
  while (toDraw.length != 0)
  {
    var item = toDraw.pop();

    if (item.shapes)
    {
      console.log("Found a shape");

      for (j = 0; j < item.shapes.length; j++)
      {
        toDraw.push(item.shapes[j]);
      }
    }

    if (item.points)
    {
      console.log("Found points");
      console.log("Found: " + item.points[0].x + "/" + item.points[0].y + " " + item.points[1].x + "/" + item.points[1].y + " " + item.points[2].x + "/" + item.points[2].y); 

      context.beginPath();
      context.moveTo(item.points[0].x, item.points[0].y);
      for (j = 1; j < item.points.length; j++) context.lineTo(item.points[j].x, item.points[j].y);
      context.fill();
    }

  }

}

// Setup Components

var canvas  = document.getElementById('MainCanvas');
var plusButton  = document.getElementById('PlusButton');
var minusButton  = document.getElementById('MinusButton');
var levelLabel  = document.getElementById('LevelLabel');
var context = canvas.getContext('2d');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var gwidth = canvas.width;
var gheight = canvas.height;

if (gwidth > gheight) gwidth = gheight;
if (gheight > gwidth) gheight = gwidth;

var start = { points: [ { x: canvas.width / 2, y: 10 }, { x: (canvas.width / 2) - gwidth / 2, y: gheight - 20 }, { x: (canvas.width / 2) + gwidth / 2, y: gheight - 20 } ] };

setLevel(1);

// Add event handlers

plusButton.addEventListener("click", function (event) {
  
  if (levels < 10) 
  {
    setLevel(levels+1);
  }

});

minusButton.addEventListener("click", function (event) {
  
  if (levels > 0) 
  {
    setLevel(levels-1);
  }

});

// Start animation loop

var FPS = 60;
setInterval(function() { draw(); }, 1000/FPS);
