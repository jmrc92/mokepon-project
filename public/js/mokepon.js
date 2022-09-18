/*  Class Section */

class ObjectHTML {
    constructor(type, name, id) {
        this.type = type
        this.name = name
        this.id = id
        this.element = document.getElementById(id)
    }

    setElement() {
        this.element = document.getElementById(this.id)
    }

    setDisplay(display) {
        this.element.style.display = display
    }

    appendHTML(inner) {
        this.element.innerHTML += inner
    }

    appendChildHTML(child) {
        this.element.appendChild(child)
    }

    setHTML(inner) {
        this.element.innerHTML = inner
    }

    setSRC(src) {
        this.element.src = src
    }

    setWidth(width) {
        this.element.style.width = width
    }

    setBackground(background) {
        this.element.style.background = background
    }  

    getTextContent() {
        return this.element.textContent
    }

    setDisabled() {
        this.element.disabled = true
        this.element.style.background = '#112f58'
    }

    setEnabled() {
        this.element.disabled = false
        this.element.style.background = '#035397'
    }
    
    getActive() {
        return this.element.disabled
    }
}

class Player {
    constructor(name, type) {
        this.name = name            /*Player Name*/
        this.type = type            /*Player Type [ally or enemy]*/
        this.id = "na"              /*Player ID*/
        this.mokepon = null         /*Mokepon Player*/
        this.sequence = []          /*Player Sequence Attacks*/
        this.life = 0               /*Player Life*/
        this.pet = ""               /*Mokepon Name*/
        this.face = ''              /*Facem Img Mokepon*/
        this.battle = false         /*Player in Battle*/
        this.askBattle = 'false'    /*Some player Ask form something*/
        this.askID = "na"           /*Player ID who ask*/
        this.askPet = "na"          /*Player Pet who ask*/
        this.askAnswer = "na"       /*Answer ask*/
    }
    /*Set status player*/
    setStatus(pet, sequence, life, battle, x, y) {
        /*, askBattle, askID, askPet, askAnswer*/
        this.pet = pet
        this.cleanSequence()
        this.setSquence(sequence)
        this.life = life
        this.battle = battle
        /*this.askBattle = askBattle
        this.askID = askID
        this.askPet = askPet
        this.askAnswer = askAnswer*/
        this.mokepon.x = x
        this.mokepon.y = y
    }
    /*Set Ask*/
    setAskBattle(ask, id, pet, answer) {
        this.askBattle = ask
        this.askID = id
        this.askPet = pet
        this.askAnswer = answer
    }
    /*When the player enters battle*/
    startBattle() {
        this.battle = true
    }
    /*when the player ends or declines the battle*/
    endBattle() {
        this.battle = false
    }
    /*Set Player ID*/
    setID(id) {
        this.id = id
    }
    /*Set new Mokepon*/
    setMokepon(mokepon) {
        this.mokepon = Object.assign(Object.create(Object.getPrototypeOf(mokepon)), mokepon)
        this.mokepon.setOwner(this.name)
        this.pet = this.mokepon.name
        this.face = this.mokepon.picFace.src
        this.life = this.mokepon.life
    }
    /*Add individual attack*/
    pushSequence(attack) {
        this.sequence.push(attack)
    }
    /*Add sequence attack*/
    setSquence(sequence) {
        sequence.forEach((singleAttack) => {
            //console.log(attacks.find((attack) => attack.name === singleAttack))
            this.pushSequence(attacks.find((attack) => attack.name === singleAttack))
        })
    }
    /*Get attacks name*/
    getSequence() {
        let array = []
        this.sequence.forEach((seq) => {
            array.push(seq.name)
        })
        return array
    }
    /*Update life in battle*/
    updateLife(damage, operator) {
        if(operator === "-") {
            this.life -= damage
            if(this.life < 0) {
                this.life = 0
            }
        } else if(operator === "+") {
            this.life += damage
            if((this.life + damage) > this.mokepon.life) {
                this.life = 0
            }
        } else if(operator === "="){
            this.life = damage
        }
    }
    /*Clear sequence attacks*/
    cleanSequence(){
        const seqLength = this.sequence.length
        for (let i = 0; i < seqLength; i++) {
            this.sequence.pop()
        }
    }
}

class Attack {
    constructor(name, type, symbol, power) {
        this.type = type                        //Attack Type [fire, water, plant, normal]
        this.name = name                        //Attack name
        this.symbol = symbol                    //Attack symbol
        this.id = 'btn-' + name.toLowerCase()   //Attack ID for button HTML
        this.power = power                      //Power Attack
    }
}

class Mokepon {
    constructor(name, life, type, attacksList, others) {
        this.name = name                                                    //Mokepon name
        this.id = 'input-' + name.toLowerCase()                             //ID for input HTML
        this.life = life                                                    //Point of life
        this.picBody = './assets/body_' + name.toLowerCase() + '.png'       //Mokepon body img
        this.picFace = new Image()  
        this.picFace.src = './assets/face_' + name.toLowerCase() + '.png'   //Mokepon face img
        this.attacks = []                                                   //Attack list of mokepon
        this.setAttacks(attacksList)
        this.type = type                                                    //Mokepon type
        this.owner = "na"                                                   //Player owner mokepon
        this.width = 40                                                     //Width for face
        this.height = 40                                                    //Height for face
        this.x = -40                                                        //Position X on map
        this.y = -40                                                        //Position Y on map
        this.speedX = 0                                                     //Speed X on map
        this.speedY = 0                                                     //Speed Y on map
    }
    /*Set attack list*/
    setAttacks(attacksList) {
        attacksList.forEach((newAttack) => {
            this.attacks.push(attacks.find(attack => attack.name === newAttack))
        })
    }
    /*Draw mokepon on map*/
    drawMokepon() {
        canvasMap.drawImage(
            this.picFace,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    /*set player owneer of mokepon*/
    setOwner(owner) {
        this.owner = owner
    }
    /*update position mokepon with speed*/
    updateSpeed() {
        if (((this.x + this.speedX) > 0) && 
        ((this.x + this.speedX) < map.width - this.width) &&
        (this.speedX != 0)) {
            this.x += this.speedX
        }
        if (((this.y + this.speedY) > 0) && 
        ((this.y + this.speedY) < map.height - this.height) &&
        (this.speedY != 0)) {
            this.y += this.speedY
        }
    }
    /*Set speed x*/
    setSpeedX(speed) {
        this.speedX = speed
    }
    /*Set speed y*/
    setSpeedY(speed) {
        this.speedY = speed
    }
    /*Get coords of a direction*/
    points(coord) {
        let p
        switch(coord) {
            case 'left':
                p = this.x
                break
            case 'up':
                p = this.y
                break
            case 'right':
                p = this.x + this.width
                break
            case 'down':
                p = this.y + this.height
                break
        }
        return p
    }
    /*Check collision with other mokepon*/
    checkCollision(pet) {
        return !(
            this.points('down') < pet.points('up') ||
            this.points('up') > pet.points('down') ||
            this.points('right') < pet.points('left') ||
            this.points('left') > pet.points('right')
        )
    }
    /*Set a random location on map*/
    randomLocation() {
        let tries = 0
        do {
            this.x = randomFunc(0, map.width - this.width, nominalSpeed)
            this.y = randomFunc(0, map.height - this.height, nominalSpeed)
            tries += 1
        } while ((this.owner !== "Ally") && this.checkCollision(ally.mokepon));
    }
}

/*  Const Section */
const isLocal = false                                                               //Set Server [true=LAN, false=Local]
const gameURL = isLocal ? "http://localhost:8081/" : "http://192.168.2.18:8081/"
const objectsHTML = [
    new ObjectHTML("section", "Pet", 'select-pet'),
    new ObjectHTML("section", "Map",'view-map'),
    new ObjectHTML("section", "Battle",'select-attack'),
    new ObjectHTML("div", "Attacks Ally",'attacks-ally'),
    new ObjectHTML("div", "Attacks Enemy",'attacks-enemy'),
    new ObjectHTML("div", "Result Battles", 'result-battles'),
    new ObjectHTML("div", "Cards Pets",'cards-pets'),
    new ObjectHTML("div", "Cards Attacks",'cards-attacks'),
    new ObjectHTML("button", "Select Pet",'btn-select-pet'),
    new ObjectHTML("button", "Reset",'btn-reset'),
    new ObjectHTML("button", "Random Enemy",'btn-random-enemy'),
    new ObjectHTML("button", "Online",'btn-online'),
    new ObjectHTML("button", "Init Battle",'btn-battle'),
    new ObjectHTML("span", "Result",'print-result'),
    new ObjectHTML("span", "Lifes Ally",'lifes-ally'),
    new ObjectHTML("span", "Lifes Ally Bar",'lifes-ally-bar'),
    new ObjectHTML("span", "Pet Ally",'pet-ally'),
    new ObjectHTML("span", "Lifes Enemy",'lifes-enemy'),
    new ObjectHTML("span", "Lifes Enemy Bar",'lifes-enemy-bar'),
    new ObjectHTML("span", "Enemy Battle",'span-battle'),
    new ObjectHTML("span", "Ally Online",'span-online'),
    new ObjectHTML("span", "Pet Enemy",'pet-enemy'),
    new ObjectHTML("span", "ID Enemy",'enemy-id'),
    new ObjectHTML("span", "Pet Selected",'pet-selected'),
    new ObjectHTML("img", "Face Ally",'face-ally'),
    new ObjectHTML("img", "Face Selected",'face-selected'),
    new ObjectHTML("img", "Face Enemy",'face-enemy')
]   /*Objects from HTML*/

const map = document.getElementById('canvas-map')   //HMTL Canvas
const maxWidthMap = 525                             //Max width for canvas
const mapBackground = new Image()
const nominalSpeed = 5                              //Speed pixel on canvas

/*  Let Section */
let idealHeight                                     //Ideal height for canvas
let widthMap = window.innerWidth - 20               //width for canvas
let buttonsAttack                                   //Buttons HTML for Attacks
let attacks = [
    new Attack("Splash Gun", 'Water', '💧', 5),
    new Attack("Hydroshock", 'Water', '💧', 7.5),
    new Attack("Blade Whip", 'Plant', '🌱', 5),
    new Attack("Nature Force", 'Plant', '🌱', 7.5),
    new Attack("Flame Ax", 'Fire', '🔥', 5),
    new Attack("Magma Blow", 'Fire', '🔥', 7.5),
    new Attack("Regular Punch", 'Normal', '🧿', 2),
    new Attack("Ancestral Zen", 'Normal', '🧿', 4)
]                                                   //Attacks list for mokepons
let mokepones = [
    new Mokepon("Hipodoge", 100, "Water", 
        ["Splash Gun", 'Hydroshock', 'Regular Punch', 'Blade Whip', 'Flame Ax']),
    new Mokepon("Ratigueya", 100, "Fire", 
        ['Flame Ax', 'Magma Blow', 'Regular Punch', 'Splash Gun', 'Blade Whip']),
    new Mokepon("Capipepo", 100, "Plant",
        ['Blade Whip', 'Nature Force', 'Regular Punch', 'Flame Ax', 'Splash Gun']),
    new Mokepon("Panxian", 85, "Normal", 
        ['Regular Punch', 'Ancestral Zen', 'Blade Whip', 'Flame Ax', 'Splash Gun'])
]                                                   //Mokepons lists
let inputsHTML = []                                 //List of inputs HTML                    
let ally = new Player("Ally", "ally")               //Ally player
let enemyBattle                                     //Enemy player selected
let enemies = []                                    //List of enemies on canvas
let intervalDraw                                    //Interval for draw enemies and ally
let intervalInBattle                                //Interval for set player in battle
let intervalEnemy                                   //Interval for get enemy sequence attack
let intervalAskBattle                               //interval for ask from other players
let canvasMap = map.getContext("2d")                //Map
let numturn = 0                                     //Count truns of battle
let inAttackBattle = false                          //set actually in battle     

/*  Declaration*/
mapBackground.src = './assets/moke_map.png'
if (widthMap > maxWidthMap) {
    widthMap = maxWidthMap - 20
}

idealHeight = widthMap * 600 / 800

map.width = widthMap
map.height = idealHeight



/*  Function Section */
/*Function for get random numbers in [min, max] with scale {multiple}*/
function randomFunc(min, max, multiple) {
    return Math.ceil(Math.floor(Math.random() * (max - min + 1) + min) / multiple) * multiple
}
/*Function to strat game*/
function startGame() {
    let inputPet

    // Show Section Pet, Hide Section Map and Battle
    objectsHTML.find(obj => obj.name === "Pet").setDisplay('flex')
    objectsHTML.find(obj => obj.name === "Map").setDisplay('none')
    objectsHTML.find(obj => obj.name === "Battle").setDisplay('none')
    //  Creat inputs Pets
    mokepones.forEach((mokepon) => {
        inputPet = `<input type="radio" name="pet" id=${mokepon.id} />
            <label class="card_pet" for=${mokepon.id}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.picBody} alt=${mokepon.name}>
            </label>`
        objectsHTML.find(object => object.name === "Cards Pets").appendHTML(inputPet)

        objectsHTML.push(new ObjectHTML('input', mokepon.name, mokepon.id))
    })
    
    // Events Listener for Buttons Select Pet, Reset, Random Enemy and Join/Disconnect Online
    objectsHTML.find(obj => obj.name === "Select Pet").element.addEventListener('click', selectPetAlly)

    objectsHTML.find(obj => obj.name === "Reset").element.addEventListener('click', resetGame)
    
    window.onbeforeunload = closingCode;
}
/*Function for select pet*/
function selectPetAlly() {
    let isChecked = false
    let selMokepon = null
    numturn = 0

    objectsHTML.filter(obj => obj.type === 'input').forEach((input) => {
        input.setElement()
        //Verify wich mokepon is selected
        if (input.element.checked) {
            isChecked = true
            selMokepon = mokepones.find(mokepon => mokepon.name === input.name)
            //console.log(input.name +": "+input.element.checked)
        }
    })
    //Alert no pet selected
    if (!isChecked) {
        alert('Select your Pet')
        return
    }
    
    ally.setMokepon(selMokepon)                                             //Update mokepon on Plaer Ally
    objectsHTML.find(obj => obj.name === "Face Ally").setSRC(ally.face)     //Set face on battle screen
    objectsHTML.find(obj => obj.name === "Lifes Ally").setHTML(ally.life)   //Set life on battle screen
    objectsHTML.find(obj => obj.name === "Lifes Ally Bar").setWidth('100%') //Set bar on battle screen
    objectsHTML.find(obj => obj.name === "Pet Ally").setHTML(ally.pet)      //Set pet name on battle screen
    objectsHTML.find(obj => obj.name === "Pet Selected").setHTML(ally.pet)  //Set pet name on map screen
    objectsHTML.find(obj => obj.name === "Face Selected").setSRC(ally.face) //Set face on map screen
    ally.mokepon.randomLocation()                                           //Set random location for mokepon ally on map
    /*Start map Screen*/
    startMap()
}
/*Function to show battle screen with attack ally and enemy*/
function showAttacks(mokeponAlly) {
    objectsHTML.find(obj => obj.name === "Map").setDisplay('none')  //Hide Map screen

    let attackPet
    //Create button for attacks
    mokeponAlly.attacks.forEach((attack) => {
        attackPet = `<button id=${attack.id} class="btn_attack BAttack">${attack.name} ${attack.symbol}</button>`

        objectsHTML.find(obj => obj.name === "Cards Attacks").appendHTML(attackPet)
    })

    buttonsAttack = document.querySelectorAll('.BAttack')

    objectsHTML.find(obj => obj.name === "Battle").setDisplay('flex')   //Show battle screen
    sequenceAttacksAlly()   //Select sequence attack ally
}
/*Functon start map screen*/
function startMap() {
    objectsHTML.find(obj => obj.name === "Pet").setDisplay('none')  //Hide Select mokepon screen

    intervalDraw = setInterval(drawCanvas, 50)  //Interval to run draw on map
    
    window.addEventListener('keydown', onPressKey)  //Listen keydown

    window.addEventListener('keyup', stopMove)  //Listen keyup
    //Button random enemy
    objectsHTML.find(obj => obj.name === "Random Enemy").element.addEventListener('click', randomEnemy)
    //BUtton connect online
    objectsHTML.find(obj => obj.name === "Online").element.addEventListener('click', onlineGame)
    //Button Init battle with a enemy
    objectsHTML.find(obj => obj.name === "Init Battle").element.addEventListener('click', initBattle)
    objectsHTML.find(obj => obj.name === "Init Battle").setDisabled()

    objectsHTML.find(obj => obj.name === "Map").setDisplay('flex')  //Show Map Screen
}
/*Function Init battle*/
function initBattle() {
    //Get pet enemy name
    const petName = objectsHTML.find(obj => obj.name === "Enemy Battle").getTextContent()
    //Get enemy id
    const enemyID = objectsHTML.find(obj => obj.name === "ID Enemy").getTextContent()
    //Ask player battle with enemy
    if(confirm('Fight against ' + enemyID + " with " + petName)){
        ally.startBattle()  //Set ally in batle
        intervalInBattle = setInterval(sendInBattle, 100)   //Update on server
        if(enemyID === "Random") {  //Enemy random local
            enemyBattle = enemies.find((player) => player.name === enemyID)
            showAttacks(ally.mokepon)   //Show battle screen
            objectsHTML.find(obj => obj.name === "Face Enemy").setSRC(enemyBattle.face) //Set face on battle screen
            objectsHTML.find(obj => obj.name === "Lifes Enemy").setHTML(enemyBattle.life)//Set life on battle screen
            objectsHTML.find(obj => obj.name === "Lifes Enemy Bar").setWidth('100%')//Set bar on battle screen
            objectsHTML.find(obj => obj.name === "Pet Enemy").setHTML(enemyBattle.pet)//Set pet name on battle screen
        } else {    //Enemy online
            enemyBattle = enemies.find((player) => player.id === enemyID)
            sendAskBattle(enemyID, 'true', ally.id, ally.pet, "battle", numturn)    //Ask for battle to enemy online
        }
    }
}
/*Function Draw Canvas*/
function drawCanvas() {
    ally.mokepon.updateSpeed()  //Update speed for mokepon ally
    canvasMap.clearRect(0, 0, map.width, map.height)
    canvasMap.drawImage(mapBackground, 0, 0, map.width, map.height)

    ally.mokepon.drawMokepon()  //Draw mokepon ally
    sendStatus(ally)            //Update status player on server
    getEnemies()                //get enemies online
    //Drw every enemies on map
    enemies.forEach(function (player) {
        player.mokepon.drawMokepon()
    })
    //Check collition with a enemy
    enemies.forEach(function (player) {
        if(enemyBattle === undefined) {
            if((ally.mokepon.checkCollision(player.mokepon))) {
                //Enable button battle enemy with this enemy
                objectsHTML.find(obj => obj.name === "Init Battle").setEnabled()
                objectsHTML.find(obj => obj.name === "Enemy Battle").setHTML(player.mokepon.name)
                objectsHTML.find(obj => obj.name === "ID Enemy").setHTML(player.name)
            } else if(objectsHTML.find(obj => obj.name === "ID Enemy").getTextContent() === player.id) {
                //Disable buttton battle enemy when no collition with this enemy
                objectsHTML.find(obj => obj.name === "Init Battle").setDisabled()
                objectsHTML.find(obj => obj.name === "Enemy Battle").setHTML("Pet")
                objectsHTML.find(obj => obj.name === "ID Enemy").setHTML("Enemy")
            }
        }
    })
    //No enemmies button batle disble
    if(enemies.length === 0) {
        objectsHTML.find(obj => obj.name === "Init Battle").setDisabled()
        objectsHTML.find(obj => obj.name === "Enemy Battle").setHTML("Pet")
        objectsHTML.find(obj => obj.name === "ID Enemy").setHTML("Enemy")
    }
}
/*Function to get opposite direction*/
function moveOpposite(mokepon) {
    if(mokepon.speedX != 0) {
        if(mokepon.speedX < 0) {
            moveRight(3)
        } else {
            moveLeft(3)
        }
    } else if(mokepon.speedY != 0) {
        if(mokepon.speedY < 0) {
            moveDown(3)
        } else {
            moveUp(3)
        }
    }
}
/*Function to move right*/
function moveRight(multiplier = 1) {
    ally.mokepon.setSpeedX(nominalSpeed*multiplier)
}
/*Function to move left*/
function moveLeft(multiplier = 1) {
    ally.mokepon.setSpeedX(nominalSpeed*(-1)*multiplier)
}
/*Function to move down*/
function moveDown(multiplier = 1) {
    ally.mokepon.setSpeedY(nominalSpeed*multiplier)
}
/*Function to move up*/
function moveUp(multiplier = 1) {
    ally.mokepon.setSpeedY(nominalSpeed*(-1)*multiplier)
}
/*Function to stop move*/
function stopMove() {
    ally.mokepon.setSpeedX(0)
    ally.mokepon.setSpeedY(0)
}
/*Function when press/touch a key*/
function onPressKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            break
    }
}
/*Function for reset game*/
function resetGame() {
    location.reload()
}
/*Fucntion to create a random enemy*/
function randomEnemy() {
    const indexMokeponEnemy = randomFunc(0, mokepones.length - 1, 1)    //get a random mokepon
    enemies = enemies.filter(player => player.name !== "Random")        //Name for player
    enemies.push(new Player("Random", "enemy"))                         //Create a enemy
    enemies.find(player => player.name === "Random").setMokepon(mokepones[indexMokeponEnemy])   //Set mokepon random
    enemies.find(player => player.name === "Random").mokepon.randomLocation()                   //Set random location on map
    //console.log(enemies.find(player => player.name === "Random"))
}
/*Fucntion to select sequence attack ally*/
function sequenceAttacksAlly() {
    buttonsAttack.forEach((button) => {
        button.addEventListener('click', (e) => {
            attacks.forEach((attack) => {
                if (e.target.textContent === attack.name + " " + attack.symbol) {
                    //console.log(e.target.textContent === (attack.name + " " + attack.symbol))
                    if(ally.sequence.length === 5) {
                        ally.cleanSequence()
                    }
                    ally.pushSequence(attack)
                    button.style.background = '#112f58'
                    button.disabled = true
                }
            })
            if (ally.sequence.length === 5) {
                inAttackBattle = true
                sendSequence(ally.getSequence())    //Update sequence ally on server
                numturn++               //Increment tunr
                sequenceAttacksEnemy()  //Get sequence attack enemy
            }
        })
    })
}
/*Function for reset buttons attack*/
function resetBtnAtks() {
    buttonsAttack.forEach((button) => {
        button.style.background = '#11468F'
        button.disabled = false
    })
}
/*Function for disble buttons attack*/
function disabledBtnAtks() {
    buttonsAttack.forEach((button) => {
        button.style.background = '#112f58'
        button.disabled = true
    })
}
/*Function for get sequence attack enemy*/
function sequenceAttacksEnemy() {
    let arrayAttacks = []
    if(enemyBattle.name === "Random") { //For random enemy
        //Shuffle atack of mokepon enemy
        for (let i = 0; i < enemyBattle.mokepon.attacks.length; i++) {
            arrayAttacks.push(enemyBattle.mokepon.attacks[i])
        }
        //Set sequence attack enemy
        for (let i = 0; i < 5; i++) {
            enemyBattle.pushSequence(arrayAttacks.splice(randomFunc(0, arrayAttacks.length - 1, 1), 1)[0])
        }
        startBattle()   //Start battle screen
    } else {        
        intervalEnemy = setInterval(getEmenySequence,50)    //Interval to get sequnce enemy
    }
}
/*Function to star battle with enemy*/
function startBattle() {
    cleanInterval(intervalEnemy)
    const numbattles = (ally.sequence.length > enemyBattle.sequence.length) ? enemyBattle.sequence.length : ally.sequence.length
    let result = "N/A"
    //Messages for start battle
    createMsgAtk(ally, enemyBattle, 0, 'hr')    
    createMsgAtkResult("Start Battle", 'p')
    //console.log("Start Battle "+numturn)
    for (let i = 0; i < numbattles; i++) {
        //console.log(i+" Ally: "+ally.sequence[i].name+"|Enemy: "+enemyBattle.sequence[i].name)
        if (ally.life > 0 && enemyBattle.life > 0) { //Aly and enemy no defeat
            if ((ally.sequence[i].type === enemyBattle.sequence[i].type) || 
                (ally.sequence[i].type === "Normal" || enemyBattle.sequence[i].type === "Normal")) { //Tied result
                result = "Tied"
                //Update both ally and enemy life
                updateLifes(ally, enemyBattle, i, result)
                updateLifes(enemyBattle, ally, i, result)
            } else if ((ally.sequence[i].type === "Fire" && enemyBattle.sequence[i].type === "Plant") || 
            (ally.sequence[i].type === "Water" && enemyBattle.sequence[i].type === "Fire") || 
            (ally.sequence[i].type === "Plant" && enemyBattle.sequence[i].type === "Water")) {  //Winner result
                result = "Winner"
                updateLifes(enemyBattle, ally, i, result) //Update enemy life
            } else {    //Loser result
                result = "Loser"
                updateLifes(ally, enemyBattle, i, result) //Update ally life
            }
            //Messages for every attack on battle
            createMsgAtk(ally, enemyBattle, i, 'p')
            createMsgAtkResult(result, 'p')
        }
    }
    //Messages for end turn battle
    createMsgAtk(ally, enemyBattle, 0, 'hr')
    createMsgAtkResult("End Turn " + numturn, 'p')
    //console.log("Lifes: Ally: "+ally.life+"|Enemy: "+enemyBattle.life)
    enemyBattle.cleanSequence() //Clear sequence attack enemy
    if (ally.life > 0 && enemyBattle.life > 0) {    //Enemy and Ally no defeat
        if(enemyBattle.name === "Random") { //Random Enemy
            ally.cleanSequence()    //Clean seuqnce attack ally
            resetBtnAtks()  //reset buttons attacks
        } else {    //Online Enemy
            //console.log("Continue")
            sendAskBattle(enemyBattle.id, 'true', ally.id, ally.pet, "continue-battle", numturn) // ask for continue battle
            intervalAskBattle = createInterval(getAskBattle, ally, 50)  //Wait and get respond
        }
    } else {    //Someone (enemy or ally) defeat
        disabledBtnAtks()   //Disable buttons attacks
        if(enemyBattle.name === "Random") { //Random enemy
            if(ally.life === 0) {   //Ally lose
                createMsgEndBattle("I'm sorry, You Lose :(")
            } else if(enemyBattle.life === 0) { //Enemy lose
                createMsgEndBattle("Congratulations, You Winner :)")
            }
        } else {    //Online enemy
            //console.log("End")
            sendAskBattle(enemyBattle.id, 'true', ally.id, ally.pet, "end-battle", numturn) //Send end battle to enemy
            intervalAskBattle = createInterval(getAskBattle, ally, 50)  //Wait and get respond
        }
    }
    //console.log("End Battle "+numturn)
}
/*Function update life of players*/
function updateLifes(player_ally, player_enemy, indexAtk, result) {
    //get power from attack
    if(indexAtk >= 0) {
        player_ally.updateLife(calcAtk(player_enemy.sequence[indexAtk], player_enemy.mokepon, player_ally.mokepon, player_ally.sequence[indexAtk], result), "-")
    }
    //Update visual life
    objectsHTML.find(obj => obj.name === "Lifes " +toTitleCase(player_ally.type)+ " Bar").setHTML(player_ally.life)
    objectsHTML.find(obj => obj.name === "Lifes " +toTitleCase(player_ally.type)+ " Bar").setWidth(calcPercent(toTitleCase(player_ally.type)) + '%')
    let color = getBackground(calcPercent(toTitleCase(player_ally.type)))
    objectsHTML.find(obj => obj.name === "Lifes " +toTitleCase(player_ally.type)+ " Bar").setBackground(color)
    //console.log("Lifes " +toTitleCase(player_ally.type)+ " Bar: "+ color)
}
/*Function get color for life bar*/
function getBackground(percent) {
    let color
    if(percent > 50) {
        color = '#00ff00'   //Green
    } else if(percent > 20) {
        color = '#ff9d00'   //Orange
    } else {
        color = '#ff0000'   //Red
    }
    //console.log("Percent: "+percent+"Color: "+color)
    return color
}
/*Function calculate percent of life to life bar*/
function calcPercent(name) {
    return ((objectsHTML.find(obj => obj.name === "Lifes " + name + " Bar").getTextContent() * 100) / objectsHTML.find(obj => obj.name === "Lifes " + name).getTextContent())    
}
/*Function calculate final power attack*/
function calcAtk(attack_ally, mkpn_ally, mkpn_enemy, attack_enemy, result) {
    let multiplier = 1
    
    if((attack_ally.type !== attack_enemy.type) && (result !== "Tied")) {   //Winner attack 
        if((attack_ally.type === "Water") && (mkpn_enemy.type === "Plant") ||
            (attack_ally.type === "Plant") && (mkpn_enemy.type === "Fire") ||
            (attack_ally.type === "Fire") && (mkpn_enemy.type === "Water")) {   //Winner attack type weak to pet enemy type
            multiplier *= 0.5
        } else if((attack_ally.type === "Water") && (mkpn_enemy.type === "Fire") ||
            (attack_ally.type === "Plant") && (mkpn_enemy.type === "Water") ||
            (attack_ally.type === "Fire") && (mkpn_enemy.type === "Plant")) {   //Winner attack type strong to pet enemy type
            multiplier *= 2
        }
    } else {    //Tied attack
        if(attack_ally.type === mkpn_ally.type) { //Attack type same to pet type
            multiplier *= 1.25  //Boost form same type on pet, attack
        }
        multiplier *= 0.1   //Weak attack for tied
    }
    //console.log("Atk: "+attack_ally.type+"["+mkpn_ally.type+"|"+mkpn_enemy.type+"]"+": "+(attack_ally.power*multiplier))
    return attack_ally.power*multiplier
}
/*Function create message end battle*/
function createMsgEndBattle(result) {
    objectsHTML.find(obj => obj.name === "Result").setHTML(result)
}
/*Function create meassage sequence attack*/
function createMsgAtk(ally, enemy, indexAtk, tag) {
    let objectHTMLPlayer = document.createElement(tag)
    if(tag !== 'hr') {
        objectHTMLPlayer.innerHTML = ally.sequence[indexAtk].symbol + " " + ally.sequence[indexAtk].name
    }
    objectsHTML.find(obj => obj.name === "Attacks Ally").appendChildHTML(objectHTMLPlayer)

    objectHTMLPlayer = document.createElement(tag)
    if(tag !== 'hr') {
        objectHTMLPlayer.innerHTML = enemy.sequence[indexAtk].name + " " + enemy.sequence[indexAtk].symbol
    }
    objectsHTML.find(obj => obj.name === "Attacks Enemy").appendChildHTML(objectHTMLPlayer)
}
/*Function create messages result attack*/
function createMsgAtkResult(result, element) {
    let objectHTMLPlayer = document.createElement(element)
    if(element !== 'hr') {
        objectHTMLPlayer.innerHTML = result
    }
    objectsHTML.find(obj => obj.name === "Result Battles").appendChildHTML(objectHTMLPlayer)
}
/*Function to string title case*/
function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}
/*Function online*/
function onlineGame() {
    if(ally.id !== 'na') {
        disconnectGame(ally.id)
    } else {
        connectGame()
    }
}
/*Funtion connect online*/
function connectGame() {
    disconnectGame(ally.id)
    fetch(`${gameURL}connect`)
    .then((ans) => {
        if (ans.ok) {
            ans.text()
                .then((answer) => {
                    console.log(answer);
                    ally.setID(answer)
                    objectsHTML.find(obj => obj.name === "Ally Online").setHTML("Disconnect")
                    sendMokepon(ally.mokepon)
                    intervalAskBattle = createInterval(getAskBattle, ally, 1000)
                })
        }
    })
}
/*Funtion disconnect online*/
function disconnectGame(playerID) {
    if(ally.id != "na") {
        fetch(`${gameURL}disconnect/${playerID}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: playerID
            })
        })
        ally.setID("na")
        objectsHTML.find(obj => obj.name === "Ally Online").setHTML("Connect")
    }
}
/*Funtion send mokepon to server*/
function sendMokepon(pet) {
    if(ally.id != "na") {
        fetch(`${gameURL}mokepon/${ally.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mokepon: pet.name
            })
        })
    }
}
/*Funtion send player in battle*/
function sendInBattle() {
    if(ally.id != "na") {
        console.log("In Battle: |"+ally.battle+"|")
        fetch(`${gameURL}${ally.id}/inBattle`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                battle: ally.battle
            })
        })
    }
    clearInterval(intervalInBattle)
}
/*Funtion send ask to online player*/
function sendAskBattle(enemyID, askBattle, askID, askPet, askAnswer, askTurn) {
    if(ally.id != "na") {
        console.log("Send Ask Battle: |"+enemyID+"|"+askBattle+"|"+askID+"|"+askPet+"|"+"|"+askAnswer+"|"+askTurn+"|")
        fetch(`${gameURL}${enemyID}/SetAskBattle`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ask: askBattle,
                id: askID,
                pet: askPet,
                answer: askAnswer,
                turn: askTurn
            })
        })
    }
}
/*Funtion get respond for a ask player*/
function getAskBattle(player) {
    let playerAux = null
    if(ally.id != "na") {
        fetch(`${gameURL}${player.id}/GetAskBattle`)
            .then(function (res) {
                if (res.ok) {
                    res.json()
                    .then(function ({askArray}) {
                        if(askArray[0] !== player.askBattle) {
                            player.setAskBattle(askArray[0], askArray[1], askArray[2], askArray[3])
                            //console.log("Get Ask: "+player.askBattle+"Answer: "+player.askAnswer+" Player["+player.askID+","+player.askPet+"]")
                            if((!player.battle) && (askArray[3] === "battle")) {    //request battle for online player
                                if(confirm('Fight against ' + askArray[1] + " with " + askArray[2])) {  //Accept battle
                                    ally.startBattle()  //Ally in battle
                                    playerAux =  new Player(askArray[1], "enemy")
                                    playerAux.setID(askArray[1])
                                    getStatus(playerAux)    //Get status from enemy online
                                    sendAskBattle(ally.id, 'false', "na", "na", "na")   //reset ask ally
                                    sendAskBattle(askArray[1], 'true', ally.id, ally.pet, "accept-battle")  //Send respond to enemy online
                                    showAttacks(ally.mokepon)   //Show battle screen
                                } else {    //reject battle
                                    ally.setAskBattle('false', "na", "na", "na")
                                    sendAskBattle(ally.id, 'false', "na", "na", "na", numturn)
                                    sendAskBattle(askArray[1], 'true', ally.id, ally.pet, "reject-battle", numturn)
                                }
                            } else if(player.battle && (askArray[3] === "accept-battle")) { //Receive accept request battle from enemy online
                                //console.log("Get AskBattle|Enemy: "+askArray[1]+" accept battle")
                                clearInterval(intervalDraw) //Stop interval draw map
                                playerAux =  new Player(askArray[1], "enemy")
                                playerAux.setID(askArray[1])
                                getStatus(playerAux)    //Get status from enemy online
                                sendAskBattle(ally.id, 'false', "na", "na", "na", numturn)  //reset ask ally
                                showAttacks(ally.mokepon)   //Show battle screen
                            } else if(player.battle && (askArray[3] === "reject-battle")) { //receive reject request battle from enemy online
                                //console.log("Get AskBattle|Enemy: "+askArray[1]+" reject battle")
                                ally.endBattle()    //Ally no in battle
                                ally.setAskBattle('false', "na", "na", "na")  //reset ask ally
                                sendAskBattle(ally.id, 'false', "na", "na", "na", numturn)  //reset ask ally
                            } else if(player.battle && (askArray[3] === "continue-battle")) {   //Continue with turn of battle
                                //console.log("Get AskBattle|Enemy: "+askArray[1]+" continue battle "+askArray[4])
                                resetBtnAtks()  //reset buttons attacks
                                enemyBattle.cleanSequence() //Clear sequence enemy
                                inAttackBattle = false
                                sendAskBattle(ally.id, 'false', "na", "na", "na", numturn)  //reset ask ally
                                getEmenyLife()  //Update life enmy from server
                            } else if(player.battle && (askArray[3] === "end-battle")) {    //End battle enemy
                                //console.log("Get AskBattle|Enemy: "+askArray[1]+" end battle "+askArray[4])
                                sendAskBattle(ally.id, 'false', "na", "na", "na", numturn)  //reset ask ally
                                //Create mesage result battle
                                if(ally.life === 0) {
                                    createMsgEndBattle("I'm sorry, You Lose :(")
                                } else if(enemyBattle.life === 0) {
                                    createMsgEndBattle("Congratulations, You Winner :)")
                                }
                            } else {
                                console.log("Clean")
                                cleanInterval(intervalAskBattle) //Stop get ask player
                            }
                        }
                    })
                }
            })
    }
}
/*Function get enemies no inbattle online*/
function getEnemies() {
    let playersEnemies = []  //Players enemies online
    if(ally.id != "na") {
        fetch(`${gameURL}${ally.id}/Enemies`)
            .then(function (res) {
                if(res.ok) {
                    res.json()
                    .then(function ({enemiesOnline}) {
                        playersEnemies = enemiesOnline.map(function (playersOnline) {
                            return playersOnline
                        })
                        
                        enemies = enemies.filter((enemy) => enemy.name === "Random") //Delete enemeies except Random
                        //Add enemies online no in battle
                        playersEnemies.forEach((enemy) => {
                            enemies.push(new Player(enemy.id, "enemy"))
                            enemies.find((player) => player.name === enemy.id).setID(enemy.id)
                            enemies.find((player) => player.name === enemy.id).updateLife(enemy.life, "=")
                            enemies.find((player) => player.name === enemy.id).setMokepon(mokepones.find(mokepon => mokepon.name === enemy.mokepon))
                            enemies.find((player) => player.name === enemy.id).mokepon.x = enemy.x
                            enemies.find((player) => player.name === enemy.id).mokepon.y = enemy.y
                        })
                    })
                }
            })
    }
}
/*Function get enemy life online on server*/
function getEmenyLife() {
    if(ally.id != "na") {
        fetch(`${gameURL}${enemyBattle.id}/Enemy/Life`)
        .then((ans) => {
            if (ans.ok) {
                ans.text()
                    .then((answer) => {
                        console.log(answer);
                        objectsHTML.find(obj => obj.name === "Lifes Enemy Bar").setWidth(calcPercent("Enemy") + '%')
                        let color = getBackground(calcPercent("Enemy"))
                        objectsHTML.find(obj => obj.name === "Lifes Enemy Bar").setBackground(color)
                    })
            }
        })
    }
}
/*Function get sequnce attack enemyonline*/
function getEmenySequence() {
    let sequenceEnemy = []  //sequence attack enemy
    if(ally.id != "na") {
        fetch(`${gameURL}${enemyBattle.id}/Enemy/Sequence`)
        .then((ans) => {
            if (ans.ok) {
                ans.json()
                    .then(function ({sequenceJSON}) {
                        sequenceEnemy = sequenceJSON.map(function (playerBattle) {
                            return playerBattle
                        })
                        //Set sequence on enemy
                        sequenceEnemy.forEach((sequence) => {
                            //console.log("Enemy: "+enemyBattle.sequence.length+" Ally: "+ally.sequence.length)
                            enemyBattle.cleanSequence()
                            enemyBattle.setSquence(sequence)
                            if((enemyBattle.sequence.length !== 0) && (ally.sequence.length !== 0) && 
                            (enemyBattle.sequence.length === ally.sequence.length)&&inAttackBattle){
                                startBattle()
                            }
                            //console.log("GES Enemy: "+enemyBattle.sequence.length+" Ally: "+ally.sequence.length)
                        })
                    })
            }
        })
    }
}
/*Fucntion get status on server from a player*/
function getStatus(player) {
    let arrayStatus = [] //Status from player
    if(ally.id != "na") {
        fetch(`${gameURL}${player.id}/Status`)
            .then(function (res) {
                if(res.ok) {
                    res.json()
                    .then(function ({status}) {
                        arrayStatus = status.map(function (playerBattle) {
                            return playerBattle
                        })
                            
                        arrayStatus.forEach((status) => {
                            if(player.type === "enemy") { //Enemy player
                                if(enemyBattle === undefined) { //New enemy
                                    enemyBattle = new Player(status.id, "enemy")
                                    enemyBattle.setID(status.id)
                                    enemyBattle.updateLife(status.life, "=")
                                    enemyBattle.setMokepon(mokepones.find(mokepon => mokepon.name === status.mokepon))
                                } else {    //Enemy exist
                                    enemyBattle.setStatus(status.mokepon, status.sequence, status.life, status.battle, status.x, status.y)
                                }
                                objectsHTML.find(obj => obj.name === "Face Enemy").setSRC(enemyBattle.face)
                                objectsHTML.find(obj => obj.name === "Lifes Enemy").setHTML(enemyBattle.mokepon.life)
                                objectsHTML.find(obj => obj.name === "Lifes Enemy Bar").setWidth(calcPercent(toTitleCase(enemyBattle.type)) + '%')
                                let color = getBackground(calcPercent(toTitleCase(enemyBattle.type)))
                                objectsHTML.find(obj => obj.name === "Lifes Enemy Bar").setBackground(color)
                                objectsHTML.find(obj => obj.name === "Pet Enemy").setHTML(enemyBattle.pet)
                                updateLifes(enemyBattle, ally, -1, "result")
                            } else if(player.type === "ally") { //Ally player
                                ally.setStatus(status.mokepon, status.sequence, status.life, status.battle, status.x, status.y)
                            }
                        })
                    })
                }
            })
    }
}
/*Function send seuqnce attacks ally*/
function sendSequence(arraySequence) {
    if(ally.id != "na") {
        //console.log("Ask Battle: |"+enemyID+"|"+askBattle+"|"+"|"+askID+"|"+"|"+askPet+"|")
        fetch(`${gameURL}${ally.id}/Sequence`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sequence: arraySequence
            })
        })
    }
}
/*Function send status player on server*/
function sendStatus(player) {
    if(ally.id != "na") {
        //console.log("Ask Battle: |"+enemyID+"|")
        fetch(`${gameURL}${player.id}/Status`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mokepon: player.mokepon.name,
                sequence: player.getSequence(),
                life: player.life,
                battle: player.battle,
                x: player.mokepon.x,
                y: player.mokepon.y
            })
        })
    }
}
/*Function closing navigator o reset page*/
function closingCode(){
   console.log("Ally: " + ally.id)
   disconnectGame(ally.id)
   return null;
}
/*Function create interval with params*/
function createInterval(myFunction, param0, intervalTime) {
    return setInterval(function() { myFunction(param0); }, intervalTime)
}
/*Funtion clear interval*/
function cleanInterval(intervalID) {
    clearInterval(intervalID)
}
/*When page end load start game*/
window.addEventListener('load', startGame)