/**

Toda la manipulación debe realizarse utilizando Tdata
Las estructuras deben ser dinámicas (uso de memoria heap)
Se debe implementar copia profunda (deep copy) en todas las operaciones necesarias
No se deben implementar aún autómatas finitos

1 . Implementar funciones de creación

create_str_ast()
create_list()
create_set()

2 . Operaciones sobre STR

Utilizando String.h.

Comparación de strings
Concatenación

3 Operaciones sobre LIST

append(Tdata* list, Tdata elem)
length(Tdata list)
copy_list(Tdata list) (copia profunda)
concat(Tdata l1, Tdata l2)
search(Tdata list, Tdata elem)

4 Operaciones sobre SET

insert_set(Tdata* set, Tdata elem) (sin duplicados)
belongs(Tdata set, Tdata elem)
remove_set(Tdata* set, Tdata elem)

#Operaciones algebraicas
union_set(Tdata A, Tdata B)
intersection_set(Tdata A, Tdata B)
difference_set(Tdata A, Tdata B)
subset(Tdata A, Tdata B)
	

Casos de prueba

El programa debe incluir pruebas que verifiquen:

Unión de conjuntos
Intersección
Producto cartesiano
Conversión STR ? LIST ? STR
Conjuntos vacíos
Elementos duplicados
Listas anidadas
Copias vs referencias

**/

/**
{uno, dos, alfil} U {alfil, reina}    ___   {uno, {dos, tres}, cuatro} U {sol, luna}
{} U {}  ___  {} U {dos}  ___   {tres} U {}
{uno, [dos, tres], cuatro} U {sol} ____   {uno, [dos, tres], cuatro} U {}
{uno, {dos}, cuatro} U {sol, luna}  ___  {uno, {}, cuatro} U {sol, luna}

BUG:
Ingrese el conjunto A: {{}, {}}
Conjunto A: { Ø, Ø }
Ingrese el conjunto B: {{}, {{}}}
Conjunto B: { Ø, { Ø } }
Union A U B: { Ø, Ø, Ø, { Ø } }

**/
/** Grupo 12 , integrantes: Gabriel Gonzales y Natalia Ochoa **/
#include <stdio.h>
#include "Cluster.h"

int menu(void);
void limpiar_buffer(void);

int main (void)
{
	Tdata root_A = ini_set();
	Tdata root_B = ini_set();
	Tdata root_C = ini_set();
	int rta,num,op;
	str ingreso = NULL;
	str convertido = NULL;

	do{
		rta=menu();
		switch(rta) {
		case 1:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			printf("\nIngrese el conjunto B: ");
			ingreso = leeCad();
			root_B = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto B: ");
			print_Tree(root_B);
			
			root_C = union_set(root_A, root_B);
			printf("\n\nUnion A U B: ");
			print_Tree(root_C);
			printf("\n");
			
			free_tree(root_A);
			free_tree(root_B);
			free_tree(root_C);
			root_A = root_B = root_C = NULL;
		break;
		case 2:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			printf("\nIngrese el conjunto B: ");
			ingreso = leeCad();
			root_B = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto B: ");
			print_Tree(root_B);
			
			root_C = intersection_set(root_A, root_B);
			printf("\n\nInterseccion A  B: ");
			print_Tree(root_C);
			printf("\n");
			
			free_tree(root_A);
			free_tree(root_B);
			free_tree(root_C);
			root_A = root_B = root_C = NULL;
		break;
		case 3:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			printf("\nIngrese el conjunto B: ");
			ingreso = leeCad();
			root_B = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto B: ");
			print_Tree(root_B);
			
			root_C = prod_cartesiano(root_A, root_B);
			printf("\n\nInterseccion A  B: ");
			print_Tree(root_C);
			printf("\n");
			
			free_tree(root_A);
			free_tree(root_B);
			free_tree(root_C);
			root_A = root_B = root_C = NULL;
		break;
		case 4:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			convertido = conversion_str(root_A);
			printf("\n\nCadena: %s", convertido);
			free(convertido);
			convertido = NULL;
			printf("\n");
			
			free_tree(root_A);
			free_tree(root_B);
			free_tree(root_C);
			root_A = root_B = root_C = NULL;
		break;
		case 5:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			printf("\nIngrese el conjunto B: ");
			ingreso = leeCad();
			root_B = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto B: ");
			print_Tree(root_B);
			
			num= subset(root_A, root_B);
			if(num==1)
				printf("\n\nA esta incluida en B.");
			else
				printf("\n\nA NO esta incluida en B.");
			printf("\n");
			
			free_tree(root_A);
			free_tree(root_B);
			root_A = root_B = NULL;
		break;
		case 6:
			printf("\nIngrese el conjunto A: ");
			ingreso = leeCad();
			root_A = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto A: ");
			print_Tree(root_A);
			
			printf("\nIngrese el conjunto B: ");
			ingreso = leeCad();
			root_B = createDT(ingreso);
			free(ingreso);
			ingreso = NULL;
			printf("\nConjunto B: ");
			print_Tree(root_B);
			
			printf("\nIngrese 1 para restar A con B: ");
			printf("\nIngrese 0 para restar B con A: ");
			scanf("%d",&op);
			switch(op){
			case 1: 
				root_C = difference_set(root_A, root_B);
				printf("\n\nDiferencia de A con B: ");
				print_Tree(root_C);
				printf("\n");
			break;
			case 0:
				root_C = difference_set(root_B, root_A);
				printf("\n\nDiferencia de B con A: ");
				print_Tree(root_C);
				printf("\n");
			break;
			}
			
			free_tree(root_A);
			free_tree(root_B);
			free_tree(root_C);
			root_A = root_B = root_C = NULL;
		break;
		case 0:
			printf("\nPrograma terminado...\n");
		}
		//if (rta!=0) system("pause");
	} while(rta!=0);
	
	free_tree(root_A);
	free_tree(root_B);
	free_tree(root_C);
	free(ingreso);
	root_A = root_B = root_C = NULL;
	
	return 0;
}

int menu(void) {
	int op = 0;
	printf("\n");
	printf("\n  1- Uni%cn de conjuntos.", 160);
	printf("\n  2- Intersecci%cn de conjuntos.", 160);
	printf("\n  3- Producto cartesiano.");
	printf("\n  4- Conversi%cn de lista a string.", 161);
	printf("\n  5- Verificar si un conjunto est%c incluido en otro.", 164);
	printf("\n  6- Restar un conjunto a otro.");
	printf("\n 0- SALIR");
	printf("\n  >> ");
	scanf("%d", &op);
	while(!(0 <= op && op <= 6)) {
		printf("\n  Opci%cn inv%clida, reingrese:  ", 162, 160);
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
/**
int n;
printf("\nCuantos elementos para A? ");
scanf("%d", &n);
limpiar_buffer();

for (int i = 0; i < n; i++) {
printf("elemento %d: ", i + 1);
str ingreso = leeCad();
Tdata s = create_str_ast();
s->string = load2(ingreso);
append_set(&A, s);
free(ingreso);
free_tree(s);
}
printf("\n tamanho branch A: %d", length(A));

printf("\nCuantos elementos para B? ");
scanf("%d", &n);
limpiar_buffer();

for (int i = 0; i < n; i++) {
printf("elemento %d: ", i + 1);
str ingreso = leeCad();
Tdata s = create_str_ast();
s->string = load2(ingreso);
append_set(&B, s);
free(ingreso);
free_tree(s);
}

printf("\n mostrando A: ");
printSet(A);
printf("\n mostrando B: ");
printSet(B);
printf("\n result %d ", equals_set(A, B));

C = concat(A, B);
printf("\n lista C: ");
print_Tree(C);
printf("\n Cantidad de elementos en A: %d", length(A));

printf("\n ingresar a busc: ");
str ingreso = leeCad();
Tdata s1 = create_str_ast();
s1->string = load2(ingreso);
remove_set(&A, s1);**/
