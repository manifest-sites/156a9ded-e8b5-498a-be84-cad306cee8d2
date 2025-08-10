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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-8">
      <Card className="text-center space-y-6 shadow-xl max-w-md mx-auto">
        <Title level={1} className="text-gradient bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </Title>
        
        <div className="text-2xl mb-4">
          <Text strong className={winner ? 'text-green-600' : 'text-blue-600'}>
            {getStatusText()}
          </Text>
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="w-20 h-20 bg-white border-2 border-gray-300 rounded-lg text-3xl font-bold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center shadow-sm"
              disabled={gameOver || cell !== null}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="flex justify-center space-x-4 text-lg mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✋</span>
            <Text>Hand</Text>
          </div>
          <Text className="text-gray-400">vs</Text>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🦶</span>
            <Text>Toe</Text>
          </div>
        </div>

        <Button 
          type="primary" 
          size="large" 
          onClick={resetGame}
          className="bg-gradient-to-r from-green-500 to-blue-500 border-none"
        >
          New Game
        </Button>
      </Card>
    </div>
  )
}

export default TicTacToe