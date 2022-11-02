class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    move() {
        if (this.energy <= 0 ) {
            this.die()
        }
        else {
            this.energy-=1
            var newCell = random(this.chooseCell(0));
            if(newCell){
                matrix[this.y][this.x] = 0;
                const newX = newCell[0]
                const newY =  newCell[1]
                matrix[newY][newX] = 3;
                this.x = newX
                this.y = newY
            }
        }
        
    }

    die() {
        for (var i in predatorArr) {
            if(this.x == predatorArr[i].x && this.y == predatorArr[i].y ){
                predatorArr.splice(i,1)
        matrix[this.y][this.x] = 0;

        break
            }
    }
}

    mul() {
        this.multiply++
        var newCell = random(this.chooseCell(0));
        var newPredator = new Predator(newCell[0], newCell[1], this.index);
        predatorArr.push(newPredator);
        matrix[newCell[1]][newCell[0]] = 3;
        this.multiply = 0;
        this.energy = 15
    }
    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            const newX = newCell[0]
            const newY =  newCell[1]
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);

                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.x = newX
            this.y = newY
            this.energy += 2
            if (this.energy >= 20 ) {
                this.mul()
            }

        }
        else{
            this.move();
        }
    
    }
}