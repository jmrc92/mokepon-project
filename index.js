const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

let players = []    //Player list

class Player {
    constructor(id) {
        this.id = id                //Player ID
        this.mokepon = null         //Mokepon name
        this.sequence = []          //Seuqnce attack string of names
        this.life = 0               //Mokepon life on battle
        this.battle = false         //Player in battle
        this.askBattle = 'false'    //Ask for something to player
        this.askID = "na"           //Id from player ask
        this.askPet = "na"          //Pet from player ask
        this.askAnswer = "na"       //Answer from player ask
        this.askTurn = 0            //Turn of battle
        this.x = 0                  //Position X for mokepon player
        this.y = 0                  //Position Y for mokepon player
    }
    //Set status player
    setStatus(mokepon, sequence, life, battle, x, y) {
        this.mokepon = mokepon
        this.sequence = sequence
        this.life = life
        this.battle = battle
        this.x = x
        this.y = y
    }
    //Set ask request player
    setAskBattle(ask, id, pet, answer, turn) {
        this.askBattle = ask
        this.askID = id
        this.askPet = pet
        this.askAnswer = answer
        this.askTurn = turn
        //console.log("Set: "+this.askBattle+"|"+this.askID+"|"+"|"+this.askPet+"|"+"|"+this.askAnswer+"|")
    }
    //Set player in battle
    startBattle() {
        this.battle = true
    }
    //Set mokepon for player
    setMokepon(pet) {
        this.mokepon = pet
    }
    //Set life mokepon for player
    setLife(life) {
        this.life = life
    }
    //Set sequence attack for player
    setSequence(sequence) {
        this.sequence = sequence
    }
    //Update position for mokepon player
    updatePosition(x, y) {
        this.x = x
        this.y = y
    }
}
//Get list of players
app.get("/listID", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(players)
})
//Add new player
app.get("/connect", (req, res) => {
    let id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")
    //console.log(players)
    res.send(id)
})
//Set mokepon player
app.post("/mokepon/:playerID", (req, res) => {
    const playerID = req.params.playerID || ""
    const pet = req.body.mokepon || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    if(index >= 0) {
        players[index].setMokepon(pet)
    }
    //console.log("ID: "+playerID+" Pet: "+pet+" index: "+index)
    res.end()
})
//Set player in battle
app.post("/:playerID/inBattle", (req, res) => {
    const playerID = req.params.playerID || ""
    const battle = req.body.battle
    const index = players.findIndex((player) =>  playerID === player.id)
    if(index >= 0) {
        players[index].battle = battle
    }
    //console.log("ID: "+playerID+" Pet: "+pet+" index: "+index)
    res.end()
})
//Get ask request battle player
app.get("/:playerID/GetAskBattle", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    const arryaAsk =[
        players[index].askBattle,
        players[index].askID,
        players[index].askPet,
        players[index].askAnswer,
        players[index].askTurn
    ]
    //console.log("GetAsknBattle: "+arryaAsk)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        askArray: arryaAsk || []
    })
})
//Set ask request battle player
app.post("/:playerID/SetAskBattle/", (req, res) => {
    const playerID = req.params.playerID || ""
    const ask = req.body.ask || 'false'
    const id = req.body.id || ""
    const pet = req.body.pet || ""
    const answer = req.body.answer || ""
    const turn = req.body.turn || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    //console.log("SetAskBattle: ID: "+playerID+" Ask: "+ask+"-"+id+"-"+pet+"-"+answer+" index: "+index)
    if(index >= 0) {
        players[index].setAskBattle(ask, id, pet, answer, turn)
    }
    res.end()
})
//Get enemies no in battle
app.get("/:playerID/Enemies", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    const enemiesOnline = players.filter((player) => (players[index].id !== player.id)&&(!player.battle))
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({enemiesOnline})
})
//Get life player
app.get("/:playerID/Enemy/Life", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    let life = `${players[index].life}`
    //const enemiesOnline = players.filter((player) => (players[index].id !== player.id)&&(!player.battle))
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(life)
})
//get status player
app.get("/:playerID/Status", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    const status = [players[index]]
    //console.log(status)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({status})
})
//Get sequence attack player
app.get("/:playerID/Enemy/Sequence", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    const sequenceJSON = [players[index].sequence]
    players[index].sequence = [] 
    //console.log(sequence)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({sequenceJSON})
})
//Set sequence attack player
app.post("/:playerID/Sequence", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)
    const sequence = req.body.sequence || []

    //console.log("Sequence| "+playerID+"["+sequence+"]")
    if(index >= 0) {
        players[index].setSequence(sequence)
    }
    //console.log("Sequence| "+"["+players[index].sequence+"]")
    res.end()
})
//Set status player
app.post("/:playerID/Status", (req, res) => {
    const playerID = req.params.playerID || ""
    const index = players.findIndex((player) =>  playerID === player.id)

    const mokepon = req.body.mokepon || null
    const life = req.body.life || 0
    const battle = req.body.battle || false
    const x = req.body.x || 0
    const y = req.body.y || 0

    //console.log("Status| mokepon: "+mokepon+" sequence: "+sequence+" life: "+life+" battle: "+battle+" askBattle: "+askBattle+" askID: "+askID+" askPet: "+askPet+" x: "+x+" y: "+y/
    if(index >= 0) {
        players[index].setStatus(mokepon, players[index].sequence, life, battle, x, y)
    }
    res.end()
})
//Disconnect a player
app.post("/disconnect/:playerID", (req, res) => {
    const playerID = req.params.playerID || ""

    players = players.filter((player) => playerID !== player.id)

    //console.log("ID: "+playerID)
    res.end()
})

app.listen(8081, () => {
    console.log("Server ON")
})