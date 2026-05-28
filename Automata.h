#ifndef AUTOMATA_H
#define AUTOMATA_H

#include "Cluster.h"

#define CAMPO_Q     0   // Conjunto de estados Q          
#define CAMPO_SIGMA 1   // Alfabeto Sigma                  
#define CAMPO_DELTA 2   // Funcion de transicision Delta     
#define CAMPO_Q0    3   // Estado inicial q0               
#define CAMPO_F     4   // Conjunto de estados finales F   

void    free_automata(Tdata aut);
Tdata   obtener_campo(Tdata aut, int campo);
Tdata   delta_nd(Tdata Delta_nd, Tdata q, Tdata a);
void    encolar(Tdata *cola, Tdata elem);
Tdata   desencolar(Tdata *cola);
Tdata   AFNDtoAFD(Tdata automata_afnd);
void print_automata(Tdata aut);
Tdata ingresar_automata(void);
Tdata automata_precargado1(void);
Tdata automata_precargado2(void);
Tdata automata_precargado3(void);
void procesar_cadena(Tdata,char*);
#endif
