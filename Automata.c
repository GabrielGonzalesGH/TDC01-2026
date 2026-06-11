#include "Automata.h"

void free_automata(Tdata aut) {
	free_tree(aut);
}
Tdata obtener_campo(Tdata aut, int campo) {
	Tdata aux = aut;
	for (int i = 0; i < campo && aux; i++) aux = aux->next;
	return aux ? aux->data : NULL;
}

Tdata delta_nd(Tdata Delta_nd, Tdata q, Tdata a) {
	Tdata aux = Delta_nd;
	while (aux != NULL) {
		Tdata trans = aux->data;          /* lista [from, symbol, to] */
		Tdata from  = trans->data;
		Tdata sym   = trans->next->data;
		if (equals_tdata(from, q) && equals_tdata(sym, a)) {
			Tdata to = trans->next->next->data;
			return clone(to);             /* clonamos para independencia */
		}
		aux = aux->next;
	}
	return NULL;   // conj vacío
}

// Encolar un elemento (Tdata) al final de una lista usada como cola.
void encolar(Tdata *cola, Tdata elem) {
	Tdata nuevo = create_node(LIST);
	nuevo->data = elem;      // elem ya es una referencia (no se clona aquí)
	nuevo->next = NULL;
	if (*cola == NULL) {
		*cola = nuevo;
	} else {
		Tdata aux = *cola;
		while (aux->next != NULL) aux = aux->next;
		aux->next = nuevo;
	}
}

// Desencolar: devuelve el primer elemento y lo elimina de la cola.
Tdata desencolar(Tdata *cola) {
	if (*cola == NULL) return NULL;
	Tdata primero = *cola;
	Tdata elem    = primero->data;
	*cola = primero->next;
	free(primero);
	return elem;
}

Tdata AFNDtoAFD(Tdata automata_afnd) {
	// 1) Extraer los cinco componentes del autómata de entrada
	// Uso las funciones auxiliares obtener_campo con las constantes definidas:
	/* CAMPO_Q (0), CAMPO_SIGMA (1), CAMPO_DELTA (2), CAMPO_Q0 (3), CAMPO_F (4) */
	Tdata alfabeto = obtener_campo(automata_afnd, CAMPO_SIGMA);     // S, conjunto de símbolos
	Tdata delta_afnd = obtener_campo(automata_afnd, CAMPO_DELTA);   // delta, transiciones del AFND
	Tdata estado_inicial_afnd = obtener_campo(automata_afnd, CAMPO_Q0); // q0
	Tdata finales_afnd = obtener_campo(automata_afnd, CAMPO_F);      // F, estados de aceptación
	
	// 2) Estructuras que iré construyendo para el AFD
	Tdata Qd = NULL;          /* Conjunto de estados del AFD... cada "estado" es un subconjunto
	de estados del AFND, representado como un SET (por eso Qd es un SET de SETs)
	Lo inicializo en NULL (conjunto vacío) porque aún no tengo ningún subconjunto. */
	Tdata Deltad = NULL;      /* Conjunto de transiciones del AFD. Cada transición será una lista
	[subconjunto_origen, símbolo, subconjunto_destino]
	también lo empiezo vacío (NULL) */
	Tdata cola = NULL;        /* Cola de subconjuntos pendientes de procesar
	Usaré una lista simple como cola: encolar() añade al final, desencolar() saca del principio. */
	
	// 3) Estado inicial del AFD: el subconjunto que contiene únicamente el estado inicial del AFND
	// Creo un conjunto vacío (NULL) y luego le agrego el estado inicial
	Tdata subconjunto_inicial = NULL;
	append_set(&subconjunto_inicial, estado_inicial_afnd);
	// ahora subconjunto_inicial apunta a un SET que tiene un único elemento: "q0"
	
	// Lo inserto en Qd. insert_set() evita duplicados y clona el elemento
	insert_set(&Qd, subconjunto_inicial);
	
	/* necesito obtener el clon que realmente se guardó en Qd, porque quiero encolar ese mismo puntero
	(así cuando más tarde busque el conjunto en Qd, sea la misma dirección) */
	Tdata clon_inicial = NULL;
	Tdata aux_qd = Qd;
	while (aux_qd != NULL) {
		// equals_set compara dos conjuntos (SETs) elemento a elemento, sin importar el orden
		if (equals_set(aux_qd->data, subconjunto_inicial)) {
			clon_inicial = aux_qd->data;   // apunto al clon que está dentro de Qd
			break;                         // salgo del bucle porque ya lo encontré
		}
		aux_qd = aux_qd->next;
	}
	// ya no necesito el subconjunto_inicial original (fue clonado), así que lo libero
	free_tree(subconjunto_inicial);
	
	// Encolo el clon (el subconjunto que está dentro de Qd) para procesarlo más adelante
	encolar(&cola, clon_inicial);
	
	// 4) bucle principal: mientras haya subconjuntos en la cola, los proceso
	while (cola != NULL) {
		// Saco el primer subconjunto de la cola. Es un SET de estados del AFND
		Tdata subconjunto_actual = desencolar(&cola);
		
		// Recorro cada símbolo del alfabeto Sigma
		Tdata aux_simbolo = alfabeto;
		while (aux_simbolo != NULL) {
			Tdata simbolo = aux_simbolo->data;   // tomo el símbolo como STR
			/* 4a. calcular la unión de destinos pa todos los estados del subconjunto_actual con el símb. actual
			o sea: delta sombrerito(C, a) = Union_{q pertenece a C} delta(q, a) */
			Tdata union_destinos = NULL;   // inicialmente conjunto vacío (aquí tenía un bug de conj. vacio fantasma)
			Tdata aux_estado = subconjunto_actual;
			while (aux_estado != NULL) {
				Tdata q = aux_estado->data;               // tomo un estado q del subconjunto
				Tdata destinos_q = delta_nd(delta_afnd, q, simbolo); // delta(q, a) puede ser NULL (vacío) o un SET
				
				if (destinos_q != NULL) {
					if (union_destinos == NULL) {
						// Si es la primera vez, clono directamente el conjunto de destinos
						union_destinos = clone(destinos_q);
						// antes tenía aquí un free(destinos_q) y me hacía tremendo bug
					} else {
						// Si ya tenía algo, calculo la unión con los nuevos destinos
						Tdata temp = union_set(union_destinos, destinos_q);
						free_tree(union_destinos);   // libero el viejo
						union_destinos = temp;       // actualizo
					}
					free_tree(destinos_q);   // libero el conjunto temporal (ya lo he clonado o unido)
				}
				aux_estado = aux_estado->next;
			}
			/* 4b) Si la unión de destinos no es vacía, entonces tenemos una transición
			desde subconjunto_actual con símbolo hacia union_destinos  */
			
			if (union_destinos != NULL) {
				// verifico si el subconjunto destino (union_destinos) ya está en Qd
				Tdata existente = NULL;
				aux_qd = Qd;
				while (aux_qd != NULL) {
					if (equals_set(aux_qd->data, union_destinos)) {
						existente = aux_qd->data;   // sí, ya existe
						break;                      // salgo del bucle con el braek
					}
					aux_qd = aux_qd->next;
				}
				
				if (existente == NULL) {
					// no existe: es un nuevo subconjunto, lo agrego a Qd y a la cola
					insert_set(&Qd, union_destinos);          // inserta una copia (clon)
					// Busco el clon que acabo de insertar (para tener la misma dirección)
					aux_qd = Qd;
					while (aux_qd != NULL) {
						if (equals_set(aux_qd->data, union_destinos)) {
							existente = aux_qd->data;
							break;
						}
						aux_qd = aux_qd->next;
					}
					encolar(&cola, existente);   // lo encolo para procesar sus transiciones después
					/* IMPORTANTE: NO libero union_destinos aquí porque todavía lo voy a usar
					para construir la transición...lo liberaré después de usarlo */
				} else {
					// Ya existe entonces  libero union_destinos (porque no lo necesito) y uso el existente
					free_tree(union_destinos);
					union_destinos = existente;   // ahora union_destinos apunta al conjunto que ya está en Qd
				}
				
				// 4c. Construir la transición y agregarla a Deltad
				// cada transición es una lista de tres elementos: [origen, símbolo, destino]
				Tdata transicion = NULL;
				append_list(&transicion, subconjunto_actual);   // el origen es el subconjunto actual
				append_list(&transicion, simbolo);              // el símbolo (STR)
				append_list(&transicion, union_destinos);       // el destino (SET)
				// insert_set evita duplicados (por si por casualidad ya estaba la misma transición)
				insert_set(&Deltad, transicion);
				free_tree(transicion);   // libero la lista temporal (insert_set hizo una copia)...
				
				// 4d) Liberación final de union_destinos si fue creado como nuevo (no existente)
				
				/* Si entré por la rama "existente == NULL", union_destinos sigue apuntando al conjunto original
				que creamos (que no es el mismo que el clon guardado en Qd). Ese original ya no lo necesito,
				porque la transición ya usó union_destinos (append_list lo clonó). Por tanto, lo libero */
				if (union_destinos != existente) {
					free_tree(union_destinos);
				}
			}
			// Si union_destinos era NULL (conjunto vacío), no se crea ninguna transición
			aux_simbolo = aux_simbolo->next;
		}
		// No libero subconjunto_actual porque todavía pertenece a Qd. Qd es el dueño de todos los subconjuntos
	}
	
	// 5) Determinar los estados finales del AFD (Fd)
	// weno un subconjunto de estados del AFND será final en el AFD si contiene al menos un estado final del AFND
	Tdata finales_afd = NULL;   // conjunto vacío
	aux_qd = Qd;
	while (aux_qd != NULL) {
		Tdata subconjunto = aux_qd->data;
		// Calculo la intersección entre el subconjunto y el conjunto de estados finales del AFND
		Tdata inter = intersection_set(subconjunto, finales_afnd);
		// Si la intersección no es vacía...entonces el subconjunto es final
		if (!is_empty_set(inter)) {
			insert_set(&finales_afd, subconjunto);
		}
		free_tree(inter);   // libero el resultado de la intersección (ya no lo necesito)
		aux_qd = aux_qd->next;
	}
	
	// 6. Construir el autómata AFD resultante (lista de 5 componentes)
	
	Tdata afd_resultado = NULL;   // inicio la lista vacía (NULL)
	append_list(&afd_resultado, Qd);               //  Qd: conjunto de subconjuntos
	append_list(&afd_resultado, clone(alfabeto));  //  Sigma: clono el alfabeto (es el mismo)
	append_list(&afd_resultado, Deltad);           //  Delta: transiciones del AFD
	Tdata q0_afd = NULL;
	append_set(&q0_afd, estado_inicial_afnd);      //  q0: subconjunto unitario {estado_inicial_afnd}
	append_list(&afd_resultado, q0_afd);
	append_list(&afd_resultado, finales_afd);      //  Fd: estados finales del AFD
	
	free_tree(q0_afd);
	free_tree(finales_afd);
	while (cola != NULL) {
		Tdata nodo = cola;
		cola = cola->next;
		free(nodo);   // cada nodo de la cola es solo un wrapper nomás (tipo LIST), no contiene datos que no estén ya en Qd
	}
	
	return afd_resultado;
}
void print_automata(Tdata aut){
	if(aut == NULL){
		printf("automata vacio.");
		return;
	}
	Tdata Q     = obtener_campo(aut, CAMPO_Q);
	Tdata Sigma = obtener_campo(aut, CAMPO_SIGMA);
	Tdata Delta = obtener_campo(aut, CAMPO_DELTA);
	Tdata q0    = obtener_campo(aut, CAMPO_Q0);
	Tdata F     = obtener_campo(aut, CAMPO_F);
	
	printf("Automata:\n");
	printf(" Q     = "); print_Tree(Q); printf("\n");
	printf(" Sigma = "); print_Tree(Sigma); printf("\n");
	printf(" Delta = "); print_Tree(Delta); printf("\n");
	printf(" q0    = "); print_Tree(q0); printf("\n");
	printf(" F     = "); print_Tree(F); printf("\n");
}
Tdata ingresar_automata(char *ingresoAut){
	if(ingresoAut == NULL || ingresoAut[0] == '\0'){
		printf("Ingreso vacio.\n");
		free(ingresoAut);
		return NULL;
	}
	char *sin_espacios = (char *)malloc(strlen(ingresoAut) + 1);
	int j = 0;
	for (int i = 0; ingresoAut[i] != '\0'; i++) {
		if (ingresoAut[i] != ' ' && ingresoAut[i] != '\t')
			sin_espacios[j++] = ingresoAut[i];
	}
	sin_espacios[j] = '\0';
	free(ingresoAut);
	Tdata aut = createDT(sin_espacios);
	free(sin_espacios);
	return aut;
}
Tdata automata_precargado1(void){ //cantidad par de a
	char *cadena = "[{q0,q1},{a,b},"
		"{[q0,a,{q1}],[q0,b,{q0}],[q1,a,{q0}],[q1,b,{q1}]},"
		"q0,{q0}]";
	char *cad = adaptar_cadena_precargada(cadena);
	return createDT(cad);
}
Tdata automata_precargado2(void){ //termina en 'ab'
	char *cadena = "[{q0,q1,q2},{a,b},"
		"{[q0,a,{q0,q1}],[q0,b,{q0}],[q1,b,{q2}]},"
		"q0,{q2}]";
	char *cad = adaptar_cadena_precargada(cadena);
	return createDT(cad);
}
Tdata automata_precargado3(void){ //contiene '01'
	char *cadena ="[{q0,q1,q2},{0,1},"
		"{[q0,0,{q1}],[q0,1,{q0}],[q1,0,{q1}],[q1,1,{q2}],[q2,0,{q2}],[q2,1,{q2}]},"
		"q0,{q2}]";
	char *cad = adaptar_cadena_precargada(cadena);
	return createDT(cad);
}
int analiza_afd(Tdata afd, char *cadena) {
	Tdata Sigma  = obtener_campo(afd, CAMPO_SIGMA);
	Tdata Delta  = obtener_campo(afd, CAMPO_DELTA);
	Tdata q0     = obtener_campo(afd, CAMPO_Q0);
	Tdata F      = obtener_campo(afd, CAMPO_F);
	
	Tdata estado_actual = clone(q0);
	
	int i = 0;
	while (cadena[i] != '\0') {
		// Construir STR con el caracter actual para comparar
		char simbolo_str[2] = { cadena[i], '\0' };
		Tdata sym_nodo = create_str_ast();
		sym_nodo->string = load2(simbolo_str);
		
		// Verifico que el simbolo este en Sigma
		int b = 0; //bandera
		Tdata aux = Sigma;
		while (aux != NULL) {
			if (equals_tdata(aux->data, sym_nodo)) { b = 1; break; } /* Comparo aux->data con sym_nodo.
			Si son iguales, pone la bandera en 1*/
			aux = aux->next; // si no eran iguales, avanzo al siguiente nodo
		}
		if (!b) { /*Si b sigue siendo 0 entonces significa que no encontre el símbolo. 
			Entonces libero la memoria*/
			free_tree(sym_nodo);
			free_tree(estado_actual);
			return -1;
		}
		
		// Busco transiciones en Delta
		Tdata destino = NULL;
		Tdata aux_d = Delta;
		while (aux_d != NULL) {
			Tdata trans  = aux_d->data;
			Tdata origen = trans->data;
			Tdata sym_t  = trans->next->data;
			Tdata dest   = trans->next->next->data;
			
			if (equals_tdata(origen, estado_actual) && equals_tdata(sym_t, sym_nodo)) {
				destino = clone(dest);
				break;
			}
			aux_d = aux_d->next;
		}
		free_tree(sym_nodo);
		free_tree(estado_actual);
		if (destino == NULL) return 0;  // Sin transicion = rechazado
		estado_actual = destino;
		i++;
	}
	// Verifico si estado_actual pertenece a F
	int acepta = 0;
	Tdata aux_f = F;
	while (aux_f != NULL) {
		Tdata elem_f = aux_f->data;          // puede ser SET (AFD original) o SET de SET (convertido)
		// Si estado_actual es STR (AFD original) y elem_f es SET unitario, extraemos el STR interior
		if (estado_actual->nodeType == STR && elem_f->nodeType == SET && elem_f->data != NULL) {
			elem_f = elem_f->data;           // tomamos el único elemento (STR)
		}
		if (equals_tdata(elem_f, estado_actual)) {
			acepta = 1;
			break;
		}
		aux_f = aux_f->next;
	}

	free_tree(estado_actual);
	return acepta;
}
void procesar_cadena(Tdata afd, char *cadena) {
	int resp = analiza_afd(afd, cadena);
	if      (resp ==  1) printf("  \"%s\" -> CADENA ACEPTADA\n",  cadena);
	else if (resp ==  0) printf("  \"%s\" -> CADENA RECHAZADA\n", cadena);
	else    printf("  \"%s\" -> ERROR: simbolo no perteneciente al alfabeto\n", cadena);
}
int es_afnd(Tdata automata) {
	Tdata delta = obtener_campo(automata, CAMPO_DELTA);
	if (delta == NULL)
		return 0;   // Sin transiciones ? consideramos AFD (vacío)
	
	Tdata primera_transicion = delta->data;  // primer elemento del conjunto Delta
	if (primera_transicion == NULL)
		return 0;
	
	// La transición es una lista de 3 elementos: [origen, símbolo, destino]
	Tdata destino = primera_transicion->next->next->data;  // tercer elemento
	if (destino == NULL)
		return 0;
	
	// Si el destino es un SET ? AFND; si es STR ? AFD
	if(destino->nodeType == SET)
		return 1;
	return 0;
}
static Tdata set_to_str_set(Tdata set_original) {
	if (set_original == NULL) return NULL;
	Tdata result = NULL;
	Tdata aux = set_original;
	while (aux != NULL) {
		char *str_rep = conversion_str(aux->data);
		Tdata str_node = create_str_ast();
		str_node->string = str_rep;   // conversion_str reservó memoria
		insert_set(&result, str_node);
		free_tree(str_node);           // insert_set clonó, liberamos temporal
		free(str_rep);                 // liberamos la cadena original
		aux = aux->next;
	}
	return result;
}
Tdata aplanar_automata_afd(Tdata afd) {
	// Extraer componentes
	Tdata Q_orig = obtener_campo(afd, CAMPO_Q);
	Tdata Sigma_orig = obtener_campo(afd, CAMPO_SIGMA);
	Tdata Delta_orig = obtener_campo(afd, CAMPO_DELTA);
	Tdata q0_orig = obtener_campo(afd, CAMPO_Q0);
	Tdata F_orig = obtener_campo(afd, CAMPO_F);
	
	// Nuevo Q
	Tdata Q_new = set_to_str_set(Q_orig);
	
	// Nuevo Sigma (igual)
	Tdata Sigma_new = clone(Sigma_orig);
	
	// Nuevo Delta
	Tdata Delta_new = NULL;
	Tdata aux_d = Delta_orig;
	while (aux_d != NULL) {
		Tdata trans = aux_d->data;               // [origen, simbolo, destino]
		Tdata origen_set = trans->data;
		Tdata simbolo = trans->next->data;       // ya es STR
		Tdata destino_set = trans->next->next->data;
		
		// Convertir a cadenas
		char *origen_str = conversion_str(origen_set);
		char *destino_str = conversion_str(destino_set);
		
		// Crear nodos STR para origen y destino
		Tdata origen_node = create_str_ast();
		origen_node->string = origen_str;
		Tdata destino_node = create_str_ast();
		destino_node->string = destino_str;
		
		// Construir la nueva transición
		Tdata nueva_trans = NULL;
		append_list(&nueva_trans, origen_node);
		append_list(&nueva_trans, simbolo);
		append_list(&nueva_trans, destino_node);
		
		insert_set(&Delta_new, nueva_trans);
		
		// Liberar temporales
		free_tree(origen_node);
		free_tree(destino_node);
		free_tree(nueva_trans);   // insert_set clonó
		free(origen_str);
		free(destino_str);
		
		aux_d = aux_d->next;
	}
	
	// Nuevo q0
	char *q0_str = conversion_str(q0_orig);
	Tdata q0_new = create_str_ast();
	q0_new->string = q0_str;
	
	// Nuevo F
	Tdata F_new = set_to_str_set(F_orig);
	
	// Construir el autómata aplanado
	Tdata nuevo_afd = NULL;
	append_list(&nuevo_afd, Q_new);
	append_list(&nuevo_afd, Sigma_new);
	append_list(&nuevo_afd, Delta_new);
	append_list(&nuevo_afd, q0_new);
	append_list(&nuevo_afd, F_new);
	
	// Liberar nodo temporal q0_new (append_list clonó)
	free_tree(q0_new);
	
	return nuevo_afd;
}
void renombrar_estados(Tdata automata) {
	Tdata Q     = obtener_campo(automata, CAMPO_Q);
	Tdata Delta = obtener_campo(automata, CAMPO_DELTA);
	Tdata q0    = obtener_campo(automata, CAMPO_Q0);
	Tdata F     = obtener_campo(automata, CAMPO_F);
	
	// Construir la lista de correspondencias (diccionario)
	Lista dict = NULL;
	int idx = 0;
	Tdata aux_q = Q;
	while (aux_q != NULL) {
		Tdata estado_node = aux_q->data;   // nodo STR
		char *clave_orig = estado_node->string;
		char nuevo_nombre[10];
		sprintf(nuevo_nombre, "r%d", idx);
		insertar_par(&dict, clave_orig, nuevo_nombre);
		idx++;
		aux_q = aux_q->next;
	}
	
	// Renombrar estados en Q
	aux_q = Q;
	idx = 0;
	while (aux_q != NULL) {
		Tdata estado_node = aux_q->data;
		char *nuevo_val = buscar_clave(dict, estado_node->string);
		if (nuevo_val) {
			free(estado_node->string);
			estado_node->string = load2(nuevo_val);
		}
		aux_q = aux_q->next;
	}
	
	// Renombrar estado inicial q0
	char *nuevo_q0 = buscar_clave(dict, q0->string);
	if (nuevo_q0) {
		free(q0->string);
		q0->string = load2(nuevo_q0);
	}
	
	// Renombrar estados finales F
	Tdata aux_f = F;
	while (aux_f != NULL) {
		Tdata f_node = aux_f->data;
		char *nuevo_f = buscar_clave(dict, f_node->string);
		if (nuevo_f) {
			free(f_node->string);
			f_node->string = load2(nuevo_f);
		}
		aux_f = aux_f->next;
	}
	
	// Renombrar origen y destino en Delta
	Tdata aux_delta = Delta;
	while (aux_delta != NULL) {
		Tdata trans = aux_delta->data;
		Tdata origen_node = trans->data;
		Tdata destino_node = trans->next->next->data;
		
		char *nuevo_origen = buscar_clave(dict, origen_node->string);
		if (nuevo_origen) {
			free(origen_node->string);
			origen_node->string = load2(nuevo_origen);
		}
		
		char *nuevo_destino = buscar_clave(dict, destino_node->string);
		if (nuevo_destino) {
			free(destino_node->string);
			destino_node->string = load2(nuevo_destino);
		}
		
		aux_delta = aux_delta->next;
	}
	
	liberar_lista(&dict);
}
char* adaptar_cadena_precargada(const char* original) {
	char* copia = malloc(strlen(original) + 1);
	if (!copia)
		return NULL;
	strcpy(copia, original);
	
	for (int i = 0; copia[i]; i++) {
		if (copia[i] == '{')
			copia[i] = openSET;
		else if (copia[i] == '}')
			copia[i] = closeSET;
		else if (copia[i] == '[')
			copia[i] = openLIST;
		else if (copia[i] == ']')
			copia[i] = closeLIST;
		else if (copia[i] == ',')
			copia[i] = separador;
	}
	return copia;
}
