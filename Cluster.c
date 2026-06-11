#include "Cluster.h"
int contains_deep(Tdata, Tdata);
char * str_Branch(Tdata, char, char);

Tdata ini_branch(void) {
	return NULL;
}
Tdata create_list(){
	return create_node(LIST);
}
Tdata create_set(void){
	return create_node(SET);
}
void printList(Tdata cluster) {
	print_Tree(cluster);
}
void printSet(Tdata cluster) {
	print_Tree(cluster);
}
Tdata copy_list(Tdata list) {
	if (list == NULL || list->nodeType != LIST)
		return NULL;
	return clone(list);
}
void append_list(Tdata * branch, Tdata leaf) {
	append_branch(branch, leaf, LIST);
}
void append_set(Tdata * branch, Tdata leaf) {
	if (belongs(*branch, leaf))
		return;
	append_branch(branch, leaf, SET);
}
int search(Tdata list, Tdata elem) {
	if (list == NULL || elem == NULL)
		return 0;
	if (elem->nodeType != STR)
		return 0;
	
	int pos = 1;
	Tdata aux = list;
	while (aux != NULL) {
		if (aux->data != NULL && aux->data->nodeType == STR) {
			if (compara_str(aux->data->string, elem->string) == 0)
				return pos;
		}
		pos++;
		aux = aux->next;
	}
	return 0;
}

int belongs(Tdata set, Tdata elem) {
	if (set == NULL)
		return 0;
	// Se elimina la línea que devuelve 0 cuando elem == NULL
	return contains_deep(set, elem);
}
void remove_set(Tdata *set, Tdata elem) {
    Tdata prev = NULL;
    Tdata aux = *set;
    
    while (aux != NULL) {
        if (equals_tdata(aux->data, elem)) {
            if (prev == NULL)
                *set = aux->next;
            else
                prev->next = aux->next;
            
            free_tree(aux->data);
            free(aux);
            return;
        }
        prev = aux;
        aux = aux->next;
    }
}
void insert_set(Tdata *set, Tdata elem) {
	if (belongs(*set, elem))
		return;
	append_branch(set, elem, SET);
}
int equals_tdata(Tdata a, Tdata b) {
	if (a == NULL && b == NULL)
		return 1;
	if (a == NULL || b == NULL)
		return 0;
	if (a->nodeType != b->nodeType)
		return 0;
	
	switch (a->nodeType) {
	case STR:
		return compara_str(a->string, b->string) == 0;
		
	case LIST: {
		Tdata pa = a, pb = b;
		while (pa != NULL && pb != NULL) {
			if (!equals_tdata(pa->data, pb->data))
				return 0;
			pa = pa->next;
			pb = pb->next;
		}
		return pa == NULL && pb == NULL;
	}
	
	case SET: {
		// en set el orden NO importa
		if (length(a) != length(b))
			return 0;
		Tdata aux = a;
		while (aux != NULL) {
			if (!contains_deep(b, aux->data))
				return 0;
			aux = aux->next;
		}
		return 1;
	}
	
	default: return 0;
	}
}	
int contains_deep(Tdata set, Tdata elem) {
	Tdata aux = set;
	while (aux != NULL) {
		if (equals_tdata(aux->data, elem))
			return 1;
		aux = aux->next;
	}
	return 0;
}
int equals_set(Tdata A, Tdata B) {
	if (A == NULL && B == NULL)
		return 1;
	if (A == NULL || B == NULL)
		return 0;
	if (A->nodeType != SET || B->nodeType != SET)
		return 0;
	return equals_tdata(A, B);
}
Tdata createDT(char *ingreso) {
    if (ingreso[0] != openSET && ingreso[0] != openLIST) {
        Tdata leaf = create_str_ast();
        leaf->string = load2(ingreso);
        return leaf;
    }
    int type = (ingreso[0] == openSET) ? SET : LIST;
    Tdata cluster = NULL;
    char *cad = saca_extremos(ingreso);
    if (cad == NULL || cad[0] == '\0') {
        free(cad);
        return create_node(type);
    }
    while (cad != NULL && cad[0] != '\0') {
        char *aux = dev_elem(cad);
        poda_elem_ini(aux, cad);
        if (aux[0] == openSET || aux[0] == openLIST) {
            Tdata subRoot = createDT(aux);
            if (type == SET)
                append_set(&cluster, subRoot);
            else
                append_list(&cluster, subRoot);
            free_tree(subRoot);
        } else {
            Tdata leaf = create_str_ast();
            leaf->string = load2(aux);
            if (type == SET)
                append_set(&cluster, leaf);
            else
                append_list(&cluster, leaf);
            free_tree(leaf);
        }
        free(aux);
    }
    free(cad);
    return cluster;
}
Tdata union_set(Tdata A, Tdata B) {
    if (is_empty_set(A) && is_empty_set(B))
		return create_set();  // vacío
    if (is_empty_set(A))
		return clone(B);
    if (is_empty_set(B))
		return clone(A);
    if (A->nodeType != SET || B->nodeType != SET)
		return NULL;

    Tdata result = clone(A);
    Tdata aux = B;
    while (aux != NULL) {
        append_set(&result, aux->data);
        aux = aux->next;
    }
    return result;
}
Tdata intersection_set(Tdata A, Tdata B) {
    if (is_empty_set(A) || is_empty_set(B)) {
        return create_set();
	}
	if (A->nodeType != SET || B->nodeType != SET)
		return NULL;
	
	Tdata result = NULL;
	Tdata aux = A;
	while (aux != NULL) {
		if (contains_deep(B, aux->data))
			append_set(&result, aux->data);
		aux = aux->next;
	}
	return result;
}
Tdata difference_set(Tdata A, Tdata B) {
    if (is_empty_set(A)) {
        // A vacío ? resultado vacío (da igual si B es vacío o no)
		return create_set();
    }
    if (is_empty_set(B)) {
        return clone(A);   // A - vacío = A
    }
	if (A->nodeType != SET || B->nodeType != SET)
		return NULL;
	
	Tdata result = NULL;
	Tdata aux = A;
	while (aux != NULL) {
		if (!contains_deep(B, aux->data))   // solo lo que NO está en B
			append_set(&result, aux->data);
		aux = aux->next;
	}
	return result;
}
int subset(Tdata A, Tdata B) {
    if (is_empty_set(A)) {  // conjunto vacío siempre es subconjunto
        return 1;
	}
    if (is_empty_set(B)) {  // A no vacío y B vacío ? no puede ser subconjunto
        return 0;
	}
	if (A->nodeType != SET || B->nodeType != SET)
		return 0;
	
	Tdata aux = A;
	while (aux != NULL) {
		if (!contains_deep(B, aux->data))
			return 0;  // encontré uno que no está
		aux = aux->next;
	}
	return 1;
}
Tdata prod_cartesiano(Tdata A, Tdata B) {
    if (A == NULL || B == NULL) return NULL;
    if (A->nodeType != SET || B->nodeType != SET) return NULL;
    
    // Si alguno es vacío, producto vacío
    if (is_empty_container(A) || is_empty_container(B))
        return NULL;   // conjunto vacío

    Tdata resultado = NULL;   // ini_set()
    
    Tdata auxA = A;
    while (auxA != NULL) {
        Tdata a = auxA->data;   // a es un nodo (nunca NULL porque A no vacío)
        Tdata auxB = B;
        while (auxB != NULL) {
            Tdata b = auxB->data;
            
            Tdata par = NULL;
            append_list(&par, a);
            append_list(&par, b);
            append_set(&resultado, par);
            free_tree(par);
            
            auxB = auxB->next;
        }
        auxA = auxA->next;
    }
    return resultado;
}
char * conversion_str(Tdata cluster) {
    if (cluster == NULL)
        return str_crear("{}");   // caso seguro
    switch (cluster->nodeType) {
    case STR:
        return str_crear(cluster->string);
    case SET:
        if (cluster->data == NULL) {
            char buf[4];
            sprintf(buf, "%c %c", openSET, closeSET);
            return str_crear(buf);
        }
        return str_Branch(cluster, openSET, closeSET);
    case LIST:
        if (cluster->data == NULL) {
            char buf[4];
            sprintf(buf, "%c %c", openLIST, closeLIST);
            return str_crear(buf);
        }
        return str_Branch(cluster, openLIST, closeLIST);
    default:
        return str_crear("");
    }
}
char * str_Branch(Tdata head, char open, char close) {
    // Construir strings de apertura y cierre (con un espacio después de open y antes de close)
    char open_str[3] = {open, ' ', '\0'};
    char close_str[3] = {' ', close, '\0'};
    char *op = str_crear(open_str);
    char *cl = str_crear(close_str);
    char *acc = str_crear(op);
    Tdata aux = head;
    while (aux != NULL) {
        char *elem = conversion_str(aux->data);
        char *tmp = concat_str(acc, elem);
        free(acc);
        free(elem);
        acc = tmp;
        if (aux->next != NULL) {
            char sep_str[3] = {separador, ' ', '\0'};
            char *sep = str_crear(sep_str);
            tmp = concat_str(acc, sep);
            free(acc);
            free(sep);
            acc = tmp;
        }
        aux = aux->next;
    }
    char *tmp = concat_str(acc, cl);
    free(acc);
    free(op);
    free(cl);
    return tmp;
}
