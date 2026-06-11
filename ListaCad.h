#ifndef LISTACAD_H
#define LISTACAD_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct nodo {
	char *clave;
	char *valor;
	struct nodo *sig;
} Tnodo;
typedef Tnodo *Lista;

void insertar_par(Lista *, const char *, const char *);
char* buscar_clave(Lista , const char *);
void liberar_lista(Lista *);
int longitud_lista(Lista);

#endif
