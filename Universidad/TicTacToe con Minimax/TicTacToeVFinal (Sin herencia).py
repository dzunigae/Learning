import math
import random

class agent:
    #Constructor del agente
    def __init__(self):
        self.player = ''
        self.board = []
        self.available_moves = []

    #Función principal que recibe los parámetros
    def computer_action(self, variable):
        if type(variable) == str:
            self.player = variable
        elif type(variable) == list:
            self.update_board(variable)
            return self.computer_move()

    #Nueva percepción del tablero
    def update_board(self, board):
        self.available_moves = []
        for i in range(len(board)):
            if board[i] == ' ':
                self.available_moves.append(i)
        self.board = board
    
    #Función que decide el movimiento del agente
    def computer_move(self):
        if "X" not in self.board:
            corners = [0,2,6,8]
            move = corners[random.randint(0, 3)]
        else:
            move = self.minimax(self.board, self.player, self.available_moves)["p"]
        self.board[move] = self.player
        self.available_moves.remove(move)
        print("El ordenador movió:")
        return self.board

    #Algoritmo minimax
    def minimax(self, board_list, player, temporal_avaible_moves):
        #Position - Score
        result = self.winner(board_list)
        if result != self.player and result is not None:
            return {"p": None, "s": 1 * (len(temporal_avaible_moves) + 1)}
        elif result == self.player:
            return {"p": None, "s": -1 * (len(temporal_avaible_moves) + 1)}
        elif ' ' not in board_list:
            return {"p": None, "s": 0}
        else:
            if player != self.player:
                best = {"p": -1, "s": -math.inf}
            elif player == self.player:
                best = {"p": -1, "s": math.inf}
            
            for move in temporal_avaible_moves:
                new_board = list(board_list)
                new_board[move] = player
                t_a_m = list(temporal_avaible_moves)
                t_a_m.remove(move)
                sim_score = self.minimax(new_board, "O" if player == "X" else "X", t_a_m)
                sim_score["p"] = int(move)

                if player != self.player:
                    if (sim_score["s"] > best["s"]) and sim_score["p"] in self.available_moves:
                        best = sim_score
                else:
                    if (sim_score["s"] < best["s"]) and sim_score["p"] in self.available_moves:
                        best = sim_score
            
            return best

    #Ver si ya hay un ganador
    def winner(self, temporal_board):
        winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columnas
            [0, 4, 8], [2, 4, 6]  # Diagonales
        ]
        for combination in winning_combinations:
            if temporal_board[combination[0]] == temporal_board[combination[1]] == temporal_board[combination[2]] and temporal_board[combination[0]] != ' ':
                return temporal_board[combination[0]]

        return None

class TicTacToe:
    #Definición inicial de las variables del entorno
    def __init__(self):
        self.player = ''
        self.IA = agent()
        self.available_moves = [0,1,2,3,4,5,6,7,8]
        self.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

    #Función para imprimir el tablero en consola
    def display_board(self):
        print(f' {self.board[0]} | {self.board[1]} | {self.board[2]} ')
        print('---+---+---')
        print(f' {self.board[3]} | {self.board[4]} | {self.board[5]} ')
        print('---+---+---')
        print(f' {self.board[6]} | {self.board[7]} | {self.board[8]} ')

    #Función que le permite al jugador hacer una movida
    def player_move(self):
        move = int(input("Realiza tu movimiento (1-9): ")) - 1
        if self.board[move] == ' ':
            self.board[move] = self.player
            self.available_moves.remove(move)
        else:
            print("La posición ya está ocupada.")
            self.player_move()

    #Ver si ya hay un ganador
    def winner(self, temporal_board):
        winning_combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columnas
            [0, 4, 8], [2, 4, 6]  # Diagonales
        ]
        for combination in winning_combinations:
            if temporal_board[combination[0]] == temporal_board[combination[1]] == temporal_board[combination[2]] and temporal_board[combination[0]] != ' ':
                return temporal_board[combination[0]]

        return None

    #Fin del juego
    def game_over(self):
        if self.winner(self.board) or ' ' not in self.board:
            return True
        return False

    #Función Main de la clase
    def play(self):
        #Ciclo principal
        while True:
            print("Bienvenido al juego")
            current_player = input("¿Deseas ser el primero en jugar? (y/n) ")
            
            while current_player != 'y' and current_player != 'n':
                current_player = input("Simbolo incorrecto, intentalo nuevamente.")

            if current_player == 'y':
                self.player = "X"
                self.IA.computer_action("O")
            else:
                self.player = "O"
                self.IA.computer_action("X")

            self.display_board()

            #Ciclo de una partida
            while not self.game_over():
                if current_player == 'y':
                    self.player_move()
                    current_player = 'n'
                    self.display_board()
                else:
                    self.board = self.IA.computer_action(self.board)
                    self.display_board()
                    current_player = 'y'
                result = self.winner(self.board)
                if result == self.player:
                    print("¡Ganaste!")
                elif result != self.player and result is not None:
                    print("El computador te ganó")
                elif ' ' not in self.board:
                    print("Empate")

            #Preguntarle al usuario si desea cerrar el programa o volvr a jugar
            new_game = input("Presione 's' para jugar nuevamente o 'n' para cerrar el programa definitivamente")

            while new_game != 's' and new_game != 'n':
                new_game = input("Simbolo incorrecto, intentalo nuevamente.")

            if new_game == 's':
                self.player = ''
                self.available_moves = [0,1,2,3,4,5,6,7,8]
                self.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
                continue
            else:
                break

game = TicTacToe()
game.play()
