// assign all the values of the squares in the minefield vector
let minefield = createminefield()

//bombsarray contains all the squares (empty and with mines -> shuffled)
let bombsarray = createbombarray()


document.querySelectorAll(".score")[0].innerHTML = "00:00"
document.querySelectorAll('.score')[1].innerHTML = 0


//the clicks and time

let clicks = 0
let time = 0



// the mines that contain a bomb will get a value of "bomb", rest of the mines get value "notbomb"
assignvaluetomines()
assignflags()
reveal()
countfields()




//assign flags


let flag = `<i class="fas fa-flag"></i>`

function assignflags() {
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 8; j++) {
            minefield[i][j].addEventListener("contextmenu", function (e) {
                e.preventDefault()

                //cannot flag a activated square
                if (this.classList.contains("activated")) {

                } else {
                    //flag the square
                    if (this.getAttribute("flags") % 2 == 0) {
                        this.innerHTML = flag
                        this.style.fontSize = "25px"
                    }

                    //unflag the square with either a bomb or a blank square
                    if (this.getAttribute("flags") % 2 == 1) {
                        if (this.getAttribute("value") == "bomb") {
                            this.innerHTML = `<i class="fas fa-bomb"></i>`
                        } else {
                            this.innerHTML = ""
                        }
                        minefield[i][j].style.fontSize = "0px"
                    }
                }



                this.setAttribute("flags", `${parseInt(this.getAttribute("flags")) + 1}`)
                clicks++
                document.querySelectorAll(".score")[1].innerHTML = clicks
            })
        }
}



// assign all the squares in a vector mines
function createminefield() {

    let mines = new Array()


    for (let i = 0; i < 10; i++) {
        mines[i] = []
        for (let j = 0; j < 8; j++) {
            mines[i][j] = document.querySelectorAll(".minefield div")[i].querySelectorAll("button")[j]
            mines[i][j].cordix = i
            mines[i][j].cordiy = j
            mines[i][j].setAttribute("flags", "0")
            mines[i][j].style.opacity = 0
        }
    }
    return mines;

}



function createbombarray() {

    //set the number of bombs here

    let nrofbombs = 10

    // array to insert the bombs

    let bombsarray = new Array(nrofbombs)
    bombsarray = bombsarray.fill(`<i class="fas fa-bomb"></i>`)

    // array with empty squares
    let nobombsarray = new Array(80 - nrofbombs)
    nobombsarray = nobombsarray.fill("")


    // combine the 2 arrays
    bombsarray = bombsarray.concat(nobombsarray)

    //shuffle the array to make it random
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }


    shuffle(bombsarray)

    return bombsarray;


}


// function to assign the "bomb" value as an attribute to bombs and "notbomb" value to empty squares
function assignvaluetomines() {


    let x = -1

    for (i = 0; i < 10; i++)
        for (j = 0; j < 8; j++) {
            x++



            minefield[i][j].innerHTML = bombsarray[x]

            if (minefield[i][j].innerHTML == `<i class="fas fa-bomb"></i>`) {
                minefield[i][j].setAttribute("value", "bomb")

            } else {
                minefield[i][j].setAttribute("value", "notbomb")
            }

        }

}


// return the number of bombs near a square
function countfields() {

    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 8; j++) {

            let total = 0

            if (i < 9 && minefield[i + 1][j].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (i > 0 && minefield[i - 1][j].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (j < 7 && minefield[i][j + 1].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (j > 0 && minefield[i][j - 1].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (j > 0 && i > 0 && minefield[i - 1][j - 1].value == "bomb" && minefield[i][j].value == "notbomb") total++

            if (j < 7 && i < 9 && minefield[i + 1][j + 1].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (j > 0 && i < 9 && minefield[i + 1][j - 1].value == "bomb" && minefield[i][j].value == "notbomb") total++


            if (j < 7 && i > 0 && minefield[i - 1][j + 1].value == "bomb" && minefield[i][j].value == "notbomb") total++

            if (minefield[i][j].value != "bomb") {
                minefield[i][j].setAttribute("data", total)
            }
        }



}

// trigger for the clock
let starttrigger = true

//start the clock for the game

// a variable that will be later used to stop the clock
let stopinterval = null

let startgame = function () {
    let minutes = 0
    let seconds = 0

    stopinterval = setInterval(function () {
        seconds++

        if (seconds == 60) {
            seconds = 0
            minutes++
        }
        if (seconds < 10) {
            tseconds = "0" + seconds
        } else {
            tseconds = seconds
        }

        if (minutes < 10) {
            tminutes = "0" + minutes
        } else {
            tseconds = minutes
        }
        time = tminutes + ":" + tseconds

        document.querySelectorAll(".score")[0].innerHTML = time

    }, 1000)


}


// activates the square reveal function

function reveal() {
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 8; j++) {
            // clicking on a square -> activate the function of the click
            minefield[i][j].addEventListener("click", () => {

                //indicator if this square is flagged - flagvalue
                let flagvalue = parseInt(minefield[i][j].getAttribute("flags"))


                if (starttrigger) {
                    startgame()
                }
                clicks++
                starttrigger = false



                if (flagvalue % 2 == 0) {
                    document.querySelectorAll(".score")[1].innerHTML = clicks

                    let minefieldtopass = minefield[i][j]
                    click(minefieldtopass)
                } else {
                    alert("Can't open a flagged square")
                }

            })
        }
}



//animate menu and navigate

function animatemenu() {
    let menuoption = document.querySelectorAll(".menu div")

    for (let i = 0; i < menuoption.length; i++) {
        menuoption[i].style.animation = `appear 1s ease-in ${i / 2}s forwards`
    }
    menuoption[0].addEventListener("click", function () {
        document.querySelector(".menu").classList.add("activated")
        document.querySelector(".container").classList.add("activated")
        animateminefield()
    })

    menuoption[1].addEventListener("click", function () {
        document.querySelector(".menu").classList.add("activated")
        document.querySelector(".scores").classList.add("activated")
    })
}


//go back
function goback() {
    let back = document.querySelector(".back")
    back.addEventListener("click", function () {
        document.querySelector(".scores").classList.remove("activated")
        document.querySelector(".menu").classList.remove("activated")
    })

}

goback()

//animate minefield
function animateminefield() {
    for (let i = 0; i < 10; i++)
        for (let j = 0; j < 8; j++) {
            minefield[i][j].style.animation = `minesappear 0.3s forwards`
            minefield[i][j].style.animationDelay = `${0.18 + 0.18 * (i + j)}s`
        }
}



animatemenu()

//function appear gameover => reload on click button
function appeargameover() {
    let screen = document.querySelector(".reload")
    screen.classList.add("triggered")
    let reload = document.querySelector(".reload .button")
    reload.addEventListener("click", function () {
        window.location.reload()
    })

}

// recursive algoritm, activates all the neighbours near the clicked square
function click(minefieldtopass) {
    if (minefieldtopass.getAttribute("flags") % 2 == 1) {

    } else {
        let total = parseInt(minefieldtopass.getAttribute("data"))

        if (total != 0 && minefieldtopass.value != "bomb") {

            minefieldtopass.classList.add("activated")
            minefieldtopass.style.fontSize = "15px"
            minefieldtopass.innerHTML = total
            return
        }

        if (minefieldtopass.value == "bomb") {
            minefieldtopass.classList.add("activated")
            minefieldtopass.style.fontSize = "15px"
            for (let u = 0; u < 10; u++)
                for (let o = 0; o < 8; o++) {
                    minefield[u][o].classList.add("activated")
                    minefield[u][o].style.fontSize = "15px"
                    if (minefield[u][o].value == "bomb") {
                        minefield[u][o].innerHTML = `<i class="fas fa-bomb"></i>`
                    }
                }

            //gameover
            setTimeout(appeargameover, 1000)
        }

        if (minefieldtopass.classList.contains("activated")) return




        checkminefield(minefieldtopass)
    }

}

function checkminefield(minefieldtopass) {
    minefieldtopass.classList.add("activated")
    minefieldtopass.style.fontSize = "15px"

    let x = minefieldtopass.cordix
    let y = minefieldtopass.cordiy

    if (x < 9) {
        newminefield = minefield[x + 1][y]
        click(newminefield)
    }

    if (x > 0) {
        newminefield = minefield[x - 1][y]
        click(newminefield)
    }

    if (y < 7) {
        newminefield = minefield[x][y + 1]
        click(newminefield)
    }
    if (y > 0) {
        newminefield = minefield[x][y - 1]
        click(newminefield)
    }

    if (y > 0 && x > 0) {
        newminefield = minefield[x - 1][y - 1]
        click(newminefield)
    }

    if (y < 7 && x < 9) {
        newminefield = minefield[x + 1][y + 1]
        click(newminefield)
    }


    if (y > 0 && x < 9) {
        newminefield = minefield[x + 1][y - 1]
        click(newminefield)
    }

    if (y < 7 && x > 0) {
        newminefield = minefield[x - 1][y + 1]
        click(newminefield)

    }


}



//Wingame

for (let i = 0; i < 10; i++)
    for (let j = 0; j < 8; j++) {
        minefield[i][j].addEventListener("click", async function () {

            if (document.querySelectorAll(".minefield .activated").length == 70) {
                clearInterval(stopinterval)
                wingameform()

            }
        })
    }

//Wingame display message functions
function wingameform() {
    document.querySelector(".alerts").classList.add("triggered")
    document.querySelector(".container").style.animation = "disappear 1s forwards"
    let input = document.querySelector(".alerts input")
    input.addEventListener("click", function () {
        input.value = ""
    })

    //on click submit the winner if the input is completed then reload the page
    let submit = document.querySelectorAll(".alerts .buttons button")[0]
    submit.addEventListener("click", async function () {
        if (input.value && input.value != "Select a nickname.") {
            let nickname = input.value
            await sendwinner(nickname)
                .catch(error => {
                    console.error(error)
                })

            input.value = ""
            window.location.reload()
        }
    })

    //play again
    let playagain = document.querySelectorAll(".alerts .buttons button")[1]
    playagain.addEventListener("click", function () {
        window.location.reload()
    })
}





//Sends the score,time and nickname as an data object to the server
async function sendwinner(nickname) {

    data = {
        clicks,
        time,
        nickname
    }
    data = JSON.stringify(data)

    let response = await fetch("/winner", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: data
    })



    //gets the score back from the database and inputs it into our Winners tab
    let responseback = await response
    let currentwinner = await responseback.json()
    let thenick = document.querySelectorAll(".scorecontainer .dscore")[0]
    thenick.innerHTML += currentwinner.nickname
    let theclicks = document.querySelectorAll(".scorecontainer .dscore")[1]
    theclicks.innerHTML += currentwinner.clicks
    let thetime = document.querySelectorAll(".scorecontainer .dscore")[2]
    thetime.innerHTML += currentwinner.time

}

fillpreviousscores()
//function used to fill the winner tab with all the score(previous + current)
async function fillpreviousscores() {
    let response = await fetch("/winnerquery")
    let winner = await response.json()


    let winnerpost = []
    for (let i = 0; i < winner.length; i++) {
        let {
            nickname,
            clicks,
            time
        } = winner[i]
        winnerpost.push({
            nickname,
            clicks,
            time
        })
    }




    let thenick = document.querySelectorAll(".scorecontainer .dscore")[0]
    let theclicks = document.querySelectorAll(".scorecontainer .dscore")[1]
    let thetime = document.querySelectorAll(".scorecontainer .dscore")[2]

    for (let i = 0; i < winnerpost.length; i++) {
        let {
            nickname,
            clicks,
            time
        } = winnerpost[i]
        thenick.innerHTML += `<div>${nickname}</div>`
        theclicks.innerHTML += `<div>${clicks}</div>`
        thetime.innerHTML += `<div>${time}</div>`
    }
}