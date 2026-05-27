#ifndef LEAF_H
#define LEAF_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef char *str;

int		compara_str(str, str);
int		tam_str(str);
str		str_crear(const char *);
str		concat_str(str, str);
str		load2(const char *);
char	*leeCad(void);

int		dev_tam_elem(char *);
char	*saca_extremos(char *);
char	*dev_elem(char *);
void	poda_elem_ini(char *, char *);
void	print_string(str);
void	free_str(str);

#endif
