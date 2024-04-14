import random

# El glovito se define como dos matrices la de transición y la de salidas
def simula(transicion, sale, ambiente):
  estado = 0
  salida = []
  for k in range(len(ambiente)):
    salida.append(sale[estado][ambiente[k]])
    estado = transicion[estado][ambiente[k]]
  # Comparar entrada cn salida
  c = 0
  for k in range(len(ambiente)-1): # No compara el último
    c += 1 if ambiente[k+1] == salida[k] else 0 #compara corridos
  return c

#Codifique el glovito a binario
def codifica(transicion, sale):
  genoma = []
  for i in range(len(transicion)): # Recorrido por filas 
    # Tomamos el estado a binario para = y luego para 1
    for j in range(2):
      genoma.append( transicion[i][j] // 2 ) # Codifico el estado en binario (j=0, 1)
      genoma.append( transicion[i][j] % 2 ) 
      genoma.append( sale[i][j] )  # Codifico lo que sale (j=0, 1) 
  return genoma

def crece(genoma):
  transicion =[]
  sale = []
  k = 0
  for i in range(4):
    transicion.append([])
    sale.append([])
    for j in range(2):
      transicion[i].append(genoma[k]*2 + genoma[k+1])
      sale[i].append(genoma[k+2])
      k += 3
  return transicion, sale

def crea():
  transicion =[]
  sale = []
  for i in range(4):
    transicion.append([])
    sale.append([])
    for j in range(2):
      transicion[i].append(random.randint(0,3))
      sale[i].append(random.randint(0,1))
  return transicion, sale

def imprime(transicion, sale):
  print(transicion)
  print(sale)

#def muta(genoma):
#  p = random.randint(0,len(genoma)-1)
#  g2 = [x for x in genoma]
#  g2[p] = 1 - g2[p]
#  return g2

def muta(genoma):
  p = 1/len(genoma)
  return [(1-x if random.random()<=p else x) for x in genoma]

def cruza(g1, g2):
  p = random.randint(1, len(g1)-2)
  return [(g1[i] if(i<p) else g2[i]) for i in range(len(g1))], \
         [(g2[i] if(i<p) else g1[i]) for i in range(len(g1))]

def torneo(f):
  p = [random.randint(0,len(f)-1) for i in range(4)]
  b = 0
  for i in range(1,len(p)):
    if(f[p[i]] > f[p[b]]):
      b = i
  return p[b]

def muerte(f):
  p = [random.randint(0,len(f)-1) for i in range(4)]
  b = 0
  for i in range(1,len(p)):
    if(f[p[i]] < f[p[b]]):
      b = i
  return p[b]

def repara():
  t,s = crea()
  return codifica(t,s)

def repara2(x,a):
  t, s = crece(x)
  return simula(t, s, a)

def ag(ITERS, N, a):
  P = [repara() for i in range(N)]
  f = [repara2(x,a) for x in P]
  print(0, max(f))
  for i in range(1, ITERS+1):
    p1, p2 = torneo(f), torneo(f)
    h1, h2 = cruza(P[p1],P[p2])
    h1, h2 = muta(h1), muta(h2)
    m1, m2 = muerte(f), muerte(f)
    f[m1], f[m2] = repara2(h1,a), repara2(h2,a)
    P[m1], P[m2] = h1, h2
    print(i, max(f))

def ascenso( ITERS, a ):
  t, s = crea()
  c = simula(t,s,a)
  g = codifica(t, s)
  print(0, c)
  for i in range(1,ITERS+1):
    g1 = muta(g)
    t1, s1 = crece(g1)
    c1 = simula(t1, s1, a)
    if(c1>=c):
      t, s, c = t1, s1, c1
    print(i, c)
  return t, s

def main():
  a = [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1]
  ag( 100, 4, a)

main()
