#! /usr/bin/env python
import pygame
import os

def show_highscore(screen):
    running = True
    
    hs_font = pygame.font.Font(os.path.join('font.ttf'), 120)
    name_font = pygame.font.Font(os.path.join('font.ttf'), 50)
    BLUE = (0,0,205)
    screen.fill((0,0,0))
    
    screen.blit(hs_font.render("HIGHSCORE",False,BLUE), (300,20))
    hs = get_highscore()
    ypos = 200
    if len(hs) == 0:
        screen.blit(name_font.render('EMPTY', False, BLUE), (450,200))
    for i in range(0,len(hs)):
        screen.blit(name_font.render(str(i+1) + '. ' + hs[i][0], False, BLUE), (300,ypos))
        screen.blit(name_font.render(str(hs[i][1]), False, BLUE), (700,ypos))
        ypos += 50
    pygame.display.update()
    
    while running:
        clock = pygame.time.Clock()
        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE or event.key == pygame.K_BACKSPACE:
                        running = False
                        
        


def get_highscore():
    file = open('hs.dat','r')
    temp = file.read()
    file.close()
    data = temp.split(",")
    result = []
    for i in range(0,len(data)-1,2):
        result.append((data[i],int(data[i+1])))
    return result        

def write_highscore(hs):
    file = open('hs.dat','w')
    for i in hs:
        data = i[0] + ',' + str(i[1]) + ','
        file.write(data)
    file.close()


def is_record(value):
    hs = get_highscore()
    for i in range(len(hs)):
        if value > hs[i][1]:
            return True
    if len(hs) == 5:
        return False
    else:
        return True
    
def new_record(value, name):
    hs = get_highscore()
    inserted = False
    for i in range(0,len(hs)):
        if value > hs[i][1]:
            hs.insert(i,(name,value))
            hs = hs[0:5]
            inserted = True
            break
        elif value == hs[i][1] and i < 4:
            hs.insert(i+1,(name,value))
            hs = hs[0:5]
            inserted = True
            break
    if not inserted:
        hs.append((name,value))
    write_highscore(hs)