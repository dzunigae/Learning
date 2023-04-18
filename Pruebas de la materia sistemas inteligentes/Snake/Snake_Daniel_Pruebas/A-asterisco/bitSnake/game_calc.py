#! /usr/bin/env python
import random
from highscore import *

def check_ahead(screen,x,y):
    color = screen.get_at((x,y))
    if color[0] == 35:
        return 'EAT'
    elif color[1] == 215:
        return 'BONUS'
    elif color[0] == 255 or color[2] == 205:
        return 'GAME_OVER'
    elif color[0] == 0:
        return 'NOTHING'

def new_food(screen, blocks):
    while True:
        x = random.randrange(42,982,step=10)
        y = random.randrange(74,682,step=10)
        if check_ahead(screen,x,y) == 'NOTHING':
            if blocks:
                if blocks.count((x,y)) == 0:
                    return (x,y)
            else:                
                return (x,y)

def input_name(screen):
    BLUE = (0,0,205)
    running = True
    clock = pygame.time.Clock()
    name = ""
    name_font = pygame.font.Font(os.path.join('font.ttf'), 50)
    name_border = pygame.Rect(380,350,320,5)
    update_rect = pygame.Rect(150,170,760,400)
    
    upper_border = pygame.Rect(150,170,760,15)
    right_border = pygame.Rect(895,185,15,200)
    left_border = pygame.Rect(150,185,15,200)
    down_border = pygame.Rect(150,370,760,15)
    
    while running:
        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    elif event.key == pygame.K_RETURN:
                        if name:
                            return name.upper()
                    elif event.key == pygame.K_BACKSPACE:
                        name = name[0:-1]
                    else:
                        if not len(name) > 12:
                            name = name + event.unicode
        pygame.draw.rect(screen,(0,0,0),update_rect)
        screen.blit(name_font.render("Congratualtions you made the HIGHSCORE",False,BLUE), (180,200))
        screen.blit(name_font.render("Enter name: ",False,BLUE), (180,300))
        screen.blit(name_font.render(name.upper(),False,BLUE), (390,300))
        pygame.draw.rect(screen,BLUE,name_border)
        pygame.draw.rect(screen,BLUE,upper_border)
        pygame.draw.rect(screen,BLUE,right_border)
        pygame.draw.rect(screen,BLUE,down_border)
        pygame.draw.rect(screen,BLUE,left_border)
        pygame.display.update(update_rect)
        clock.tick(25)