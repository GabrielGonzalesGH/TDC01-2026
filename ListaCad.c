#include "ListaCad.h"
// Inserta un nuevo par (clave, valor) al final de la lista
void insertar_par(Lista *Lis, const char *clave, const char *valor) {
	Tnodo *nuevo = (Tnodo*) malloc(sizeof(Tnodo));
	nuevo->clave = strdup(clave);
	nuevo->valor = strdup(valor);
	nuevo->sig = NULL;
	
	if (*Lis == NULL) {
		*Lis = nuevo;
	} else {
		Tnodo *aux = *Lis;
		while (aux->sig != NULL)
			aux = aux->sig;
		aux->sig = nuevo;
	}
}
// Busca una clave y devuelve el valor asociado (o NULL si no existe)
char* buscar_clave(Lista Lis, const char *clave) {
	Tnodo *aux = Lis;
	while (aux != NULL) {
		if (strcmp(aux->clave, clave) == 0)
			return aux->valor;  // devuelve puntero al valor
		aux = aux->sig;
	}
	return NULL;
}
void liberar_lista(Lista *Lis) {
	Tnodo *aux = *Lis;
	while (aux != NULL) {
		Tnodo *sig = aux->sig;
		free(aux->clave);
		free(aux->valor);
		free(aux);
		aux = sig;
	}
	*Lis = NULL;
}
int longitud_lista(Lista Lis) {
	int n = 0;
	while (Lis) { n++; Lis = Lis->sig; }
	return n;
}
