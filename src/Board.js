import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStarsOn: 0
  }

  constructor(props) {
    super(props);


    this.state = {
      board: [],
      hasWon: false
    }
    this.createBoard = this.createBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this)
    this.calculateWinner = this.calculateWinner.bind(this)
  }

  componentDidMount() {
    this.createBoard()
  }

  createBoard() {
    let board = [];

    var lit;

    for (var i = 0; i < this.props.nrows; i++) {
      var arr = []
      for (var j = 0; j < this.props.ncols; j++) {
        lit = Math.floor(Math.random() * 2) === 0 ? false : true
        arr.push(lit)
      }
      board.push(arr)
    }

    this.setState({board})
  }


  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;

    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }

    }

    flipCell(y, x)
    flipCell(y + 1, x)
    flipCell(y - 1, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)

    this.setState({board, hasWon: this.calculateWinner()});
  }

  calculateWinner(){
    const { board } = this.state
    var count = 0;

    for (var row = 0; row < board.length; row++) {
      for (var col = 0; col < board[row].length; col++) {
        if (board[row][col] === true) count++
      }
    }
    return count === this.props.nrows * this.props.ncols

  }


  render() {

    if (this.state.hasWon) {
      return <h1>You won!</h1>
    }

    return (
      <table>
        <tbody>
          {
            this.state.board.map((row, r) => (
              <tr>
                {
                  row.map((col, c) => {

                    return <Cell
                             arg={`${r}-${c}`}
                             ncols={c}
                             nrows={r}
                             isLit={col}
                             flipCellsAroundMe={this.flipCellsAround}
                            />
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )

  }
}


export default Board;
