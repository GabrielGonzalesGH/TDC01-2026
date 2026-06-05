/** Teoria de la computacion I

fecha: 28/05/26

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

int menu(void);
void limpiar_buffer(void);
int main() {
	int rta,resp;
	Tdata afnd = NULL;
	// debe andar con el espacio y sin espacio luego de la coma
	//por ahora está hardcodeado, hay que darle la opcion al usuario de ingresar manualmente un AFND
	// también tener pre cargado o sea hardcodeado 3 autómatas listos para mostrar con el menu
	//char *cadena = "[{q0, q1, q2}, {0, 1}, {[q0, 0, {q0, q1}], [q0, 1, {q0}], [q1, 0, {}], [q1, 1, {q2}], [q2, 0, {}], [q2, 1, {q1}]}, q0, {q2}]";
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
	printf("Delta = "); print_Tree(Delta); printf("\n");
	printf("q0    = "); print_Tree(q0); printf("\n");
	printf("F     = "); print_Tree(F); printf("\n");
	
	Tdata afd = ini_branch();
	afd = AFNDtoAFD(automata_tdata);
	printf("\nAFD resultante:\n");
	print_Tree(afd);
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
				printf("Desea procesar una cadena? (si[1]/no[0]) = ");
				scanf("%d",&resp);
				if(resp == 1){
					printf(" Ingrese la cadena: ");
					limpiar_buffer(); 
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				}
				free_automata(afd);
				free_automata(afnd); break;
		case 2: afnd = automata_precargado2(); 
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				printf("Desea procesar una cadena? (si[1]/no[0]) = ");
				scanf("%d",&resp);
				if(resp == 1){
					printf(" Ingrese la cadena: ");
					limpiar_buffer(); 
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				}
				free_automata(afd);
				free_automata(afnd); break;
		case 3: afnd = automata_precargado3(); 
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				afd = AFNDtoAFD(afnd);
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				printf("Desea procesar una cadena? (si[1]/no[0]) = ");
				scanf("%d",&resp);
				if(resp == 1){
					printf(" Ingrese la cadena: ");
					limpiar_buffer();
					char *cadena = leeCad();
					procesar_cadena(afd, cadena);
					free(cadena);
				}
				free_automata(afd);
				free_automata(afnd); break;
		case 4: 
				printf("\n Orden: [{Q},{Sigma},{[q,a,{destinos}],...},q0,{F}]\n");
				printf("\n Ingrese el AFND: ");
				
				char *cadena = leeCad();
				int tipo = es_afnd(cadena);
				afnd = ingresar_automata(cadena);
				if(afnd == NULL) continue;
				printf("\n-----AFND de Entrada------\n");
				print_automata(afnd);
				if(tipo == 1) {
					afd = AFNDtoAFD(afnd);
					printf("\nEl autómata es AFND ? se convierte a AFD.\n");
				}
				else {
					afd = clone(afnd);
					printf("\nEl autómata ya es AFD (destinos atómicos). Se clona para trabajar.\n");
				}
				printf("\n-----AFD resultante------\n");
				print_automata(afd);
				printf("Desea procesar una cadena? (si[1]/no[0]) = ");
				scanf("%d",&resp);
				if(resp == 1){
					printf(" Ingrese la cadena: ");
					limpiar_buffer();
					char *cade = leeCad();
					procesar_cadena(afd, cade);
					free(cade);
				}
				free_automata(afd);
				free_automata(afnd); break;
				// caso de prueba, cadena que termina en "mar":
				//   [{q0,q1,q2,q3},{a,b,m,r},{ [q0,a,{q0}],[q0,b,{q0}],[q0,m,{q1}],[q0,r,{q0}],[q1,a,{q2}],[q1,b,{q0}],[q1,m,{q1}],[q1,r,{q0}],[q2,a,{q0}],[q2,b,{q0}],[q2,m,{q1}],[q2,r,{q3}],[q3,a,{q0}],[q3,b,{q0}],[q3,m,{q1}],[q3,r,{q0}] },q0,{q3}]
				//   [{q0,q1,q2,q3},{a,b,m,r},{ [q0,a,q0],[q0,b,q0],[q0,m,q1],[q0,r,q0],[q1,a,q2],[q1,b,q0],[q1,m,q1],[q1,r,q0],[q2,a,q0],[q2,b,q0],[q2,m,q1],[q2,r,q3],[q3,a,q0],[q3,b,q0],[q3,m,q1],[q3,r,q0] },q0,{q3}]
		}
	} while(rta != 0);

	printf("\n Cerrando programa.... Cerrado.\n");
	
	return 0;
}

int menu(void) {
	int op = 0;
	printf("\nSeleccione una opcion del menu: ");
	printf("\n========================================\n");
	printf("                    MENU    \n");
	printf("========================================\n");
	printf("1. Cargar primer Automata Precargado (cantidad par de 'a').\n");
	printf("2. Cargar segundo Automata Precargado (termina en 'ab').\n");
	printf("3. Cargar tercer Automata Precargado (contiene '01').\n");
	printf("4. Ingresar nuevo AFND.\n");
	printf("   Ejemplo: [{q0,q1},{a,b},{[q0,a,{q1}],[q0,b,{q0}],[q1,a,{q0}],[q1,b,{q1}]},q0,{q0}]\n");
	printf("0. Salir\n");
	printf("========================================\n");
	scanf("%d", &op);
	while(!(0 <= op && op <= 4)) {
		printf("\n  Opciocn invalida, reingrese:  ");
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
