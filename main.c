/** Teoria de la computacion I

fecha: 25/05/26

El objetivo es construir estructuras para representar:

AFD (Autómatas Finitos Deterministas)
AFND (Autómatas Finitos No Deterministas)
utilizando la definición formal:

[ A = (Q, S, d, q0, F) ]

Donde:

Q = conjunto de estados
S = alfabeto
d = función de transición
q0 = estado inicial
F = conjunto de estados de aceptación **/

/** Grupo 12, Gabriel Gonzales y Natalia Ochoa **/

/**
caso ej.:
cadenas terminan en "ab"
AFD:
[ { q0, q1, q2 }, { a, b }, { [ q0, a, { q0, q1 } ], 
[ q0, b, { q0 } ], [ q1, b, { q2 } ], [ q2, a, { q2 } ], [ q2, b, { q2 } ] },
 q0, { q2 } ]

AFD resultante:
[ { { q0 }, { q0, q1 }, { q0, q2 }, { q0, q1, q2 } }, { a, b },
 { [ { q0 }, a, { q0, q1 } ], [ { q0 }, b, { q0 } ], [ { q0, q1 }, a, { q0, q1 } ], 
[ { q0, q1 }, b, { q0, q2 } ], [ { q0, q2 }, a, { q0, q1, q2 } ], [ { q0, q2 }, b, { q0, q2 } ],
 [ { q0, q1, q2 }, a, { q0, q1, q2 } ], [ { q0, q1, q2 }, b, { q0, q2 } ] },
 { q0 }, { { q0, q2 }, { q0, q1, q2 } } ]
**/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "Automata.h"

int menu(void);
void limpiar_buffer(void);
int main(void) {
	int rta;
	Tdata afnd = NULL;
	printf("	REPRESENTACION DE UN AFND Y POSTERIOR CONVERSION A AFD:\n\n");
	char *cadena = "[{q0,q1,q2},{0,1},{[q0,0,{q0,q1}],[q0,1,{q0}],[q1,0,{}],[q1,1,{q2}],[q2,0,{}],[q2,1,{}]},q0,{q2}]";
	Tdata automata_tdata = ini_branch();
	automata_tdata = createDT(cadena);
	printf("cadena original: %s\n", cadena);
	printf("Automata parseado:\n");
	print_Tree(automata_tdata);
	printf("\n\n");
	
	Tdata Q     = obtener_campo(automata_tdata, CAMPO_Q);
	Tdata Sigma = obtener_campo(automata_tdata, CAMPO_SIGMA);
	Tdata Delta = obtener_campo(automata_tdata, CAMPO_DELTA);
	Tdata q0    = obtener_campo(automata_tdata, CAMPO_Q0);
	Tdata F     = obtener_campo(automata_tdata, CAMPO_F);
	
	printf("Componentes:\n");
	printf("Q     = "); print_Tree(Q); printf("\n");
	printf("Sigma = "); print_Tree(Sigma); printf("\n");
	printf(" Delta = "); print_delta(Delta); printf("\n");
	printf("q0    = "); print_Tree(q0); printf("\n");
	printf("F     = "); print_Tree(F); printf("\n");
	
	Tdata afd = ini_branch();
	afd = AFNDtoAFD(automata_tdata);
	printf("\nAFD resultante:\n");
	print_automata(afd);
	free_automata(afd);	
	free_automata(automata_tdata);
	
	do{
		rta = menu();
		switch(rta){
		case 1: afnd = automata_precargado1();
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				free_automata(afd);
				free_automata(afnd); break;
		case 2: afnd = automata_precargado2(); 
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				free_automata(afd);
				free_automata(afnd); break;
		case 3: afnd = automata_precargado3(); 
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				free_automata(afd);
				free_automata(afnd); break;
		case 4: afnd = ingresar_automata(); 
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				free_automata(afd);
				free_automata(afnd); break;
		}
	} while(rta != 0);

	printf("\n Cerrando programa.... Cerrado.\n");
	
	return 0;
}

int menu(void) {
	int op = 0;
	printf("\nSeleccione una opci%cn del menu: ", 162);
	printf("\n========================================\n");
	printf("                    MENU    \n");
	printf("========================================\n");
	printf("1. Seleccionar primer Automata Precargado (cantidad par de 'a').\n");
	printf("2. Seleccionar segundo Automata Precargado (termina en 'ab').\n");
	printf("3. Seleccionar tercer Automata Precargado (contiene '01').\n");
	printf("4. Ingresar nuevo AFND.\n");
	printf("   Ejemplo: [{q0,q1},{a,b},{[q0,a,{q1}],[q0,b,{q0}],[q1,a,{q0}],[q1,b,{q1}]},q0,{q0}]\n");
	printf("0. Salir\n");
	printf("========================================\n");
	scanf("%d", &op);
	while(!(0 <= op && op <= 4)) {
		printf("\n  Opcio%cn inv%clida, reingrese:  ",162, 160);
		limpiar_buffer();
		scanf("%d", &op);
	}
	limpiar_buffer();
	return op;
}
void limpiar_buffer(void) {  // flush(stdin)
	int c;
	while((c = getchar()) != '\n' && c != EOF);
}
