class Animal extends LivingCreature {

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
        if (this.energy <= 5) {
            this.die()
        }
        else {
            this.energy--
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                matrix[this.y][this.x] = 0;
                const newX = newCell[0]
                const newY = newCell[1]
                matrix[newY][newX] = 4;
                this.x = newX
                this.y = newY
            }
        }

    }

    die() {
        for (var i in animalArr) {
            if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                animalArr.splice(i, 1)
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
            const newY = newCell[1]
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
            if (this.energy >= 40) {
                this.mul()
            }

        }
        else {
            this.move();
        }

    }
}
