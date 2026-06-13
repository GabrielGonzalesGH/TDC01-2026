#include <stdio.h>
#include "config.h"

char openSET = '{';
char closeSET = '}';
char openLIST = '[';
char closeLIST = ']';
char separador = ',';

void configUsuario(void) {
	int valido = 0;
	
	while (!valido) {
		printf("\n Ingrese un s%cmbolo para representar el comienzo de un conjunto. \n ejemplo: '{'\n simbolo inicial para conjuntos: ", 161);
		scanf(" %c", &openSET);
		limpiar_buffer();
		
		printf("\n Ingrese un s%cmbolo para representar el cierre de un conjunto. \n ejemplo: '}'\n simbolo final para conjuntos: ", 161);
		scanf(" %c", &closeSET);
		limpiar_buffer();
		
		printf("\n Ingrese un s%cmbolo para representar el comienzo de una Lista. \n ejemplo: '['\n simbolo inicial para Listas: ", 161);
		scanf(" %c", &openLIST);
		limpiar_buffer();
		
		printf("\n Ingrese un s%cmbolo para representar el cierre de una Lista. \n ejemplo: ']'\n simbolo final para Listas: ", 161);
		scanf(" %c", &closeLIST);
		limpiar_buffer();
		
		printf("\n Ingrese un s%cmbolo para representar un separador. \n ejemplo: ',' \n simbolo separador: ", 161);
		scanf(" %c", &separador);
		limpiar_buffer();

		char simbolos[5] = {openSET, closeSET, openLIST, closeLIST, separador};
		int ok = 1;
		
		for (int ind = 0; ind < 5; ind++) {
			if (simbolos[ind] == ' ') {
				ok = 0;
				break;
			}
			for (int aux = ind + 1; aux < 5; aux++) {
				if (simbolos[ind] == simbolos[aux]) {
					ok = 0;
					break;
				}
			}
			if (!ok) break;
		}
		
		if (!ok) {
			printf("\n Los s%cmbolos no deben repetirse ni ser espacio, intente de nuevo.\n", 161);
		} else {
			valido = 1;
		}
	}
}

void limpiar_buffer(void) {
	int c;
	while ((c = getchar()) != '\n' && c != EOF);
}
