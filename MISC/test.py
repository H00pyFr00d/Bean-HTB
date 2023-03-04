from random import randint
import time


def slowPrint():
    toPrint = '.'
    for i in range(1, 4):
        time.sleep(0.5)
        print(toPrint)
        toPrint = toPrint + '.'


def russianRoulette(bullet, pull):
    chamber = [0, 0, 0, 0, 0, 0]
    count = 0
    while count < bullet:
        pick = randint(0, 5)
        if chamber[pick] == 0:
            chamber[pick] = 1
            count += 1
        # else already filled
    start = randint(0, 5)
    i = 0
    while i < pull:
        shoot = chamber[(i + start) % 6]
        slowPrint()
        time.sleep(randint(10, 50) / 20)
        if shoot == 1:
            print("BAM dead")
            i = 6
            return True
        else:
            print("click")
            i += 1
    return False


b = int(input("How many bullets (6 chamber gun)"))
p = int(input("How many pulls of trigger"))
dead = russianRoulette(b, p)
print(dead)


