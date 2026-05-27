#include "Tree.h"

Tdata create_str_ast() {
	Tdata n = (Tdata) malloc(sizeof(struct dataType));
	n->nodeType = STR;
	n->string = NULL;
	return n;
}
void print_Branch(Tdata head, char open, char close) {
	printf("%c ", open);
	Tdata aux = head;
	
	while(aux != NULL) {
		print_Tree(aux->data); 
		if(aux->next != NULL) {
			printf(", ");
		}
		aux = aux->next;
	}
	printf(" %c", close);
}

void print_Tree(Tdata branch) {
    if (branch == NULL) {
        printf("{}");   // caso seguro, no debería darse
        return;
    }
    if (is_empty_container(branch)) {
        printf(branch->nodeType == SET ? "{ }" : "[ ]");
        return;
    }
    switch (branch->nodeType) {
    case STR:
        print_string(branch->string);
        break;
    case SET:
        print_Branch(branch, '{', '}');
        break;
    case LIST:
        print_Branch(branch, '[', ']');
        break;
    }
}
Tdata create_node(int type) {
	Tdata n = (Tdata)malloc(sizeof(struct dataType));
	if (n != NULL) {
		n->nodeType = type;
		n->data = NULL;
		n->next = NULL;
	}
	return n;
}
Tdata clone(Tdata n) {
	if (n == NULL)
		return NULL;
	
	Tdata nuevo = NULL;
	
	switch (n->nodeType) {
	case STR:
		nuevo = create_str_ast();
		nuevo->string = load2(n->string);
		break;
		
	case SET:
	case LIST: {
		Tdata *cola = &nuevo;
		Tdata aux = n;
		while (aux != NULL) {
			Tdata eslabon = create_node(aux->nodeType);
			eslabon->data = clone(aux->data);
			eslabon->next = NULL;
			*cola = eslabon;
			cola = &(eslabon->next);
			aux = aux->next;
		}
		break;
	}
	
	default:
		return NULL;  // cierre
	}
	return nuevo;
}
// Esta función es la que sabe navegar y clonar cualquier cosa
void append_branch(Tdata *root, Tdata element, int type) {
	Tdata nuevo_eslabon = create_node(type);
	
	nuevo_eslabon->data = clone(element);
	nuevo_eslabon->next = NULL;
	
	//insertamos al final
	if (*root == NULL) {
		*root = nuevo_eslabon;
	} else {
		Tdata aux = *root;
		while (aux->next != NULL) {
			aux = aux->next;
		}
		aux->next = nuevo_eslabon;
	}
}
int length(Tdata branch) {
    if (branch == NULL)
        return 0;
    // Si es un contenedor vacío (nodo SET o LIST sin elementos), devolvemos 0
    if (is_empty_container(branch))
        return 0;
    if (branch->nodeType == STR)
        return 0;

    int cont = 0;
    Tdata aux = branch;
    while (aux != NULL) {
        cont++;
        aux = aux->next;
    }
    return cont;
}
void free_tree(Tdata node) {
	if (node == NULL) return;
	
	switch (node->nodeType) {
	case STR:
		free_str(node->string);
		free(node);
		break;
		
	case SET:
	case LIST: {
		Tdata aux = node;
		while (aux != NULL) {
			Tdata siguiente = aux->next;  // guardamos antes de liberar
			free_tree(aux->data);          // libera el dato recursivamente
			free(aux);                     // libera el wrapper
			aux = siguiente;
		}
		break;
	}
	default:
		break;
	}
}
int is_empty_container(Tdata node) {
	return node != NULL && 
		node->nodeType != STR && 
		node->data == NULL && 
		node->next == NULL;
}
// Devuelve 1 si es conjunto vacío (NULL o nodo SET sin elementos)
int is_empty_set(Tdata s) {
	if (s == NULL) return 1;
	if (s->nodeType != SET) return 0;  // no es conjunto
	return (s->data == NULL && s->next == NULL);
}
