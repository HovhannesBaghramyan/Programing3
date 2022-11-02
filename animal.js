class Animal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
        if (this.energy <= 5 ) {
            this.die()
        }
        else {
            this.energy--
            var newCell = random(this.chooseCell(0));
            if(newCell){
                matrix[this.y][this.x] = 0;
                const newX = newCell[0]
                const newY =  newCell[1]
                matrix[newY][newX] = 4;
                this.x = newX
                this.y = newY
            }
        }
        
    }

    die() {
        for (var i in animalArr) {
            if(this.x == animalArr[i].x && this.y == animalArr[i].y ){
                animalArr.splice(i,1)
        matrix[this.y][this.x] = 0;

        break
            }
    }
}

    mul() {
        this.multiply++
        var newCell = random(this.chooseCell(0));
        var newAnimal = new Animal(newCell[0], newCell[1], this.index);
        animalArr.push(newAnimal);
        matrix[newCell[1]][newCell[0]] = 4;
        this.multiply = 0;
        this.energy = 10
    }
    eat() {
        var newCell = random(this.chooseCell(3));
        if (newCell) {
            const newX = newCell[0]
            const newY =  newCell[1]
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);

                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.x = newX
            this.y = newY
            this.energy += 2
            if (this.energy >= 40 ) {
                this.mul()
            }

        }
        else{
            this.move();
        }
    
    }
}
