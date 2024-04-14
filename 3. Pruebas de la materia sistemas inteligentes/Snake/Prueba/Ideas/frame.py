import pyautogui
import mss
import numpy as np
import cv2
import time




def getScreen():
    global boardimage
    
    
    # Inicializar mss
    with mss.mss() as sct:
        # Especificar la región de la pantalla a capturar

        # Tomar el screenshot
        screenshot = np.array(sct.grab(monitor))        

    return screenshot

def newArray():
    global cabeza
    global monitor
    pantalla=getScreen()
    
    pasoEnY= int(len(pantalla)/15)
    pasoEnX= int(len(pantalla[0])/17)
    
    m=[]
    
    for i in range(pasoEnY//2,len(pantalla),pasoEnY):
        for j in range(pasoEnX//2,len(pantalla[0]),pasoEnX):
            pixeles2 = []
            pixeles=[]
            
            if i+pasoEnY < len(pantalla):
                pixeles2.append(pantalla[i+pasoEnY][j][0])
            if j+pasoEnX < len(pantalla[0]):
                pixeles2.append(pantalla[i][j+pasoEnX][0])
            if i-pasoEnY >= 0:
                pixeles2.append(pantalla[i-pasoEnY][j][0])
            if j-pasoEnX >= 0:
                pixeles2.append(pantalla[i][j-pasoEnX][0])
                    
            
            
            
            pixeles=[ pantalla[i-pasoEnY//2][j][0], pantalla[i+pasoEnY//2][j][0], pantalla[i][j+pasoEnX//2][0], pantalla[i][j-pasoEnX//2][0] ]
            
            #0 es arriba
            #1 es abajo
            #2 es derecha
            #3 es izquierda
            
            m.append(pantalla[i][j][0])

            cont=0
            cont2=0
            for p in pixeles:
                if p>220:
                    cont=cont+1
            
            for pe in pixeles2:
                if pe>100:
                    cont2=cont2+1
            
            
                
            
            
            if cont==1 and pantalla[i][j][0]>100 and cont2<2: 
                
            #if pantalla[cabeza[0]*pasoEnY+pasoEnY//2][cabeza[1]*pasoEnX+pasoEnX//2][0] >100:
                cabeza=(i//pasoEnY,j//pasoEnX)
            
            
            
            
    return np.reshape(m,(15,17))

boardimage = pyautogui.locateOnScreen('images/board.png', confidence=0.9)
monitor = {"top": boardimage.top, "left": boardimage.left, "width": int(boardimage.height+boardimage.height*2/15), "height": boardimage.height}

cabeza=(7,3)




while True: 
    newArray()
    print(cabeza) 
    
    




