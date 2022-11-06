class GrassEater extends LivingCreature {

    constructor(x, y, index){
    
    super(x, y, index);
    this.energy = 8;
    
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
    
    chooseCell(character) {
    
    this.getNewCoordinates();
    
    return super.chooseCell(character);
    
    }
    
    // eat, mul, move, die
    


    move() {
        if (this.energy <= 0) {
            this.die()
        }
        else {
            this.energy--
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                matrix[this.y][this.x] = 0;
                const newX = newCell[0]
                const newY = newCell[1]
                matrix[newY][newX] = 2;
                this.x = newX
                this.y = newY
            }
        }

    }

    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                matrix[this.y][this.x] = 0;

                break
            }
        }
    }

    mul() {
        this.multiply++
        var newCell = random(this.chooseCell(0));
        var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
        grassEaterArr.push(newGrassEater);
        matrix[newCell[1]][newCell[0]] = 2;
        this.multiply = 0;
        this.energy = 10
    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            const newX = newCell[0]
            const newY = newCell[1]
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);

                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX
            this.y = newY
            this.energy += 2
            if (this.energy >= 20) {
                this.mul()
            }

        }
        else {
            this.move();
        }

    }
}