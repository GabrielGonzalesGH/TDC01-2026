#include "Leaf.h"
void trim_izq(char *);

int compara_str(str cad_1, str cad_2) {
	return strcmp(cad_1, cad_2);
}
int tam_str(str cad) {
	return strlen(cad);
}
str str_crear(const char *s) {
	str r = (str) malloc(strlen(s) + 1);
	if (r != NULL)
		strcpy(r, s);
	return r;
}
str concat_str(str cad_1, str cad_2) {
	str nuevo = (str) malloc(strlen(cad_1) + strlen(cad_2) + 1);
	if(nuevo != NULL) {
		strcpy(nuevo, cad_1);
		strcat(nuevo, cad_2);
	}
	return nuevo;
}
void free_str(str cad) {
	free(cad);
}
str load2(const char* s){
	str r = (str)malloc(strlen(s)+1);
	strcpy(r, s);
	return r;
}
char *leeCad(void) {
	int tam = 0;
	char *cadena = (char *) malloc(sizeof(char));
	if(cadena == NULL)
		return NULL;
		
	char c;
	while((c = getchar()) != EOF && c != '\n') {
		// espacio extra para '\0'
		char *aux = (char *) realloc(cadena, sizeof(char) * (tam + 2));
		if(aux == NULL) {
			cadena[tam] = '\0';
			return cadena;
		}
		cadena = aux;
		cadena[tam] = c;
		tam++;
	}
	cadena[tam] = '\0';
	return cadena;
}
void print_string(str s){
	printf("%s", s);
}
// quita el primer y último char: "{abc}" ? "abc"
char *saca_extremos(char *cad) {
	int len = strlen(cad);
	if (len <= 2)
		return NULL;          // "{}" o "[]" ? vacío
	
	char *nuevo = (char *)malloc(len - 1); // len-2 chars + '\0'
	for (int i = 0; i < len - 2; i++)
		nuevo[i] = cad[i + 1];
	nuevo[len - 2] = '\0';
	return nuevo;
}	
// calcula el tamaño del primer elemento en la cadena
// con contador de profundidad para estructuras anidadas
int dev_tam_elem(char *cad) {
	int ind = 0;
	
	if (cad[0] != '{' && cad[0] != '[') {
		while (cad[ind] != '\0' && cad[ind] != ',')
			ind++;
		return ind;
	}
	
	char open  = cad[0];
	char close = (open == '{') ? '}' : ']';
	int depth  = 0;
	
	while (cad[ind] != '\0') {
		if (cad[ind] == open)
			depth++;
		if (cad[ind] == close)
			depth--;
		ind++;
		if (depth == 0)
			break;
	}
	return ind;
}
	
// devuelve una copia del primer elemento
char *dev_elem(char *cad) {
	int  tam   = dev_tam_elem(cad);
	char *nuevo = (char *)malloc(tam + 1);
	strncpy(nuevo, cad, tam);
	nuevo[tam] = '\0';
	return nuevo;
}
	
// elimina el primer elemento (y la coma siguiente) de orig in-place
void poda_elem_ini(char *a_podar, char *orig) {
	int tam_elem = dev_tam_elem(a_podar);
	int ind = 0;
		
	// desplaza el resto hacia el inicio, saltando elem + coma
	while (orig[ind + tam_elem] != '\0') {
		orig[ind] = orig[ind + tam_elem + 1]; // +1 salta la coma
		ind++;
	}
	
	// si lo que quedó es igual al elemento, era el último ? vaciar
	if (strcmp(a_podar, orig) == 0)
		orig[0] = '\0';
	
	// trim del espacio que deja ", siguiente"
	trim_izq(orig);
}
void trim_izq(char *s) {
	while (s[0] == ' ') {
		int i = 0;
		while ((s[i] = s[i + 1]) != '\0')
			i++;
	}
}
