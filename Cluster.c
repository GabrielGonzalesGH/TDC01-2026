#include "Cluster.h"
int contains_deep(Tdata, Tdata);
int equals_tdata(Tdata, Tdata);
char * str_Branch(Tdata, char, char);

Tdata ini_set(void) {
	return NULL;
}
Tdata ini_list(void) {
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
		if (set == NULL || elem == NULL)
			return 0;
		return contains_deep(set, elem);  // maneja STR, SET y LIST
	
	/*
	if (cluster == NULL || elem == NULL) return 0;
	if (elem->nodeType != STR) return 0;
	
	Tdata aux = cluster;
	while (aux != NULL) {
		if (aux->data != NULL && aux->data->nodeType == STR) {
			if (compara_str(aux->data->string, elem->string) == 0)
				return 1;
		}
		aux = aux->next;
	}
	return 0;*/
}
void remove_set(Tdata *set, Tdata elem) {
	if (*set == NULL || elem == NULL)
		return;
	if (elem->nodeType != STR)
		return;
	
	Tdata prev = NULL;
	Tdata aux = *set;
	
	while (aux != NULL) {
		if (aux->data != NULL && aux->data->nodeType == STR) {
			if (compara_str(aux->data->string, elem->string) == 0) {
				
				if (prev == NULL)
					*set = aux->next;
				else
					prev->next = aux->next;
				
				free_str(aux->data->string);
				free(aux->data);
				free(aux);
				return;
			}
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
	if (ingreso[0] != '{' && ingreso[0] != '[') {
		Tdata leaf   = create_str_ast();
		leaf->string = load2(ingreso);
		return leaf;
	}
	
	int   type = (ingreso[0] == '{') ? SET : LIST;
	Tdata cluster = NULL;
	char *cad = saca_extremos(ingreso);
	
	while (cad != NULL && cad[0] != '\0') {
		char *aux = dev_elem(cad);
		poda_elem_ini(aux, cad);
		
		if (aux[0] == '{' || aux[0] == '[') {
			Tdata subRoot = createDT(aux);
			if (type == SET)
				append_set(&cluster, subRoot);   //  reglas SET
			else
				append_list(&cluster, subRoot);  //  reglas LIST
			free_tree(subRoot);
		} else {
			Tdata leaf = create_str_ast();
			leaf->string = load2(aux);
			if (type == SET)
				append_set(&cluster, leaf);      //  filtra duplicados
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
	if (A == NULL && B == NULL)
		return NULL;
	if (A == NULL)
		return clone(B);
	if (B == NULL)
		return clone(A);
	if (A->nodeType != SET || B->nodeType != SET)
		return NULL;
	
	Tdata result = clone(A);   // copia profunda de A como base
	
	Tdata aux = B;
	while (aux != NULL) {
		append_set(&result, aux->data);  // belongs() filtra duplicados
		aux = aux->next;
	}
	return result;
}
Tdata intersection_set(Tdata A, Tdata B) {
	if (A == NULL || B == NULL)
		return NULL;
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
	if (A == NULL)
		return NULL;
	if (B == NULL)
		return clone(A);  // A - vacío = A
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
	if (A == NULL)
		return 1;    // vacío es subconjunto de cualquier cosa
	if (B == NULL)
		return 0;
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
	Tdata prod = NULL;
	printf("\n falta hacer wip ...");
	return prod;
}
char * conversion_str(Tdata cluster) {
	if (cluster == NULL)
		return str_crear("{}");   //luego intentar con Ø
	
	switch (cluster->nodeType) {
	case STR:
		return str_crear(cluster->string);  // antes er print_string()
	case SET:
		return str_Branch(cluster, '{', '}');
	case LIST:
		return str_Branch(cluster, '[', ']');
	default:
		return str_crear("");
	}
}
char * str_Branch(Tdata head, char open, char close) {
	char *op  = str_crear(open  == '{' ? "{ " : "[ ");
	char *cl  = str_crear(close == '}' ? " }" : " ]");
	
	char *acc = str_crear(op);
	
	Tdata aux = head;
	while (aux != NULL) {
		char *elem = conversion_str(aux->data);
		char *tmp  = concat_str(acc, elem);
		free(acc);
		free(elem);
		acc = tmp;
		
		if (aux->next != NULL) {
			tmp = concat_str(acc, ", ");
			free(acc);
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
