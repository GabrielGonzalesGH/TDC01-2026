#include <stdio.h>
#include "config.h"
char openSET = '{';
char closeSET = '}';
char openLIST = '[';
char closeLIST = ']';
char separador = ',';

void configUsuario(void){
	printf("\n Ingrese un s%cmbolo para representar el comienzo de un conjunto. \n ejemplo: '{'\n simbolo inicial para conjuntos: ", 161);
	scanf(" %c", &openSET);   // espacio antes para ignorar whitespace
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
	limpiar_buffer(); // para consumir el newline
}
void limpiar_buffer(void) {  // flush(stdin)
	int c;
	while((c = getchar()) != '\n' && c != EOF);
}
