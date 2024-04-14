import numpy as np
import cv2
import pyautogui

class Ambiente:
    # CREACION DE VIDEO (PRIMERA LECTURA DE AMBIENTE)
    codec = cv2.VideoWriter_fourcc(*"XVID")
    out = cv2.VideoWriter("Grabacion.avi", codec, 60, (1366, 768))
    cv2.namedWindow("Grabando", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Grabando", 480, 270)

    # SUBSTRACCION DE FONDO
    fbgb = cv2.bgsegm.createBackgroundSubtractorMOG()               # OBJETOS EN MOVIMIENTO EN BLANCO, FONDO NEGRO
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))   # MEJORAR IMAGEN BINARIA

    ###########################
    while True:
        img = pyautogui.screenshot()    # PANTALLAZO
        frame = np.array(img)           # IMAGEN -> ARREGLO DE NUMEROS

        # SUBSTRACCION DE FONDO 2
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # CAMBIO DE COLOR DEL FRAME A RGB (EN GRIS PRODUCE ERRORES EN LA DETECCION)

        # AREA DE MOVIMIENTO
        area = np.array([[0, 0], [1000, 0], [990, frame.shape[0]], [0, frame.shape[0]]]) # (SE DEFINE AREA DE DETECCION)

        # VER REGION
        color = (0, 0, 255)
        cv2.drawContours(frame, [area], -1, color, 2)

        im_aux = np.zeros(shape=(frame.shape[:2]), dtype=np.uint8)  # ARREGLO PARA VISUALIZAR EL MOVIMIENTO
        im_aux = cv2.drawContours(im_aux, [area], -1, (255), -1)    # VER CONTORNO EN MOVIMIENTO
        im_area = cv2.bitwise_and(gray, gray, mask=im_aux)
        cv2.namedWindow("AUX", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("AUX", 480, 270)

        fgmask = fbgb.apply(im_area)
        fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, kernel)
        fgmask = cv2.dilate(fgmask, None, iterations=2)

        # CONTORNOS EN MOVIMIENTO
        cnts = cv2.findContours(fgmask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]

        for cnt in cnts:
            if cv2.contourArea(cnt) > 500:
                x, y, w, h = cv2.boundingRect(cnt)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 5)

        # MOSTRAR VIDEO EN VIVO
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        out.write(frame)                # CARGAR VIDEO
        cv2.imshow('Grabando', frame)   # MOSTRAR FRAME
        cv2.imshow('AUX', fgmask)       # MOSTRAR VENTANA AUX

        if cv2.waitKey(1) == ord('q'):  # SE DETIENE LA GRABACION AL PRESIONAR Q
            break

    out.release()  # cerrar el archivo de video
    cv2.destroyAllWindows()  # cerrar la ventana


if __name__ == '__main__':

    Ambiente()