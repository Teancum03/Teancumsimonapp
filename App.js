import React, { Component } from 'react'
import './SimonGame.css'
class SimonGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      round: 0,
      index: 0,
      steps: [],
      buttons: ['green', 'red', 'yellow', 'blue'],
    }
    this.sounds = {
      green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
      red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
      yellow: new Audio(
        'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
      ),
      blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    }
  }

  componentDidMount() {
    this.colorButtons = document.querySelectorAll('.button')
    this.gameConsole = document.querySelector('.console')
    this.innerCircle = document.querySelector('.inner-circle')
    this.buttonStart = document.querySelector('button')
    this.colorButtons.forEach((button) => {
      button.addEventListener('click', this.playSound)
    })
    this.buttonStart.addEventListener('click', this.startGame)
  }

  playSound = (event) => {
    const color = event.target.id
    const { index, steps } = this.state
    this.sounds[color].currentTime = 0
    this.sounds[color].play()
    if (color === steps[index]) {
      this.setState(
        (prevState) => ({
          index: prevState.index + 1,
        }),
        () => {
          if (this.state.index === this.state.round) {
            this.setState(
              (prevState) => ({
                index: 0,
                round: prevState.round,
              }),
              () => {
                this.gameConsole.innerHTML = 'Great job!'
                this.generateStep()
                this.showSteps()
              }
            )
          }
        }
      )
    } else {
      if (this.state.round === 0) {
        this.gameConsole.innerHTML = 'Press the "Start game" button!'
      } else {
        this.gameConsole.innerHTML =
          'Game over! You reached round ' + this.state.round
        this.resetSimon()
      }
    }
  }

  generateStep = () => {
    const { buttons } = this.state
    const randomColor = buttons[Math.floor(Math.random() * buttons.length)]
    this.setState((prevState) => ({
      steps: [...prevState.steps, randomColor],
      round: prevState.round + 1,
    }))
  }

  playStep = (step) => {
    const hover = document.getElementById(step)
    hover.classList.add('hover')
    this.sounds[step].play()
    setTimeout(() => {
      hover.classList.remove('hover')
    }, 300)
  }

  showSteps = () => {
    this.innerCircle.innerHTML = String(this.state.round)
    let num = 0
    const moves = setInterval(() => {
      this.playStep(this.state.steps[num])
      this.gameConsole.innerHTML = 'Wait...'
      num++
      if (num >= this.state.steps.length) {
        this.gameConsole.innerHTML = 'Repeat the steps!'
        clearInterval(moves)
      }
    }, 600)
  }

  resetSimon = () => {
    this.innerCircle.innerHTML = String(this.state.round)
    this.setState({
      round: 0,
      index: 0,
      steps: [],
    })
  }

  startGame = () => {
    this.resetSimon()
    this.generateStep()
    this.showSteps()
  }

  render() {
    return (
      <div>
        <div className="console"></div>
        <div className="inner-circle"></div>
        <button>Start game</button>
        {this.state.buttons.map((color) => (
          <div
            key={color}
            id={color}
            className="button"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    )
  }
}

export default SimonGame
