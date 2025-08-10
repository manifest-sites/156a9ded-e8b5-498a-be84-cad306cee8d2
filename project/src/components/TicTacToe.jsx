import { useState } from 'react'
import { Button, Typography, Card } from 'antd'

const { Title, Text } = Typography

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isHandTurn, setIsHandTurn] = useState(true)
  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = (currentBoard) => {
    for (let line of winningLines) {
      const [a, b, c] = line
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a]
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isHandTurn ? '✋' : '🦶'
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameOver(true)
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true)
    } else {
      setIsHandTurn(!isHandTurn)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsHandTurn(true)
    setWinner(null)
    setGameOver(false)
  }

  const getStatusText = () => {
    if (winner) {
      return `${winner === '✋' ? 'Hand' : 'Toe'} wins!`
    } else if (gameOver) {
      return "It's a tie!"
    } else {
      return `${isHandTurn ? 'Hand' : 'Toe'}'s turn`
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-8">
      <div className="text-center space-y-8 w-full max-w-2xl">
        <Title level={1} className="text-white mb-8 text-5xl">
          Tic Tac Toe
        </Title>
        
        <div className="text-3xl mb-8">
          <Text strong className={winner ? 'text-green-400' : 'text-blue-400'}>
            {getStatusText()}
          </Text>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 md:w-32 md:h-32 bg-gray-800 border-2 border-gray-600 rounded-lg text-4xl md:text-5xl font-bold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
              disabled={gameOver || cell !== null}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="flex justify-center space-x-6 text-xl mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">✋</span>
            <Text className="text-white">Hand</Text>
          </div>
          <Text className="text-gray-400 text-2xl">vs</Text>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🦶</span>
            <Text className="text-white">Toe</Text>
          </div>
        </div>

        <Button 
          type="primary" 
          size="large" 
          onClick={resetGame}
          className="bg-gradient-to-r from-green-500 to-blue-500 border-none text-xl px-8 py-4 h-auto"
        >
          New Game
        </Button>
      </div>
    </div>
  )
}

export default TicTacToe