#ifndef TREE_H
#define TREE_H

#include "Leaf.h"
#include "config.h"

#define STR 1
#define SET 2
#define LIST 3

struct dataType {
	int nodeType;
	union {
		str string;
		struct {
			struct dataType *data;
			struct dataType *next;
		};
	};
};

typedef struct dataType *Tdata;

void	crear_tree(str);
Tdata	create_str_ast();
Tdata	create_node(int);
int		length(Tdata);
void	print_Tree(Tdata);
void	append_branch(Tdata *, Tdata, int);
void	free_tree(Tdata);
int		is_empty_container(Tdata) ;
int		is_empty_set(Tdata);

#endif
