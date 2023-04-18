import mss
import pyautogui
import cv2
import numpy as np 
import time

class enviroment:
    def __init__(self):
        self.width, self.height = pyautogui.size()
        self.shape = cv2.imread("images/nose2.png", cv2.IMREAD_GRAYSCALE)
        self.snake_width = 0
        self.snake_width_start = 0
        self.snake_height = 0
        self.snake_height_start = 0
        self.square_width = 0
        self.screen_shot = None
        self.coordenadas = {}
        self.cuerpo = []
        self.cabeza = (0,0)
        self.manzana = (0,0)

    #Construcción incial del ambiente
    def enviroment_building(self):
        #Se toma pantallazo de la pantalla inicial
        with mss.mss() as sct:
            self.screen_shot = np.array(sct.grab({"top": 0, "left": 0, "width": self.width, "height": self.height}))

        #Procedimiento para extraer sólo el tablero de la serpiente
        middle = int(self.height/2)
        comp = self.screen_shot[middle][0]
        end_of_camp = False

        for i in range(self.width):    
            if not np.array_equal(comp, self.screen_shot[middle][i]) and end_of_camp == False:
                self.snake_width_start = i
                j = i
                while(j < self.width and not np.array_equal(comp, self.screen_shot[middle][j])):
                    j = j+1
                    self.snake_width = self.snake_width+1
                end_of_camp = True
            elif end_of_camp == True:
                break

        middle = int((self.snake_width + self.snake_width_start)/2)

        for i in range(self.height):
            if not np.array_equal(comp, self.screen_shot[i][middle]):
                self.snake_height_start = self.snake_height_start + 1
            else:
                break

        while(np.array_equal(comp, self.screen_shot[self.snake_height_start][middle])):
            self.snake_height_start = self.snake_height_start + 1

        self.snake_height = int((self.snake_width/17)*15)

        with mss.mss() as sct:
            self.screen_shot = np.array(sct.grab({"top": self.snake_height_start, "left": self.snake_width_start, "width": self.snake_width, "height": self.snake_height}))

        #Ancho de cada cuadrado del tablero
        self.square_width = int(self.snake_width/17)
        
        #for i in range(self.snake_width):
        #    if i % self.square_width == 0:
        #        for j in range(self.snake_height):
        #            screen_shot[j][i][0] = 0
        #            screen_shot[j][i][1] = 0
        #            screen_shot[j][i][2] = 0

        #for i in range(self.snake_height):
        #    if i % self.square_width == 0:
        #        for j in range(self.snake_width):
        #            screen_shot[i][j][0] = 0
        #            screen_shot[i][j][1] = 0
        #            screen_shot[i][j][2] = 0

        #Rellena la matriz donde se encuentra almacenada la información de lo que hay en cada parte del tablero
        for i in range(15):
            for j in range(17):
                x = int((i*self.square_width) + (self.square_width/2))
                y = int((j*self.square_width) + (self.square_width/2))
                #Tablero
                if self.screen_shot[x][y][0] == 81 or self.screen_shot[x][y][0] == 73:
                    self.coordenadas[(i,j)] = 0
                #Manzana
                elif self.screen_shot[x][y][0] == 29:
                    self.coordenadas[(i,j)] = 1
                    self.manzana = (i,j)
                #Cuerpo
                else:
                    self.coordenadas[(i,j)] = 2
                    self.cuerpo.append((i,j))

        #cv2.imshow("Captura de pantalla", self.screen_shot)
        #cv2.waitKey(0)
        #cv2.destroyAllWindows()

    def finding_head(self):
        self.screen_shot = cv2.cvtColor(self.screen_shot, cv2.COLOR_BGR2GRAY)
        _, x, _, y = cv2.minMaxLoc(cv2.matchTemplate(self.screen_shot, self.shape, cv2.TM_CCOEFF_NORMED))
        print(x)
        print(y)

        cv2.imshow("Captura de pantalla", self.screen_shot)
        cv2.waitKey(0)
        cv2.destroyAllWindows()



    def play(self):
        self.enviroment_building()
        self.finding_head()

game = enviroment()
game.play()