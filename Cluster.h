#ifndef CLUSTER_H
#define CLUSTER_H

#include "Tree.h"

Tdata	ini_set(void);
Tdata 	ini_list(void);

Tdata	create_list(void);
Tdata	create_list(void);
Tdata	createDT(char *);

Tdata	copy_list(Tdata);
Tdata	clone(Tdata);

Tdata	concat(Tdata, Tdata);
Tdata	union_set(Tdata, Tdata);
Tdata	intersection_set(Tdata, Tdata);
Tdata	difference_set(Tdata, Tdata);
Tdata	prod_cartesiano(Tdata, Tdata);

int		search(Tdata, Tdata);
int		belongs(Tdata, Tdata);
int		equals_set(Tdata, Tdata);
int		subset(Tdata, Tdata);
char	*conversion_str(Tdata);

void	append_list(Tdata *, Tdata);
void	append_set(Tdata *, Tdata);
void	insert_set(Tdata *, Tdata);
void	remove_set(Tdata *, Tdata);

void	printList(Tdata);
void	printSet(Tdata);

#endif
