#! /usr/bin/env python
from game import game
from game_calc import *
from highscore import *

pygame.init()
screen = pygame.display.set_mode((1024, 768))#,pygame.FULLSCREEN)
pygame.display.set_caption('bitSnake')
running = True
BLUE = (0,0,205)

bit_font = pygame.font.Font(os.path.join('font.ttf'), 120)
font = pygame.font.Font(os.path.join('font.ttf'), 40)
choice_dot = pygame.Rect(320,215,10,10)
clock = pygame.time.Clock()

while running:
        
        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    if event.key == pygame.K_UP:
                        if choice_dot.top == 215:
                            choice_dot.move_ip(0,100)
                        else:
                            choice_dot.move_ip(0,-50)
                    elif event.key == pygame.K_DOWN:
                        if choice_dot.top == 315:
                            choice_dot.move_ip(0,-100)
                        else:
                            choice_dot.move_ip(0,50)
                    elif event.key == pygame.K_RETURN:
                        if choice_dot.top == 215:
                            score = game(screen, clock)
                            if score and is_record(score):
                                name = input_name(screen)
                                new_record(score, name)
                                show_highscore(screen)
                        elif choice_dot.top == 265:
                            show_highscore(screen)
                        elif choice_dot.top == 315:
                            running = False

        screen.fill((0,0,0))
        screen.blit(bit_font.render("bitSnake",False,BLUE), (340,15))
        screen.blit(font.render("Play",False,BLUE), (350,200))
        screen.blit(font.render("Highscore",False,BLUE), (350,250))
        screen.blit(font.render("Exit",False,BLUE), (350,300))
        pygame.draw.rect(screen,BLUE,choice_dot)
        pygame.display.update()
        #print(clock.get_fps())
        clock.tick(25)