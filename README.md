# TDC01-2026
**Teoría de la Computación — Grupo 12**  
Gabriel Gonzales y Natalia Ochoa
---
Ochoa: Aceptador de cadenas, TAD autómata, tests, menues
---
Gonzales: Estructura básica, TAD tree, tests, convertidor AFND a AFD
---
En la tabla se muestra la compatibilidad de las propuestas con código anterior que teníamos, en especial de los TPs de lista enlazada. La propuesta 4 modificada
fue nuestra elección porque también seguimos una guía de pseudocódigo de años anteriores.
---
Resumen del resto de propuestas: <a href="https://gabrielgonzalesgh.github.io/TDC01-2026/" target="_blank">🔗 Ver análisis de propuestas</a>
---

## Parte 1

| Archivo | Rol |
|---|---|
| `Leaf.h` | Nuestro `String.h` — maneja las hojas |
| `Cluster.h` | Operaciones de lista y conjuntos (racimos) |
| `Tree.h` | Manipula y prepara el árbol, la estructura de contenedores |

---

PARTE 2:


## Comparación de propuestas de modelado de autómatas

| Criterio | Propuesta 1 (Lista de Transiciones) | Propuesta 2 (Indexado por Estado) | Propuesta 3 (Matriz Dispersa) | Propuesta 5 (Estados Compuestos) | **Propuesta 4 modificada (nuestra)** |
|----------|--------------------------------------|------------------------------------|-------------------------------|----------------------------------|----------------------------------------|
| **Representación de Δ** | Lista enlazada manual (TransitionNode) | Por estado: lista de transiciones en cada nodo | Arreglo de TransitionEntry (from, symbol, to) | Estados compuestos (subconjuntos) | `Tdata` tipo SET de listas `[from, symbol, to]` |
| **Uso de TADs `Tdata`** | Solo para Q, Sigma, F y `to` | Solo para `to` | Solo para Q, Sigma, F y `to` | Solo para subconjuntos | **Para todo** (Q, Sigma, Delta, q0, F) |
| **Gestión de memoria** | Manual (malloc/free de nodos) | Manual (malloc/free de estados y transiciones) | Manual (realloc de arreglo) | Manual | Automática con `free_tree` y `clone` |
| **Búsqueda de delta(q,a)** | Recorrido lineal O(n) | Recorrido lineal de las transiciones del estado | O(1) si matriz densa, O(n) dispersa | Similar a lista | Recorrido lineal O(n) sobre Delta |
| **Clonado de autómata** | Función específica | Función específica | Copia de arreglo | Función específica | `clone` recursivo único |
| **Determinización (AFND->AFD)** | Implementación manual | Manual, pero más directa | Requiere mapeo a enteros | Es la base (útil para el resultado) | Usa `union_set`, `intersection_set`, etc. |
| **Código nuevo requerido** | Mucho | Mucho | Moderado | Mucho | Mínimo (solo `delta_nd`, cola, `AFNDtoAFD`) |
| **Compatibilidad con proyecto anterior** | Baja | Baja | Media | Baja | Alta |
| **Riesgo de errores de memoria** | Alto | Alto | Medio | Alto | Bajo |
| **Legibilidad** | Baja | Media | Media | Baja | Alta |

### Conclusión

Elegimos la **Propuesta 4 modificada** porque:
- **Reutiliza completamente los TADs** ya implementados (`SET`, `LIST`, `STR`), evitando reinventar estructuras.
- **Minimiza el código nuevo** y aprovecha las funciones ya depuradas (`clone`, `free_tree`, `equals_tdata`, `union_set`, etc.).
- **Facilita la determinización** al trabajar directamente con conjuntos y operaciones de conjunto.
- **Es más legible y mantenible** (todo el autómata es un único `Tdata` y sus componentes se extraen con `obtener_campo`).
- **Se integra perfectamente** con el proyecto anterior (Cluster, Tree, Leaf) y su sistema de gestión de memoria.

Las otras propuestas, aunque válidas en otros contextos, requerirían **mucho más esfuerzo de implementación**, **duplicarían funcionalidades** de los TADs y **aumentarían la probabilidad de errores** de punteros.


---

