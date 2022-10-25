const fragment = document.createDocumentFragment();
const fields = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];

const versions = ["3x3", "4x4", "5x5", "6x6", "7x7", "8x8"];

const extra = ["Records", "Save", "Continue", "Mute"];

const li = fragment
  .appendChild(document.createElement("div"))
  .appendChild(document.createElement("div"));
fields.forEach((num) => {
  const button = document.createElement("button");
  button.textContent = num;
  li.appendChild(button);
});

document.body.appendChild(fragment);

let parent = document.querySelector("div");
let child = document.querySelector("div>div");
parent.className = "field";
child.className = "grid";

parent.appendChild(document.createElement("div"));
parent.appendChild(document.createElement("div"));
parent.appendChild(document.createElement("div"));
parent.appendChild(document.createElement("div"));
let all = document.querySelectorAll("div");
let menu = all[all.length - 1];
let modes = document.querySelectorAll("div")[2];
let extraMenu = document.querySelectorAll("div")[3];
let recordMenu = document.querySelectorAll("div")[4];
menu.className = "menu";
modes.className = "modes";
extraMenu.className = "extra";
recordMenu.className = "record";

const variants = fragment;
versions.forEach((num) => {
  const version = document.createElement("button");
  version.textContent = num;
  variants.appendChild(version);
});

modes.appendChild(fragment);

const save = fragment;
extra.forEach((num) => {
  const saver = document.createElement("button");
  saver.textContent = num;
  save.appendChild(saver);
});

extraMenu.appendChild(fragment);

menu.appendChild(document.createElement("button"));
let button = menu.querySelector("button");
button.innerText = "Start";
menu.appendChild(document.createElement("span"));
let move = document.querySelector("span");
move.id = "move";
menu.appendChild(document.createElement("span"));
let allSpans = document.querySelectorAll("span");
let time = allSpans[allSpans.length - 1];
time.id = "time";

document.body.appendChild(document.createElement("h1"));
let finalMessage = document.querySelector("h1");
finalMessage.id = "message";

//sound

let mute = extraMenu.querySelectorAll("button")[3];

mute.addEventListener("click", () => {
  mute.classList.toggle("on");
});

//modes

const thirdMode = modes.querySelectorAll("button")[0];
const fourthMode = modes.querySelectorAll("button")[1];
const fifthMode = modes.querySelectorAll("button")[2];
const sixthMode = modes.querySelectorAll("button")[3];
const seventhMode = modes.querySelectorAll("button")[4];
const eighthMode = modes.querySelectorAll("button")[5];

thirdMode.addEventListener("click", () => {
  thirdMode.classList.add("off");
  document.querySelector("div>div").classList.remove("grid");
  document.querySelector("div>div").classList.add("third");
  fourthMode.classList.remove("off");
  fifthMode.classList.remove("off");
  sixthMode.classList.remove("off");
  seventhMode.classList.remove("off");
  eighthMode.classList.remove("off");
  // clearInterval(this.tickId);
  //     this.tickId = setInterval(this.tick, 1000);
  //     this.setState(State.start());
});

fourthMode.addEventListener("click", () => {
  document.querySelector("div>div").classList.remove("third");
  document.querySelector("div>div").classList.add("grid");
  fourthMode.classList.add("off");
  fifthMode.classList.remove("off");
  sixthMode.classList.remove("off");
  seventhMode.classList.remove("off");
  eighthMode.classList.remove("off");
  thirdMode.classList.remove("off");
});

fourthMode.classList.add("off");

fifthMode.addEventListener("click", () => {
  fifthMode.classList.add("off");
  sixthMode.classList.remove("off");
  seventhMode.classList.remove("off");
  eighthMode.classList.remove("off");
  thirdMode.classList.remove("off");
  fourthMode.classList.remove("off");
});

sixthMode.addEventListener("click", () => {
  sixthMode.classList.add("off");
  seventhMode.classList.remove("off");
  eighthMode.classList.remove("off");
  thirdMode.classList.remove("off");
  fourthMode.classList.remove("off");
  fifthMode.classList.remove("off");
});

seventhMode.addEventListener("click", () => {
  seventhMode.classList.add("off");
  eighthMode.classList.remove("off");
  thirdMode.classList.remove("off");
  fourthMode.classList.remove("off");
  fifthMode.classList.remove("off");
  sixthMode.classList.remove("off");
});

eighthMode.addEventListener("click", () => {
  eighthMode.classList.add("off");
  thirdMode.classList.remove("off");
  fourthMode.classList.remove("off");
  fifthMode.classList.remove("off");
  sixthMode.classList.remove("off");
  seventhMode.classList.remove("off");
});

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTopBox() {
    if (this.y === 0) return null;
    return new Box(this.x, this.y - 1);
  }

  getRightBox() {
    if (this.x === 3) return null;
    return new Box(this.x + 1, this.y);
  }

  getBottomBox() {
    if (this.y === 3) return null;
    return new Box(this.x, this.y + 1);
  }

  getLeftBox() {
    if (this.x === 0) return null;
    return new Box(this.x - 1, this.y);
  }

  getNextdoorBoxes() {
    return [
      this.getTopBox(),
      this.getRightBox(),
      this.getBottomBox(),
      this.getLeftBox(),
    ].filter((box) => box !== null);
  }

  getRandomNextdoorBox() {
    const nextdoorBoxes = this.getNextdoorBoxes();
    return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
  }
}

const swapBoxes = (grid, box1, box2) => {
  const temp = grid[box1.y][box1.x];
  grid[box1.y][box1.x] = grid[box2.y][box2.x];
  grid[box2.y][box2.x] = temp;
};

// const swapBoxesThird = (gridThird, box1, box2) => {
//   const temp = gridThird[box1.y][box1.x];
//   gridThird[box1.y][box1.x] = gridThird[box2.y][box2.x];
//   gridThird[box2.y][box2.x] = temp;
// };

const isSolved = (grid) => {
  return (
    grid[0][0] === 1 &&
    grid[0][1] === 2 &&
    grid[0][2] === 3 &&
    grid[0][3] === 4 &&
    grid[1][0] === 5 &&
    grid[1][1] === 6 &&
    grid[1][2] === 7 &&
    grid[1][3] === 8 &&
    grid[2][0] === 9 &&
    grid[2][1] === 10 &&
    grid[2][2] === 11 &&
    grid[2][3] === 12 &&
    grid[3][0] === 13 &&
    grid[3][1] === 14 &&
    grid[3][2] === 15 &&
    grid[3][3] === 0
  );
};

// const isSolvedThird = gridThird => {
//   return (
//     gridThird[0][0] === 1 &&
//     gridThird[0][1] === 2 &&
//     gridThird[0][2] === 3 &&
//     gridThird[1][0] === 4 &&
//     gridThird[1][1] === 5 &&
//     gridThird[1][2] === 6 &&
//     gridThird[2][0] === 7 &&
//     gridThird[2][1] === 8 &&
//     gridThird[2][2] === 0
//   );
// };

const getRandomGrid = () => {
  // if (fourthMode.classList=="off") {
  let grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];

  // Shuffle
  let blankBox = new Box(3, 3);
  for (let i = 0; i < 1000; i++) {
    const randomNextdoorBox = blankBox.getRandomNextdoorBox();
    swapBoxes(grid, blankBox, randomNextdoorBox);
    blankBox = randomNextdoorBox;
  }
  if (isSolved(grid)) return getRandomGrid();
  return grid;
  // } else if (thirdMode.classList == "off") {
  //   let gridThird = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
  //   // Shuffle
  //   let blankBoxThird = new Box(2, 2);
  //   for (let i = 0; i < 1000; i++) {
  //     const randomNextdoorBox = blankBoxThird.getRandomNextdoorBox();
  //     swapBoxesThird(gridThird, blankBoxThird, randomNextdoorBox);
  //     blankBoxThird = randomNextdoorBox;
  //   }
  //   if (isSolvedThird(grid)) return getRandomGrid();
  //   return gridThird;
  // }
};

class State {
  constructor(grid, move, time, status) {
    this.grid = grid;
    this.move = move;
    this.time = time;
    this.status = status;
  }

  static ready() {
    // if (fourthMode.classList=="off"){
    return new State(
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      0,
      0,
      "ready"
    );
    // } else if (thirdMode.classList=="off") {
    //   return new State(
    //     [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    //     0,
    //     0,
    //     "ready"
    //   );
    // }
  }

  static start() {
    return new State(getRandomGrid(), 0, 0, "playing");
  }
}

class Game {
  constructor(state) {
    this.state = state;
    this.tickId = null;
    this.tick = this.tick.bind(this);
    this.render();
    this.handleClickBox = this.handleClickBox.bind(this);
  }

  static ready() {
    return new Game(State.ready());
  }

  tick() {
    this.setState({ time: this.state.time + 1 });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  handleClickBox(box) {
    return function () {
      const nextdoorBoxes = box.getNextdoorBoxes();
      const blankBox = nextdoorBoxes.find(
        (nextdoorBox) => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
      );
      if (blankBox) {
        const newGrid = [...this.state.grid];
        swapBoxes(newGrid, box, blankBox);
        if (mute.classList != "on") {
          let synth = new Tone.Synth().toDestination();
          synth.triggerAttackRelease("C4", "8n");
        }
        if (isSolved(newGrid)) {
          clearInterval(this.tickId);
          this.setState({
            status: "won",
            grid: newGrid,
            move: this.state.move + 1,
          });
        } else {
          this.setState({
            grid: newGrid,
            move: this.state.move + 1,
          });
        }
      }
    }.bind(this);
  }

  render() {
    const { grid, move, time, status } = this.state;
    // save
    let buttonSave = extraMenu.querySelectorAll("button")[1];

    buttonSave.addEventListener("click", () => {
      localStorage.removeItem("save");
      localStorage.setItem("save", JSON.stringify(this.state));
    });

    let buttonContinue = extraMenu.querySelectorAll("button")[2];

    buttonContinue.addEventListener("click", () => {
      this.setState(JSON.parse(localStorage.getItem("save")));
    });
    // Render grid
    const newGrid = document.createElement("div");

    // if (fourthMode.classList == "off") {
    newGrid.className = "grid";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const button = document.createElement("button");
        button.setAttribute("draggable", true);
        button.id = "buttonDrag";
        if (status === "playing") {
          button.addEventListener("click", this.handleClickBox(new Box(j, i)));
          button.ondragover = allowDrop;
          function allowDrop(event) {
            event.preventDefault();
          }

          button.ondragstart = drag;
          function drag(event) {
            event.dataTransfer.setData("id", event.target.id);
            console.log(2)
          }

          button.ondrop = drop;
          function drop(event) {
            let itemId = event.dataTransfer.getData("id");
            console.log(itemId);
           
            console.log(1)
            event.target.handleClickBox()
            
          }
          // itemId.addEventListener('drop', this.handleClickBox(new Box(j, i)));
            // this.append(newGrid)
            // button.addEventListener(drop, this.handleClickBox(new Box(j, i)));
           // button.addEventListener(event, handleClickBox(new Box(j, i)));
          // this.handleClickBox(new Box(j, i));
          
        }

        button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
        newGrid.appendChild(button);
        // }
      }
      document.querySelector(".grid").replaceWith(newGrid);

      // } else if (thirdMode.classList == "off") {
      //   newGrid.className = "third";
      //   for (let i = 0; i < 3; i++) {
      //     for (let j = 0; j < 3; j++) {
      //       const button = document.createElement("button");

      //       if (status === "playing") {
      //         button.addEventListener("click", this.handleClickBox(new Box(j, i)));
      //       }

      //       button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
      //       newGrid.appendChild(button);
      //     }
      //   }
      //   document.querySelector(".third").replaceWith(newGrid);
    }

    // Render button
    const newButton = document.createElement("button");
    if (status === "ready") newButton.textContent = "Play";
    if (status === "playing") newButton.textContent = "Reset";
    if (status === "won") newButton.textContent = "Play";
    newButton.addEventListener("click", () => {
      clearInterval(this.tickId);
      this.tickId = setInterval(this.tick, 1000);
      this.setState(State.start());
    });
    document.querySelector(".menu button").replaceWith(newButton);

    // Render move
    document.getElementById("move").textContent = `Moves: ${move}`;

    // Render time
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    document.getElementById("time").textContent = `Time: ${minutes}:${seconds}`;

    // Render message
    if (status === "won") {
      localStorage.setItem("winner", JSON.stringify(this.state));
      // add to table
      let timeWin = Object.fromEntries(
        Object.entries(JSON.parse(localStorage.getItem("winner"))).map(
          ([key, value]) => [key, value]
        )
      );

      let scoreWin = Object.fromEntries(
        Object.entries(JSON.parse(localStorage.getItem("winner"))).map(
          ([key, value]) => [key, value]
        )
      );

      document.querySelectorAll("td")[6].innerText = timeWin.time + "s";
      document.querySelectorAll("td")[7].innerText = scoreWin.move;
      document.getElementById(
        "message"
      ).textContent = `Hooray! You solved the puzzle in ${minutes}:${seconds} and ${move} moves!`;
    } else {
      document.getElementById("message").textContent = ``;
    }
  }
}

// record
recordMenu.appendChild(document.createElement("table"));
document.querySelector("table").appendChild(document.createElement("tr"));
document.querySelector("table").appendChild(document.createElement("tr"));
document.querySelectorAll("tr")[1].appendChild(document.createElement("td"));
document.querySelectorAll("tr")[1].appendChild(document.createElement("td"));
document.querySelectorAll("tr")[1].appendChild(document.createElement("td"));
document.querySelectorAll("tr")[1].appendChild(document.createElement("td"));
document.querySelector("tr").appendChild(document.createElement("td"));
document.querySelector("tr").appendChild(document.createElement("td"));
document.querySelector("tr").appendChild(document.createElement("td"));
document.querySelector("tr").appendChild(document.createElement("td"));
document.querySelectorAll("td")[1].innerText = "Name";
document.querySelectorAll("td")[2].innerText = "Time";
document.querySelectorAll("td")[3].innerText = "Moves";
document.querySelectorAll("td")[0].innerText = "№";
recordMenu.classList.add("animate__animated");

let buttonRecord = extraMenu.querySelectorAll("button")[0];
buttonRecord.addEventListener("click", () => {
  recordMenu.classList.toggle("open");
  recordMenu.classList.add("animate__animated", "animate__fadeIn");
});

const GAME = Game.ready();
