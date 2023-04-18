#! /usr/bin/env python
from game_calc import *
from queue import *
import random

def game(screen, clock):

    # START EDIT
    allnodes = []
    for x in range(32, 982, 10):
        for y in range(64, 684, 10):
            allnodes.append([x, y])

    dirs = [[10, 0], [0, 10], [-10, 0], [0,-10]]

    def neighbours(node):
        result = []
        for d in dirs:
            neighbour = [node[0] + d[0], node[1] + d[1]]
            if neighbour in allnodes:
                result.append(neighbour)
        return result

    def h(food, n):
        # Manhattan distance
        return abs(food[0]-n[0]) + abs(food[1]-n[1])

    # END EDIT

    running = True
    time = 0
    WHITE = (255,255,255)
    BLUE = (0,0,205)
    upper_border = pygame.Rect(12,44,1000,20)
    right_border = pygame.Rect(992,60,20,648)
    left_border = pygame.Rect(12,60,20,648)
    down_border = pygame.Rect(12,694,1000,20)

    snake = [(512,344),(512,354),(512,364),(512,374),(512,384)]

    direction = 'UP'

    bonus_timer = 0

    food = new_food(screen, snake)
    bonus = None
    eaten = True
    eaten_cooldown = 1

    x_change = 0
    y_change = 0

    score = 0

    font = pygame.font.Font(os.path.join('font.ttf'), 28)
    countdown_font = pygame.font.Font(os.path.join('font.ttf'), 100)

    up_pressed = False
    right_pressed = False
    down_pressed = False
    left_pressed = False

    countdown = True

    # BEGIN EDIT
    findnewpath = True
    startcount = 0
    onpath = False
    # END EDIT

    while running:
        # BEGIN EDIT
        startcount += 1

        if findnewpath == True and startcount > 5:
            allnodes = []
            for x in range(32, 982, 10):
                for y in range(64, 684, 10):
                    allnodes.append([x, y])

            # get rid of snake blocks from available nodes
            for s in snake:
                s = list(s)
                allnodes.remove(s)

            frontier = PriorityQueue()
            frontier.put(snake[0], 0)
            came_from = {}
            cost_so_far = {}
            came_from[snake[0]] = None
            cost_so_far[snake[0]] = 0

            while frontier:
                current = frontier.get()
                if current == food:
                    break

                for n in neighbours(current):
                    n = tuple(n)
                    newcost = cost_so_far[current] + 10
                    if n not in cost_so_far or newcost < cost_so_far[n]:
                        cost_so_far[n] = newcost
                        priority = newcost + h(food, n)
                        frontier.put(n, priority)
                        came_from[n] = current

            current = food
            path = [current]
            print(path)

            for _ in range(500):
                current = came_from[current]
                path.append(current)
                if current == snake[0]:
                    break

            path.reverse()
            findnewpath = False

        # END EDIT

        for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    if event.key == pygame.K_UP and not direction == 'DOWN' and not right_pressed and not left_pressed:
                        direction = 'UP'
                        up_pressed = True
                    elif event.key == pygame.K_DOWN and not direction == 'UP' and not right_pressed and not left_pressed:
                        direction = 'DOWN'
                        down_pressed = True
                    elif event.key == pygame.K_RIGHT and not direction == 'LEFT' and not up_pressed and not down_pressed:
                        direction = 'RIGHT'
                        right_pressed = True
                    elif event.key == pygame.K_LEFT and not direction == 'RIGHT' and not up_pressed and not down_pressed:
                        direction = 'LEFT'
                        left_pressed = True
                elif event.type == pygame.KEYUP:
                        if event.key == pygame.K_DOWN:
                            None
                        elif event.key == pygame.K_UP:
                            None
                        elif event.key == pygame.K_RIGHT:
                            None
                        elif event.key == pygame.K_LEFT:
                            None
        up_pressed = False
        right_pressed = False
        down_pressed = False
        left_pressed = False

        if direction == 'RIGHT':
            x_change = 10
            y_change = 0
        elif direction == 'LEFT':
            x_change = -10
            y_change = 0
        elif direction == 'UP':
            x_change = 0
            y_change = -10
        elif direction == 'DOWN':
            x_change = 0
            y_change = 10

        # BEGIN EDIT
        if startcount > 5:
            for i in range(len(path)):
                if snake[0][0] == path[i][0] and snake[0][1] == path[i][1]:
                    onpath = True
                    x_change = path[i+1][0]-path[i][0]
                    y_change = path[i+1][1]-path[i][1]

            if onpath == False:
                findnewpath = True
        # END EDIT

        status = check_ahead(screen, snake[0][0]+x_change, snake[0][1]+y_change)
        if status == 'NOTHING' or status == 'EAT':
            snake.insert(0,(snake[0][0]+x_change,snake[0][1]+y_change))
        if status == 'EAT':
            eaten = True
            eaten_cooldown = eaten_cooldown + 4
            food = new_food(screen, None)
            score += 1
            if random.randint(1,8) == 8 and not bonus:
                bonus = new_food(screen, [food])
                bonus_timer = 5

            # BEGIN EDIT

            findnewpath = True

            # END EDIT

        if status == 'BONUS':
            bonus = None
            score += 6
            eaten_cooldown += 8

        if not eaten and eaten_cooldown == 0:
            snake = snake[0:-1]
        else:
            eaten = False
            eaten_cooldown = eaten_cooldown - 1
        if status == 'GAME_OVER':
            return score
        if bonus_timer:
            bonus_timer = bonus_timer - (clock.get_time() / 1000)
            if bonus_timer < 0:
                bonus = None
                bonus_timer = 0

        screen.fill((0,0,0))
        pygame.draw.rect(screen,BLUE,upper_border)
        pygame.draw.rect(screen,BLUE,right_border)
        pygame.draw.rect(screen,BLUE,left_border)
        pygame.draw.rect(screen,BLUE,down_border)

        # BEGIN EDIT
        if startcount > 5:
            for p in path:
                pygame.draw.rect(screen,(100,0,0),pygame.Rect((p[0],p[1],10,10)))
        # END EDIT

        pygame.draw.rect(screen,(35,142,35),pygame.Rect(food[0],food[1],10,10))

        if bonus:
            pygame.draw.rect(screen,(255,215,0),pygame.Rect(bonus[0],bonus[1],10,10))
            screen.blit(font.render(str(round(bonus_timer,1)),False,(255,255,0)), (200,8))
        screen.blit(font.render("Score: " + str(score),False,(255,255,0)), (900,8))
        for dot in snake:
            pygame.draw.rect(screen,WHITE,pygame.Rect(dot[0],dot[1],10,10))
        pygame.draw.rect(screen,BLUE,pygame.Rect(snake[0][0],snake[0][1],10,10))

        pygame.display.update()
        if countdown:
            update_rect = pygame.Rect(500,350,100,100)
            countdown = False
            for i in range(3,0,-1):
                pygame.draw.rect(screen,(0,0,0),update_rect)
                screen.blit(countdown_font.render(str(i),False,BLUE), (500,350))
                pygame.display.update(update_rect)
                pygame.time.delay(1000)
        #print(clock.get_fps())
        clock.tick(25)