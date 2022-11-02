var n = 100
var m = 100
var side = 10
var matrix = []


var side = 50;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = []
var animalArr = []

function setup() {
    frameRate(10);

    const nam = random([0, 1, 2])

    for (var i = 0; i < 20; i++) {
        matrix.push([])
        for (var j = 0; j < 20; j++) {
            matrix[i].push(random([0, 1, 2, 3, 4]))
        }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);


    background('#acacac');



    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                const gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                const greater = new GrassEater(x, y, 2);
                grassEaterArr.push(greater);
            }
            else if (matrix[y][x] == 3) {
                const pred = new Predator(x, y, 3);
                predatorArr.push(pred);
            }
            else if (matrix[y][x] == 4) {
                const anim = new Animal(x, y, 4);
                animalArr.push(anim);
            }
            else if (matrix[y][x] == 8) {

            }
        }
    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }


            rect(x * side, y * side, side, side);


            fill("blue")
            text(x + " " + y, x * side + side / 2, y * side + side / 2)

        }
    }



    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();

    }
    for (var i in predatorArr) {
        predatorArr[i].eat();

    }
    for (var i in animalArr) {
        animalArr[i].eat();

    }

}


