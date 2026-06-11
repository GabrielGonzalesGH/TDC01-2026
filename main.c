/** Teoria de la computacion I
PARTE UNO:
El objetivo es construir estructuras para representar:

AFD (Autómatas Finitos Deterministas)
AFND (Autómatas Finitos No Deterministas)
Aceptar o rechazar cadenas usando el AFD
utilizando la definición formal:

[ A = (Q, S, d, q0, F) ]

Donde:

Q = conjunto de estados
S = alfabeto
d = función de transición
q0 = estado inicial
F = conjunto de estados de aceptación

PARTE DOS:
Convertir AFND a AFD
Aceptar o rechazar cadenas
Renombrar estados
Soporte para otros carácteres de clausura
**/

/** Grupo 12, Gabriel Gonzales y Natalia Ochoa **/

/**
respuesta esperada:  AFD:
[ { {q0}, {q0,q1}, {q0,q2} }, { 0, 1 }, { [ {q0}, 0, {q0,q1} ], 
[ {q0}, 1, {q0} ], [ {q0,q1}, 0, {q0,q1} ], [ {q0,q1}, 1, {q0,q2} ], [ {q0,q2}, 0, {q0,q1} ], 
[ {q0,q2}, 1, {q0} ] }, {q0}, { {q0,q2} } ]
**/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "Automata.h"
//#include "config.h"

int menu(void);
void limpiar_buffer(void);
int main() {
	int rta, resp, seguir;
	Tdata afnd = NULL;
	configUsuario();
	//char *cadena = "[{q0, q1, q2}, {0, 1}, {[q0, 0, {q0, q1}], [q0, 1, {q0}], [q1, 0, {}], [q1, 1, {q2}], [q2, 0, {}], [q2, 1, {q1}]}, q0, {q2}]";
	printf("\n 	PARTE UNO DEL TPT: cargar una aut%cmata eligiendo una propuesta: \n", 162);
	char *cadena = "[{q0,q1,q2},{0,1},{[q0,0,{q0,q1}],[q0,1,{q0}],[q1,0,{}],[q1,1,{q2}],[q2,0,{}],[q2,1,{}]},q0,{q2}]";
	char *cad_adaptada = adaptar_cadena_precargada(cadena);
	Tdata automata = ini_branch();
	automata = createDT(cad_adaptada);
	//automata = automata_precargado0();
	printf("\n Cadena precargada: %s\n", cadena);
	printf("\n Cadena adaptada: %s\n", cad_adaptada);
	printf("\n Aut%cmata parseado:\n", 162);
	print_Tree(automata);
	printf("\n			===========================================================\n");
	printf("\n\n");
	
	Tdata Q     = obtener_campo(automata, CAMPO_Q);
	Tdata Sigma = obtener_campo(automata, CAMPO_SIGMA);
	Tdata Delta = obtener_campo(automata, CAMPO_DELTA);
	Tdata q0    = obtener_campo(automata, CAMPO_Q0);
	Tdata F     = obtener_campo(automata, CAMPO_F);
	
	printf("Componentes:\n");
	printf("Q     = "); print_Tree(Q); printf("\n");
	printf("Sigma = "); print_Tree(Sigma); printf("\n");
	printf("Delta = "); print_Tree(Delta); printf("\n");
	printf("q0    = "); print_Tree(q0); printf("\n");
	printf("F     = "); print_Tree(F); printf("\n");
	
	Tdata afd = ini_branch();
	afd = AFNDtoAFD(automata);
	printf("\nAFD resultante:\n");
	print_Tree(afd);
	printf("\n			===========================================================\n");
	free_automata(afd);	
	free_automata(automata);
	
	do{
		rta = menu();
		switch(rta){
		case 1:
			afnd = automata_precargado1();
			if (afnd == NULL) continue;
			printf("\n-----AFND de Entrada------\n");
			print_automata(afnd);
			afd = AFNDtoAFD(afnd);
			printf("\n-----AFD resultante------\n");
			print_automata(afd);
			
			seguir = 1;
			while (seguir) {
				printf("\n   Desea procesar una cadena? (1 = Si / 0 = No): ");
				scanf("%d", &resp);
				limpiar_buffer();
				if (resp == 1) {
					printf("   Ingrese la cadena: ");
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				} else {
					seguir = 0;
				}
			}
			free_automata(afd);
			free_automata(afnd);
			break;
		case 2:
			afnd = automata_precargado2();
			if (afnd == NULL) continue;
			printf("\n-----AFND de Entrada------\n");
			print_automata(afnd);
			afd = AFNDtoAFD(afnd);
			printf("\n-----AFD resultante------\n");
			print_automata(afd);
			
			seguir = 1;
			while (seguir) {
				printf("\n   Desea procesar una cadena? (1 = Si / 0 = No): ");
				scanf("%d", &resp);
				limpiar_buffer();
				if (resp == 1) {
					printf("   Ingrese la cadena: ");
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				} else {
					seguir = 0;
				}
			}
			free_automata(afd);
			free_automata(afnd);
			break;
		case 3:
			afnd = automata_precargado3();
			if (afnd == NULL) continue;
			printf("\n-----AFND de Entrada------\n");
			print_automata(afnd);
			afd = AFNDtoAFD(afnd);
			printf("\n-----AFD resultante------\n");
			print_automata(afd);
			
			seguir = 1;
			while (seguir) {
				printf("\n   Desea procesar una cadena? (1 = Si / 0 = No): ");
				scanf("%d", &resp);
				limpiar_buffer();
				if (resp == 1) {
					printf("   Ingrese la cadena: ");
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				} else {
					seguir = 0;
				}
			}
			free_automata(afd);
			free_automata(afnd);
			break;
		case 4: 
			printf("\n Orden: [{Q},{Sigma},{[q,a,{destinos}],...},q0,{F}]\n");
			printf("\n Ingrese el AFND: ");
			
			char *cadena = leeCad();
			afnd = ingresar_automata(cadena);
			if (afnd == NULL)
				continue;
			
			printf("\n-----AFND de Entrada------\n");
			print_automata(afnd);
			
			int tipo = es_afnd(afnd);
			if (tipo == 1) {
				afd = AFNDtoAFD(afnd);
			} else {
				afd = clone(afnd);
			}
			
			printf("\n-----AFD resultante (con conjuntos)------\n");
			print_automata(afd);
			
			// Aplanar y renombrar para tener estados legibles
			Tdata renombrado = aplanar_automata_afd(afd);
			renombrar_estados(renombrado);
			printf("\n-----AFD renombrado (r0, r1, ...)------\n");
			print_automata(renombrado);
			
			seguir = 1;
			while (seguir) {
				printf("\n	   Desea procesar una cadena? (1 = Si / 0 = No): ");
				scanf("%d", &resp);
				limpiar_buffer();
				
				if (resp == 1) {
					printf(" 	Ingrese la cadena: ");
					char *cade = leeCad();
					procesar_cadena(renombrado, cade);
					free(cade);
				} else {
					seguir = 0;
				}
			}
			
			free_automata(afd);
			free_automata(renombrado);
			free_automata(afnd);
			break;
				
		}
	} while(rta != 0);

	printf("\n Cerrando programa.... Cerrado.\n");
	
	return 0;
}
// [{q0, q1, q2}, {0, 1}, {[q0, 0, {q0, q1}], [q0, 1, {q0}], [q1, 0, {}], [q1, 1, {q2}], [q2, 0, {}], [q2, 1, {q1}]}, q0, {q2}]
// caso de prueba, cadena que termina en "mar":
//   [{q0,q1,q2,q3},{a,b,m,r},{ [q0,a,{q0}],[q0,b,{q0}],[q0,m,{q1}],[q0,r,{q0}],[q1,a,{q2}],[q1,b,{q0}],[q1,m,{q1}],[q1,r,{q0}],[q2,a,{q0}],[q2,b,{q0}],[q2,m,{q1}],[q2,r,{q3}],[q3,a,{q0}],[q3,b,{q0}],[q3,m,{q1}],[q3,r,{q0}] },q0,{q3}]
//   [{q0,q1,q2,q3},{a,b,m,r},{ [q0,a,q0],[q0,b,q0],[q0,m,q1],[q0,r,q0],[q1,a,q2],[q1,b,q0],[q1,m,q1],[q1,r,q0],[q2,a,q0],[q2,b,q0],[q2,m,q1],[q2,r,q3],[q3,a,q0],[q3,b,q0],[q3,m,q1],[q3,r,q0] },q0,{q3}]

int menu(void) {
	int op = 0;
	printf("\n	PARTE DOS DEL TPT: Seleccione una opci%cn del menu: ", 162);
	printf("\n		========================================\n");
	printf("                    MENU    \n");
	printf("		========================================\n");
	printf("	1. Cargar primer Aut%cmata Precargado (cantidad par de 'a').\n", 162);
	printf("	2. Cargar segundo Aut%cmata Precargado (termina en 'ab').\n", 162);
	printf("	3. Cargar tercer Aut%cmata Precargado (contiene '01').\n", 162);
	printf("	4. Ingresar nuevo AFND.\n");
	printf("\n");
	printf("	0. Salir\n");
	printf("		========================================\n");
	scanf("%d", &op);
	while(!(0 <= op && op <= 4)) {
		printf("\n  	Opcio%cn inv%clida, reingrese:  ", 162, 160);
		limpiar_buffer();
		scanf("%d", &op);
	}
	limpiar_buffer();
	return op;
}
