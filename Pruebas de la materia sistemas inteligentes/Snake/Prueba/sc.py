import mss
import numpy as np
import time
import cv2
import pyautogui

width, height = pyautogui.size()
snake_width = 0
snake_width_start = 0
snake_height = 0
snake_height_start = 0
square_width = 0

 #Se toma pantallazo de la pantalla inicial
with mss.mss() as sct:
    screen_shot = np.array(sct.grab({"top": 0, "left": 0, "width": width, "height": height}))

#Procedimiento para extraer sólo el tablero de la serpiente
middle = int(height/2)
comp = screen_shot[middle][0]
end_of_camp = False

for i in range(width):    
    if not np.array_equal(comp, screen_shot[middle][i]) and end_of_camp == False:
        snake_width_start = i
        j = i
        while(j < width and not np.array_equal(comp, screen_shot[middle][j])):
            j = j+1
            snake_width = snake_width+1
        end_of_camp = True
    elif end_of_camp == True:
        break

middle = int((snake_width + snake_width_start)/2)

for i in range(height):
    if not np.array_equal(comp, screen_shot[i][middle]):
        snake_height_start = snake_height_start + 1
    else:
        break

while(np.array_equal(comp, screen_shot[snake_height_start][middle])):
    snake_height_start = snake_height_start + 1

snake_height = int((snake_width/17)*15)

with mss.mss() as sct:
    screen_shot = np.array(sct.grab({"top": snake_height_start, "left": snake_width_start, "width": snake_width, "height": snake_height}))

screen_shot = cv2.cvtColor(screen_shot, cv2.COLOR_BGR2GRAY)

#cv2.imshow("Captura de pantalla", screen_shot)
#cv2.waitKey(0)
#cv2.destroyAllWindows()

# Configura las opciones de mss
sct = mss.mss()
monitor = {"top": snake_height_start, "left": snake_width_start, "width": snake_width, "height": snake_height}

# Ciclo infinito para tomar pantallazos cada 5 segundos
while True:
    # Toma el pantallazo
    

    # Genera un nombre de archivo único basado en la hora actual
    

    # Guarda la imagen en un archivo PNG
    cv2.imwrite(f"./sc/pantallazo_{time.strftime('%Y%m%d_%H%M%S')}.png", cv2.cvtColor(np.array(sct.grab(monitor)), cv2.COLOR_BGR2GRAY))

    # Espera 5 segundos antes de tomar el siguiente pantallazo
    time.sleep(1)