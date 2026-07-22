// ============================================================
// DATOS DE TEOREMAS (Hopcroft 3ra Edición)
// ============================================================
// Estructura:
//   id            : identificador único
//   texto         : enunciado (acepta HTML)
//   pista         : pista corta (se muestra con botón)
//   clasificacion : "A", "B" o "C"
//   demostracion  : (OPCIONAL) texto completo de la demostración (acepta HTML)
// ============================================================

const teoremas = [
    // ========== TEOREMA 1.21 ==========
    {
        id: "1.21",
        texto: "El número de nodos de un árbol es superior al de arcos en una unidad.",
        pista: "Inducción estructural sobre la definición de árbol. Base: un solo nodo.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> La proposición formal S(T) que tenemos que demostrar por inducción estructural es: <em>“si T es un árbol y T tiene n nodos y e arcos, entonces n = e+1”</em>.</p>
            
            <p><strong>BASE.</strong> El caso base es en el que T tiene un único nodo. Así, n = 1 y e = 0, por lo que la relación n = e+1 se cumple.</p>
            
            <p><strong>PASO INDUCTIVO.</strong> Sea T un árbol construido a partir del paso inductivo de la definición, a partir de N nodos y k árboles más pequeños T₁, T₂, ..., Tₖ. Podemos suponer que las proposiciones S(Tᵢ) se cumplen para i = 1, 2, ..., k. Es decir, Tᵢ tiene nᵢ nodos y eᵢ arcos; luego nᵢ = eᵢ + 1.</p>
            
            <p>T tiene N nodos y son todos los nodos de los Tᵢ árboles. Por tanto, T tiene 1 + n₁ + n₂ + ... + nₖ nodos. Los arcos de T son los k arcos añadidos explícitamente en el paso de la definición inductiva más los arcos de los Tᵢ. Por tanto, T tiene:</p>
            
            <pre>k + e₁ + e₂ + ... + eₖ    (1.10)</pre>
            
            <p>arcos. Si sustituimos nᵢ por eᵢ + 1 en la cuenta del número de nodos de T, vemos que T tiene:</p>
            
            <pre>1 + [e₁ + 1] + [e₂ + 1] + ... + [eₖ + 1]    (1.11)</pre>
            
            <p>nodos. Luego como tenemos k términos “+1” en (1.10), podemos reagrupar la Ecuación (1.11) de la forma siguiente:</p>
            
            <pre>k + 1 + e₁ + e₂ + ... + eₖ    (1.12)</pre>
            
            <p>Esta expresión es exactamente más grande en una unidad que la expresión (1.10), la cual proporciona el número de arcos de T. Por tanto, el número de nodos de T es superior en una unidad al número de arcos. ✷</p>
        `
    },

    // ========== TEOREMA 1.22 ==========
    {
        id: "1.22",
        texto: "Todas las expresiones regulares (y todas las expresiones en general) tienen el mismo número de paréntesis de apertura <code>(</code> que de cierre <code>)</code>.",
        pista: "Piensa en el balanceo de paréntesis y cómo se define la sintaxis. Se demuestra por inducción en la longitud de la expresión.",
        clasificacion: "C",
        demostracion: `
            <p><strong>Demostración.</strong> Formalmente, la proposición S(G) se demuestra sobre cualquier expresión G que esté definida mediante el proceso recursivo del Ejemplo 1.20: el número de paréntesis de apertura y de cierre de G es el mismo.</p>
            
            <p><strong>BASE.</strong> Si G se define a partir de la base, entonces G es un número o una variable. Estas expresiones tienen cero paréntesis de apertura y cero paréntesis de cierre, luego tienen los mismos paréntesis de apertura que de cierre.</p>
            
            <p><strong>PASO INDUCTIVO.</strong> Hay tres reglas mediante las que se puede construir la expresión G de acuerdo con el paso de inducción de la definición:</p>
            <ol>
                <li><code>G ⇒ E + F</code></li>
                <li><code>G ⇒ E * F</code></li>
                <li><code>G ⇒ (E)</code></li>
            </ol>
            <p>Podemos suponer que S(E) y S(F) son verdaderas; es decir, E tiene el mismo número de paréntesis de apertura que de cierre, por ejemplo, n de cada clase, e igualmente F tiene el mismo número de paréntesis de apertura que de cierre, por ejemplo, m de cada clase. Entonces podemos calcular el número de paréntesis abiertos y cerrados de G para cada uno de los tres casos siguientes:</p>
            <ol>
                <li>Si G = E + F, entonces G tiene n+m paréntesis de apertura y n+m paréntesis de cierre; n de cada tipo procedentes de E y m de cada tipo procedentes de F.</li>
                <li>Si G = E * F, la cantidad de paréntesis de G es de nuevo n+m de cada tipo por la misma razón que en el caso (1).</li>
                <li>Si G = (E), entonces habrá n+1 paréntesis de apertura en G (uno de los cuales aparece explícitamente y los otros n proceden de E). Del mismo modo, hay n+1 paréntesis de cierre en G; uno explícito y los otros n procedentes de E.</li>
            </ol>
            <p>En cada uno de los tres casos, vemos que el número de paréntesis de apertura y de cierre de G es el mismo. Esta observación completa el paso de inducción y la demostración. ✷</p>
        `
    },

    // ========== TEOREMA 2.11 ==========
    {
        id: "2.11",
        texto: "Si D = (Q<sub>D</sub>, Σ, δ<sub>D</sub>, {q<sub>0</sub>}, F<sub>D</sub>) es el AFD construido a partir del AFN N = (Q<sub>N</sub>, Σ, δ<sub>N</sub>, q<sub>0</sub>, F<sub>N</sub>) mediante la construcción de subconjuntos, entonces L(D) = L(N).",
        pista: "Demostración por inducción sobre |w|, probando que δ<sub>D</sub>({q<sub>0</sub>}, w) = δ<sub>N</sub>(q<sub>0</sub>, w).",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Lo que demostraremos en primer lugar, por inducción sobre <code>|w|</code>, es que</p>
            <pre>δ<sub>D</sub>({q<sub>0</sub>}, w) = δ<sub>N</sub>(q<sub>0</sub>, w)</pre>
            <p>Observe que cada una de las funciones δ devuelve un conjunto de estados de Q<sub>N</sub>, pero δ<sub>D</sub> interpreta este conjunto como uno de los estados de Q<sub>D</sub> (que es el conjunto potencia de Q<sub>N</sub>), mientras que δ<sub>N</sub> interpreta este conjunto como un subconjunto de Q<sub>N</sub>.</p>
            
            <p><strong>BASE.</strong> Sea <code>|w| = 0</code>; es decir, <code>w = ε</code>. Basándonos en las definiciones de partida de δ para el AFD y el AFN, tanto δ<sub>D</sub>({q<sub>0</sub>}, ε) como δ<sub>N</sub>(q<sub>0</sub>, ε) son iguales a <code>{q<sub>0</sub>}</code>.</p>
            
            <p><strong>PASO INDUCTIVO.</strong> Sea <code>n+1</code> la longitud de w y supongamos que el enunciado del teorema para la longitud <code>n</code> es verdadero. Descomponemos w de forma que <code>w = xa</code>, donde <code>a</code> es el símbolo final de w. Por inducción, δ<sub>D</sub>({q<sub>0</sub>}, x) = δ<sub>N</sub>(q<sub>0</sub>, x). Sean <code>{p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}</code> dos conjuntos de estados de N. La parte inductiva de la definición de δ para los AFN nos dice que,</p>
            
            <pre>δ<sub>N</sub>(q<sub>0</sub>, w) = ⋃<sub>i=1</sub><sup>k</sup> δ<sub>N</sub>(p<sub>i</sub>, a)    (2.2)</pre>
            
            <p>Por otro lado, la construcción de subconjuntos nos dice que</p>
            
            <pre>δ<sub>D</sub>({p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}, a) = ⋃<sub>i=1</sub><sup>k</sup> δ<sub>N</sub>(p<sub>i</sub>, a)    (2.3)</pre>
            
            <p>Ahora utilizamos (2.3) y el hecho de que δ<sub>D</sub>({q<sub>0</sub>}, x) = {p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>} en la parte inductiva de la definición de δ para los AFD:</p>
            
            <pre>δ<sub>D</sub>({q<sub>0</sub>}, w) = δ<sub>D</sub>(δ<sub>D</sub>({q<sub>0</sub>}, x), a) = δ<sub>D</sub>({p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}, a) = ⋃<sub>i=1</sub><sup>k</sup> δ<sub>N</sub>(p<sub>i</sub>, a)    (2.4)</pre>
            
            <p>Por tanto, las Ecuaciones (2.2) y (2.4) demuestran que δ<sub>D</sub>({q<sub>0</sub>}, w) = δ<sub>N</sub>(q<sub>0</sub>, w). Si observamos que tanto D como N aceptan w si y sólo si δ<sub>D</sub>({q<sub>0</sub>}, w) o δ<sub>N</sub>(q<sub>0</sub>, w), respectivamente, contienen un estado de F<sub>N</sub>, hemos completado la demostración de que L(D) = L(N). ✷</p>
        `
    },

    // ========== TEOREMA 2.12 ==========
    {
        id: "2.12",
        texto: "Un lenguaje L es aceptado por algún AFD si y sólo si L es aceptado por algún AFN.",
        pista: "La demostración tiene dos partes: (⇒) construcción de subconjuntos; (⇐) convertir AFD en AFN idéntico.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong></p>
            <p><strong>Parte Si (AFN ⇒ AFD).</strong> Esta parte es la construcción de subconjuntos y el Teorema 2.11.</p>
            <p><strong>Parte Sólo-si (AFD ⇒ AFN).</strong> Esta parte es muy simple. Sólo tenemos que convertir un AFD en un AFN idéntico. Intuitivamente, si tenemos el diagrama de transiciones correspondiente a un AFD, también podemos interpretarlo como el diagrama de transiciones de un AFN, que sólo tiene una opción de transición en cualquier situación. Más formalmente, sea D = (Q, Σ, δ<sub>D</sub>, q<sub>0</sub>, F) un AFD. Definimos N = (Q, Σ, δ<sub>N</sub>, q<sub>0</sub>, F) para que sea el AFN equivalente, donde δ<sub>N</sub> se define mediante la siguiente regla: si δ<sub>D</sub>(q, a) = p, entonces δ<sub>N</sub>(q, a) = {p}.</p>
            <p>Luego es sencillo demostrar por inducción sobre <code>|w|</code>, que si δ<sub>D</sub>(q<sub>0</sub>, w) = p entonces δ<sub>N</sub>(q<sub>0</sub>, w) = {p}. Dejamos la demostración al lector. Como consecuencia, w es aceptada por D si y sólo si es aceptada por N; es decir, L(D) = L(N). ✷</p>
        `
    },

    // ========== TEOREMA 2.22 ==========
    {
        id: "2.22",
        texto: "Un lenguaje L es aceptado por algún AFN-ε si y sólo si L es aceptado por algún AFD.",
        pista: "Parte (⇒): AFD a AFN-ε es trivial. Parte (⇐): construcción de subconjuntos con clausura ε.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong></p>
            <p><strong>Parte Si (AFD ⇒ AFN-ε).</strong> Suponga que L = L(D) para algún AFD D. Transformamos D en un AFN-ε E añadiendo transiciones δ(q, ε) = ∅ para todos los estados q de D. Técnicamente, también tenemos que convertir las transiciones de D para los símbolos de entrada, como por ejemplo δ<sub>D</sub>(q, a) = p en una transición del AFN al conjunto que sólo contiene p, es decir, δ<sub>E</sub>(q, a) = {p}. Por tanto, las transiciones de E y D son las mismas, pero E establece explícitamente que no existe ninguna transición saliente de cualquier estado para ε.</p>
            <p><strong>Parte Sólo-si (AFN-ε ⇒ AFD).</strong> Sea E = (Q<sub>E</sub>, Σ, δ<sub>E</sub>, q<sub>0</sub>, F<sub>E</sub>) un AFN-ε. Aplicamos la construcción de subconjuntos modificada descrita anteriormente para generar el AFD D = (Q<sub>D</sub>, Σ, δ<sub>D</sub>, q<sub>D</sub>, F<sub>D</sub>). Tenemos que demostrar que L(D) = L(E), y lo hacemos demostrando que las funciones de transición extendidas de E y D son iguales. Formalmente, demostramos por inducción que δ<sub>E</sub>(q<sub>0</sub>, w) = δ<sub>D</sub>(q<sub>D</sub>, w) sobre la longitud de w.</p>
            <p><strong>BASE.</strong> Si <code>|w| = 0</code>, entonces w = ε. Sabemos que δ<sub>E</sub>(q<sub>0</sub>, ε) = CLAUSURA<sub>ε</sub>(q<sub>0</sub>). También sabemos que q<sub>D</sub> = CLAUSURA<sub>ε</sub>(q<sub>0</sub>), porque es como se ha definido el estado inicial de D. Por último, para un AFD, sabemos que δ(p, ε) = p para cualquier estado p, por lo que, en particular, δ<sub>D</sub>(q<sub>D</sub>, ε) = CLAUSURA<sub>ε</sub>(q<sub>0</sub>). Luego hemos demostrado que δ<sub>E</sub>(q<sub>0</sub>, ε) = δ<sub>D</sub>(q<sub>D</sub>, ε).</p>
            <p><strong>PASO INDUCTIVO.</strong> Suponga que w = xa, donde a es el último símbolo de w, y suponga que la proposición se cumple para x. Es decir, δ<sub>E</sub>(q<sub>0</sub>, x) = δ<sub>D</sub>(q<sub>D</sub>, x). Sean estos dos conjuntos de estados <code>{p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}</code>. Aplicando la definición de δ para los AFN-ε, calculamos δ<sub>E</sub>(q<sub>0</sub>, w) como sigue:</p>
            <ol>
                <li>Sea <code>{r<sub>1</sub>, r<sub>2</sub>, ..., r<sub>m</sub>}</code> igual a <code>⋃<sub>i=1</sub><sup>k</sup> δ<sub>E</sub>(p<sub>i</sub>, a)</code>.</li>
                <li>Luego <code>δ<sub>E</sub>(q<sub>0</sub>, w) = ⋃<sub>j=1</sub><sup>m</sup> CLAUSURA<sub>ε</sub>(r<sub>j</sub>)</code>.</li>
            </ol>
            <p>Si examinamos la construcción del AFD D en la construcción de subconjuntos anterior, vemos que <code>δ<sub>D</sub>({p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}, a)</code> se construye aplicando los dos mismos pasos (1) y (2) anteriores. Por tanto, <code>δ<sub>D</sub>(q<sub>D</sub>, w)</code>, que es <code>δ<sub>D</sub>({p<sub>1</sub>, p<sub>2</sub>, ..., p<sub>k</sub>}, a)</code>, es el mismo conjunto que <code>δ<sub>E</sub>(q<sub>0</sub>, w)</code>. Luego hemos demostrado que <code>δ<sub>E</sub>(q<sub>0</sub>, w) = δ<sub>D</sub>(q<sub>D</sub>, w)</code> y el paso de inducción queda completado. ✷</p>
        `
    },

    // ========== TEOREMA 3.4 ==========
    {
        id: "3.4",
        texto: "Si L = L(A) para algún AFD A, entonces existe una expresión regular R tal que L = L(R).",
        pista: "Demostración constructiva: se definen expresiones R<sup>(k)</sup><sub>ij</sub> que representan caminos que no pasan por estados > k.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Supongamos que los estados de A son {1, 2, ..., n} para algún entero n. No importa cuántos sean los estados de A, simplemente serán n siendo n finito y podemos hacer referencia a ellos de este modo como si fueran los n primeros números enteros positivos. La primera, y más difícil, tarea es la de construir una colección de expresiones regulares que describa, de manera progresiva, conjuntos cada vez más amplios de caminos en el diagrama de transiciones de A.</p>
            <p>Utilizamos <code>R<sup>(k)</sup><sub>ij</sub></code> como nombre de una expresión regular cuyo lenguaje es el conjunto de cadenas w tal que w es la etiqueta de un camino desde el estado i hasta el estado j de A, y dicho camino no tiene ningún nodo intermedio cuyo número sea mayor que k. Observe que los puntos inicial y final del camino no son "intermedios", por lo que no existe ninguna restricción para que i y/o j tengan que ser menores o iguales que k.</p>
            <p>Para construir las expresiones <code>R<sup>(k)</sup><sub>ij</sub></code>, utilizamos la siguiente definición inductiva, comenzando en k = 0 y llegando finalmente a k = n. Fíjese en que cuando k = n, no existe ninguna restricción en absoluto sobre el camino representado, ya que no existen estados mayores que n.</p>
            <p><strong>BASE (k = 0).</strong> Puesto que todos los estados están numerados con 1 o un número mayor, la restricción sobre los caminos es que no deben tener ningún estado intermedio. Sólo existen dos tipos de caminos que cumplen esta condición:</p>
            <ol>
                <li>Un arco desde el nodo (estado) i hasta el nodo j.</li>
                <li>Un camino de longitud 0 que consta sólo de algún nodo i.</li>
            </ol>
            <p>Si i ≠ j, entonces sólo es posible el caso (1). Tenemos que examinar el AFD A y determinar aquellos símbolos de entrada a tales que exista una transición del estado i al estado j para el símbolo a.</p>
            <ul>
                <li>Si no existe tal símbolo a, entonces <code>R<sup>(0)</sup><sub>ij</sub> = ∅</code>.</li>
                <li>Si existe solamente un símbolo a, entonces <code>R<sup>(0)</sup><sub>ij</sub> = a</code>.</li>
                <li>Si existen símbolos a<sub>1</sub>, a<sub>2</sub>, ..., a<sub>k</sub> que etiquetan arcos desde el estado i hasta el estado j, entonces <code>R<sup>(0)</sup><sub>ij</sub> = a<sub>1</sub> + a<sub>2</sub> + ... + a<sub>k</sub></code>.</li>
            </ul>
            <p>Sin embargo, si i = j, entonces los caminos válidos son el camino de longitud 0 y todos los bucles desde i a sí mismo. El camino de longitud 0 se representa mediante la expresión regular ε, ya que dicho camino no contiene símbolos a lo largo de él. Por tanto, añadimos ε a las distintas expresiones deducidas en los pasos anteriores. Es decir, en el caso (a) [no existe un símbolo a] la expresión es ε, en el caso (b) [un símbolo a] la expresión es ε + a y en el caso (c) [múltiples símbolos] la expresión es ε + a<sub>1</sub> + a<sub>2</sub> + ... + a<sub>k</sub>.</p>
            <p><strong>PASO INDUCTIVO.</strong> Suponga que existe un camino desde el estado i hasta el estado j que no pasa por ningún estado mayor que k. Hay que considerar dos posibles casos:</p>
            <ol>
                <li>El camino no pasa a través del estado k. En este caso, la etiqueta sobre el camino está en el lenguaje de <code>R<sup>(k-1)</sup><sub>ij</sub></code>.</li>
                <li>El camino pasa a través del estado k al menos una vez. Podemos dividir el camino en varios tramos: el primero va desde el estado i hasta el estado k sin pasar por k, el último tramo va desde el estado k al j sin pasar a través de k, y los restantes tramos intermedios van de k a k, sin pasar por k. El conjunto de etiquetas para todos los caminos de este tipo se representa mediante la expresión regular <code>R<sup>(k-1)</sup><sub>ik</sub> (R<sup>(k-1)</sup><sub>kk</sub>)<sup>*</sup> R<sup>(k-1)</sup><sub>kj</sub></code>.</li>
            </ol>
            <p>Si combinamos las expresiones para los caminos de los dos tipos anteriores, tenemos la expresión:</p>
            <pre>R<sup>(k)</sup><sub>ij</sub> = R<sup>(k-1)</sup><sub>ij</sub> + R<sup>(k-1)</sup><sub>ik</sub> (R<sup>(k-1)</sup><sub>kk</sub>)<sup>*</sup> R<sup>(k-1)</sup><sub>kj</sub></pre>
            <p>para las etiquetas de todos los caminos desde el estado i al estado j que no pasan por ningún estado mayor que k. Si construimos estas expresiones en orden creciente de superíndices, dado que cada <code>R<sup>(k)</sup><sub>ij</sub></code> sólo depende de las expresiones con superíndice más pequeño, entonces todas las expresiones estarán disponibles cuando las necesitemos.</p>
            <p>Luego tenemos <code>R<sup>(n)</sup><sub>ij</sub></code> para todo i y j. Podemos suponer que el estado 1 es el estado inicial, aunque los estados de aceptación podrían ser cualquier conjunto de estados. La expresión regular para el lenguaje del autómata es entonces la suma (unión) de todas las expresiones <code>R<sup>(n)</sup><sub>1 j</sub></code> tales que el estado j es un estado de aceptación. ✷</p>
        `
    },
        // ========== TEOREMA 3.7 ==========
    {
        id: "3.7",
        texto: "Todo lenguaje definido mediante una expresión regular también puede definirse mediante un autómata finito.",
        pista: "Construcción inductiva de AFN-ε con un solo estado final, sin arcos que entren al inicial ni salgan del final.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Suponga L = L(R) para una expresión regular R. Vamos a demostrar que L = L(E) para un AFN-ε E con:</p>
            <ol>
                <li>Exactamente un estado de aceptación.</li>
                <li>Ningún arco que entre en el estado inicial.</li>
                <li>Ningún arco que salga del estado de aceptación.</li>
            </ol>
            <p>La demostración se realiza por inducción estructural sobre R, siguiendo la definición recursiva de las expresiones regulares.</p>
            <p><strong>BASE.</strong> Hay tres partes:</p>
            <ul>
                <li>Para la expresión ε, el autómata tiene un solo arco ε del inicial al final. Lenguaje: {ε}.</li>
                <li>Para la expresión ∅, no hay arcos entre inicial y final. Lenguaje: ∅.</li>
                <li>Para la expresión a (símbolo), un arco etiquetado con a del inicial al final. Lenguaje: {a}.</li>
            </ul>
            <p><strong>PASO INDUCTIVO.</strong> Suponemos que el teorema es cierto para subexpresiones R y S, con sus respectivos AFN-ε.</p>
            <ul>
                <li><strong>Unión (R + S):</strong> Se crea un nuevo estado inicial con arcos ε a los iniciales de R y S, y arcos ε desde los finales de R y S a un nuevo estado final. Lenguaje: L(R) ∪ L(S).</li>
                <li><strong>Concatenación (RS):</strong> Se une el final de R con el inicial de S mediante un arco ε. El inicial de R es el inicial global y el final de S es el final global. Lenguaje: L(R)L(S).</li>
                <li><strong>Cerradura de Kleene (R*):</strong> Se añade un nuevo estado inicial y uno final. Arcos ε: del nuevo inicial al inicial de R, del final de R al nuevo final, del nuevo inicial al nuevo final (para ε), y del final de R al inicial de R (para repetir). Lenguaje: L(R)*.</li>
                <li><strong>Paréntesis ((R)):</strong> El autómata de R sirve directamente.</li>
            </ul>
            <p>En todos los casos se cumplen las tres condiciones. Así, toda ER tiene un AFN-ε equivalente. ✷</p>
        `
    },

    // ========== TEOREMA 3.11 ==========
    {
        id: "3.11",
        texto: "Si L, M y N son cualesquiera lenguajes, entonces L(M ∪ N) = LM ∪ LN.",
        pista: "Demostración por doble inclusión, similar a la distributiva de conjuntos.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Demostramos que una cadena w pertenece a L(M ∪ N) si y sólo si pertenece a LM ∪ LN.</p>
            <p><strong>Parte Solo-si:</strong> Si w ∈ L(M ∪ N), entonces w = xy con x ∈ L e y ∈ M ∪ N. Si y ∈ M, entonces xy ∈ LM; si y ∈ N, entonces xy ∈ LN. En ambos casos, w ∈ LM ∪ LN.</p>
            <p><strong>Parte Si:</strong> Si w ∈ LM ∪ LN, entonces w ∈ LM o w ∈ LN. Si w ∈ LM, entonces w = xy con x ∈ L, y ∈ M. Como y ∈ M ⊆ M ∪ N, entonces w ∈ L(M ∪ N). El caso LN es análogo. ✷</p>
        `
    },

    // ========== TEOREMA 3.13 ==========
    {
        id: "3.13",
        texto: "Sea E una expresión regular con variables L₁, L₂, ..., Lₘ. Formamos una expresión regular concreta C reemplazando cada aparición de Lᵢ por el símbolo aᵢ. Entonces, para cualesquiera lenguajes L₁,...,Lₘ, cualquier cadena de L(E) se obtiene sustituyendo cada aᵢ por una cadena del lenguaje Lᵢ correspondiente, a partir de una cadena de L(C).",
        pista: "Inducción estructural sobre E. Se demuestra que la sustitución conmuta con unión, concatenación y estrella.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Por inducción estructural sobre la expresión E.</p>
            <p><strong>BASE.</strong> Si E es ε o ∅, no hay variables, y la afirmación es trivial. Si E es una variable L, entonces C es el símbolo a correspondiente, y L(E) = L. Sustituir a por cadenas de L da exactamente L.</p>
            <p><strong>PASO INDUCTIVO.</strong> Suponemos que E = F + G. Sean C y D las expresiones concretas de F y G. La expresión concreta de E es C + D. Si w ∈ L(E), entonces w ∈ L(F) o w ∈ L(G). Por hipótesis inductiva, w se obtiene a partir de una cadena de L(C) o L(D), respectivamente, sustituyendo símbolos por cadenas. Por tanto, w se obtiene a partir de una cadena de L(C + D) con las mismas sustituciones.</p>
            <p>Los casos E = FG y E = F* son análogos y se dejan al lector. ✷</p>
        `
    },

    // ========== TEOREMA 3.14 ==========
    {
        id: "3.14",
        texto: "La comprobación anterior identifica correctamente las propiedades verdaderas de las expresiones regulares.",
        pista: "Se demuestra que L(E) = L(F) para toda sustitución de variables si y solo si L(C) = L(D) para las expresiones concretas.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Se demuestra la doble implicación:</p>
            <p><strong>Parte Sólo-si:</strong> Si L(E) = L(F) para cualquier sustitución, en particular sustituimos cada variable Lᵢ por el símbolo aᵢ que la representa en C y D. Entonces L(C) = L(E) y L(D) = L(F). Como L(E) = L(F), se sigue L(C) = L(D).</p>
            <p><strong>Parte Si:</strong> Si L(C) = L(D), por el Teorema 3.13, L(E) y L(F) se obtienen reemplazando símbolos de cadenas de L(C) y L(D) por cadenas de los lenguajes correspondientes. Al ser los lenguajes concretos iguales, los conjuntos de cadenas resultantes también lo son; luego L(E) = L(F). ✷</p>
        `
    },

    // ========== TEOREMA 4.1 (LEMA DE BOMBEO) ==========
    {
        id: "4.1",
        texto: "El lema de bombeo para lenguajes regulares: Sea L un lenguaje regular. Existe una constante n (que depende de L) tal que para toda cadena w ∈ L con |w| ≥ n, se puede descomponer w = xyz con: (1) y ≠ ε, (2) |xy| ≤ n, (3) para todo k ≥ 0, xyᵏz ∈ L.",
        pista: "Se demuestra usando un AFD con n estados. Al leer w, un estado se repite en los primeros n+1 pasos; ese ciclo es la parte que se bombea.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea L regular y sea A un AFD que lo acepta, con n estados. Tomemos w = a₁a₂...aₘ con m ≥ n. Definimos pᵢ = δ(q₀, a₁...aᵢ) para i = 0,...,n. Hay n+1 estados p₀,...,pₙ, pero solo n estados distintos; por tanto, existen i < j con pᵢ = pⱼ. Entonces:</p>
            <ul>
                <li>x = a₁...aᵢ</li>
                <li>y = aᵢ₊₁...aⱼ</li>
                <li>z = aⱼ₊₁...aₘ</li>
            </ul>
            <p>Se cumple y ≠ ε (pues i < j) y |xy| = j ≤ n. Al leer x se llega a pᵢ; al leer y se vuelve a pᵢ (pues pᵢ = pⱼ); al leer z se va a un estado de aceptación (porque w ∈ L). Por tanto, para cualquier k ≥ 0, al leer xyᵏz se recorre el ciclo y k veces y luego se acepta. Luego xyᵏz ∈ L. ✷</p>
        `
    },
        // ========== TEOREMA 4.4 ==========
    {
        id: "4.4",
        texto: "Si L y M son lenguajes regulares, entonces también lo es L ∪ M.",
        pista: "Usar expresiones regulares: si L = L(R) y M = L(S), entonces L ∪ M = L(R + S).",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Dado que L y M son regulares, existen expresiones regulares R y S tales que L = L(R) y M = L(S). Por definición del operador "+" para expresiones regulares, L(R + S) = L(R) ∪ L(S) = L ∪ M. Por tanto, L ∪ M es regular. ✷</p>
        `
    },

    // ========== TEOREMA 4.5 ==========
    {
        id: "4.5",
        texto: "Si L es un lenguaje regular sobre un alfabeto Σ, entonces su complemento Σ* − L también es regular.",
        pista: "Dado un AFD para L, se intercambian estados de aceptación y no aceptación.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea L = L(A) para un AFD A = (Q, Σ, δ, q₀, F). Construimos un AFD B = (Q, Σ, δ, q₀, Q − F). Es decir, B es idéntico a A, pero los estados de aceptación son los complementarios. Entonces w ∈ L(B) si y solo si δ(q₀, w) ∈ Q − F, lo que ocurre si y solo si w ∉ L(A). Luego L(B) = Σ* − L. ✷</p>
        `
    },

    // ========== TEOREMA 4.8 ==========
    {
        id: "4.8",
        texto: "Si L y M son lenguajes regulares, entonces L ∩ M también es regular.",
        pista: "Construcción del producto: se simulan ambos AFD en paralelo y se acepta solo si ambos aceptan.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sean L = L(A<sub>L</sub>) y M = L(A<sub>M</sub>) con AFD A<sub>L</sub> = (Q<sub>L</sub>, Σ, δ<sub>L</sub>, q<sub>L</sub>, F<sub>L</sub>) y A<sub>M</sub> = (Q<sub>M</sub>, Σ, δ<sub>M</sub>, q<sub>M</sub>, F<sub>M</sub>). Construimos un AFD producto A = (Q<sub>L</sub> × Q<sub>M</sub>, Σ, δ, (q<sub>L</sub>, q<sub>M</sub>), F<sub>L</sub> × F<sub>M</sub>) donde δ((p, q), a) = (δ<sub>L</sub>(p, a), δ<sub>M</sub>(q, a)). Por inducción sobre |w| se demuestra que δ̂((q<sub>L</sub>, q<sub>M</sub>), w) = (δ̂<sub>L</sub>(q<sub>L</sub>, w), δ̂<sub>M</sub>(q<sub>M</sub>, w)). Luego A acepta w si y solo si ambos componentes son estados de aceptación, es decir, w ∈ L y w ∈ M. Por tanto, L(A) = L ∩ M. ✷</p>
        `
    },

    // ========== TEOREMA 4.10 ==========
    {
        id: "4.10",
        texto: "Si L y M son lenguajes regulares, entonces L − M también es regular.",
        pista: "L − M = L ∩ complemento(M). Usar Teoremas 4.5 y 4.8.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Observamos que L − M = L ∩ (Σ* − M). Por el Teorema 4.5, Σ* − M es regular (complemento). Por el Teorema 4.8, la intersección de dos lenguajes regulares es regular. Por tanto, L − M es regular. ✷</p>
        `
    },

    // ========== TEOREMA 4.11 ==========
    {
        id: "4.11",
        texto: "Si L es un lenguaje regular, entonces su reverso (o reflexión) L<sup>R</sup> = { w<sup>R</sup> | w ∈ L } también es regular.",
        pista: "Demostración por inducción estructural sobre la expresión regular que define a L.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Supongamos que L = L(E) para una expresión regular E. Construimos inductivamente E<sup>R</sup> tal que L(E<sup>R</sup>) = (L(E))<sup>R</sup>.</p>
            <ul>
                <li><strong>Base:</strong> Si E es ε, ∅ o a, entonces E<sup>R</sup> = E (pues ε<sup>R</sup>=ε, ∅<sup>R</sup>=∅, a<sup>R</sup>=a).</li>
                <li><strong>Unión:</strong> Si E = F + G, entonces E<sup>R</sup> = F<sup>R</sup> + G<sup>R</sup>.</li>
                <li><strong>Concatenación:</strong> Si E = FG, entonces E<sup>R</sup> = G<sup>R</sup> F<sup>R</sup> (se invierte el orden).</li>
                <li><strong>Cerradura:</strong> Si E = F*, entonces E<sup>R</sup> = (F<sup>R</sup>)*.</li>
            </ul>
            <p>La verificación es inmediata: (uv)<sup>R</sup> = v<sup>R</sup> u<sup>R</sup> y (u<sub>1</sub>...u<sub>n</sub>)<sup>R</sup> = u<sub>n</sub><sup>R</sup>...u<sub>1</sub><sup>R</sup>. Por tanto, L(E<sup>R</sup>) = L<sup>R</sup>. ✷</p>
        `
    },

    // ========== TEOREMA 4.14 ==========
    {
        id: "4.14",
        texto: "Si h es un homomorfismo de Σ en T* y L es regular sobre Σ, entonces h(L) = { h(w) | w ∈ L } es regular sobre T.",
        pista: "Se aplica h a cada símbolo de la expresión regular que define a L; la demostración es por inducción estructural.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Sea L = L(R) para una expresión regular R. Definimos h(R) reemplazando cada símbolo a en R por la cadena h(a) (que puede ser ε o una palabra). Demostramos por inducción estructural sobre R que L(h(R)) = h(L(R)).</p>
            <ul>
                <li><strong>Base:</strong> Para ε y ∅, trivial. Para a, L(h(a)) = {h(a)} = h({a}).</li>
                <li><strong>Unión:</strong> h(F+G) = h(F)+h(G), y h(L(F)∪L(G)) = h(L(F)) ∪ h(L(G)).</li>
                <li><strong>Concatenación:</strong> h(FG) = h(F)h(G), y h(L(F)L(G)) = h(L(F)) h(L(G)).</li>
                <li><strong>Cerradura:</strong> h(F*) = (h(F))*, y h(L(F)*) = (h(L(F)))*.</li>
            </ul>
            <p>Por tanto, h(R) es una expresión regular que define h(L). ✷</p>
        `
    },

    // ========== TEOREMA 4.16 ==========
    {
        id: "4.16",
        texto: "Si h : Σ → T* es un homomorfismo y L es regular sobre T, entonces la imagen inversa h<sup>−1</sup>(L) = { w ∈ Σ* | h(w) ∈ L } es regular.",
        pista: "Dado un AFD para L, se construye un AFD que traduce cada símbolo de entrada mediante h y luego simula el AFD original.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea L = L(A) con A = (Q, T, δ, q₀, F). Definimos un AFD B = (Q, Σ, γ, q₀, F) donde γ(q, a) = δ̂(q, h(a)). Es decir, para un símbolo a ∈ Σ, B simula las transiciones de A a lo largo de la cadena h(a) (que puede ser ε, un símbolo o varios). Por inducción sobre |w| se demuestra que γ̂(q₀, w) = δ̂(q₀, h(w)). Por tanto, B acepta w si y solo si A acepta h(w), es decir, w ∈ h<sup>−1</sup>(L). Luego h<sup>−1</sup>(L) es regular. ✷</p>
        `
    },
        // ========== TEOREMA 4.20 ==========
    {
        id: "4.20",
        texto: "Si dos estados no pueden distinguirse mediante el algoritmo de llenado de tabla, entonces los estados son equivalentes.",
        pista: "Se demuestra por contradicción: si existe un par malo (distinguible pero no marcado), se toma el de cadena más corta y se llega a una contradicción.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Supongamos que existe un AFD A = (Q, Σ, δ, q₀, F) y un par de estados {p, q} tal que:</p>
            <ol>
                <li>Los estados p y q son distinguibles (existe w con δ(p,w) ∈ F y δ(q,w) ∉ F, o viceversa).</li>
                <li>El algoritmo de llenado de tabla no los marca como distinguibles.</li>
            </ol>
            <p>Llamemos a este par <em>par malo</em>. Si existen pares malos, elegimos uno que sea distinguible mediante la cadena más corta posible, digamos w = a₁a₂...aₙ.</p>
            <p>w no puede ser ε, porque si ε distinguiera, el caso base del algoritmo los habría marcado. Luego n ≥ 1. Sean r = δ(p, a₁) y s = δ(q, a₁). La cadena a₂...aₙ distingue r y s, y es más corta que cualquier cadena que distinga un par malo, así que {r, s} no es un par malo. Por tanto, el algoritmo los marca como distinguibles.</p>
            <p>Pero el paso inductivo del algoritmo, al ver que δ(p, a₁) = r es distinguible de δ(q, a₁) = s, también marcaría {p, q}. Contradicción. Luego no existen pares malos, y todo par distinguible es marcado. ✷</p>
        `
    },

    // ========== TEOREMA 4.23 ==========
    {
        id: "4.23",
        texto: "La equivalencia de estados es transitiva. Es decir, si p ≡ q y q ≡ r, entonces p ≡ r.",
        pista: "Si p y r fueran distinguibles, se sigue que o bien p y q, o bien q y r, también lo serían.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Supongamos que p ≡ q y q ≡ r, pero p y r son distinguibles. Entonces existe una cadena w tal que δ(p, w) ∈ F y δ(r, w) ∉ F (o viceversa). Consideremos δ(q, w):</p>
            <ul>
                <li>Si δ(q, w) ∈ F, entonces q y r son distinguibles (contradicción).</li>
                <li>Si δ(q, w) ∉ F, entonces p y q son distinguibles (contradicción).</li>
            </ul>
            <p>Por tanto, p y r no pueden ser distinguibles, luego son equivalentes. ✷</p>
        `
    },

    // ========== TEOREMA 4.24 ==========
    {
        id: "4.24",
        texto: "Si creamos para cada estado q de un AFD un bloque formado por q y todos los estados equivalentes a q, entonces los distintos bloques forman una partición del conjunto de estados. Todos los miembros de un bloque son equivalentes y ningún par de estados de bloques diferentes son equivalentes.",
        pista: "La equivalencia es relación de equivalencia (reflexiva, simétrica, transitiva), por lo que sus clases de equivalencia forman una partición.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> La relación de equivalencia entre estados es, por definición, reflexiva (q ≡ q), simétrica (si p ≡ q entonces q ≡ p) y transitiva (Teorema 4.23). Por tanto, las clases de equivalencia (los bloques) forman una partición del conjunto de estados. Cada estado pertenece a exactamente una clase, todos los estados en una misma clase son equivalentes entre sí, y dos estados de clases distintas no son equivalentes. ✷</p>
        `
    },

    // ========== TEOREMA 4.26 ==========
    {
        id: "4.26",
        texto: "Si A es un AFD y M es el AFD construido mediante el algoritmo de minimización (agrupando estados equivalentes), entonces el número de estados de M es menor que el de cualquier AFD equivalente a A.",
        pista: "Se demuestra que cualquier AFD equivalente debe tener al menos tantos estados como clases de equivalencia, porque cada clase requiere un estado distinto.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea A un AFD y M su minimización por partición de estados equivalentes. Supongamos que existe otro AFD B equivalente a A con menos estados que M. Entonces, por el Teorema 4.24, los estados de M corresponden a las clases de equivalencia de A. Cada estado de B debe distinguir al menos una clase de equivalencia, pues si dos clases diferentes se fusionaran en un mismo estado de B, entonces B no podría distinguir cadenas que A sí distingue. Por tanto, B necesita al menos tantos estados como clases de equivalencia, es decir, tantos como estados tiene M. Luego M tiene el número mínimo de estados. ✷</p>
        `
    },

    // ========== TEOREMA 5.7 ==========
    {
        id: "5.7",
        texto: "L(G<sub>pal</sub>) es el conjunto de todos los palíndromos sobre {0, 1}.",
        pista: "Demostración por doble inclusión usando inducción sobre la longitud de la cadena y sobre la derivación.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Sea G<sub>pal</sub> la gramática con producciones P → ε | 0 | 1 | 0P0 | 1P1. Demostramos que w ∈ L(G<sub>pal</sub>) si y solo si w es un palíndromo (w = w<sup>R</sup>).</p>
            <p><strong>Parte Si (w palíndromo ⇒ w ∈ L(G<sub>pal</sub>)):</strong> Inducción sobre |w|.</p>
            <ul>
                <li><strong>Base:</strong> |w| = 0 o 1: ε, 0, 1 se derivan directamente (P → ε, P → 0, P → 1).</li>
                <li><strong>Paso:</strong> |w| ≥ 2. Como w es palíndromo, w = 0x0 o w = 1x1, y x es palíndromo. Por hipótesis inductiva, P ⇒* x. Luego P ⇒ 0P0 ⇒* 0x0 = w, o similar con 1.</li>
            </ul>
            <p><strong>Parte Sólo si (w ∈ L(G<sub>pal</sub>) ⇒ w palíndromo):</strong> Inducción sobre el número de pasos de la derivación.</p>
            <ul>
                <li><strong>Base:</strong> Un paso: P ⇒ ε, P ⇒ 0, P ⇒ 1, todos palíndromos.</li>
                <li><strong>Paso:</strong> Si la derivación usa más de un paso, el primer paso debe ser P ⇒ 0P0 o P ⇒ 1P1. Luego w = 0x0 o 1x1, donde P ⇒* x en menos pasos. Por hipótesis inductiva, x es palíndromo, y entonces 0x0 y 1x1 también lo son. ✷</li>
            </ul>
        `
    },

    // ========== TEOREMA 5.12 ==========
    {
        id: "5.12",
        texto: "Sea G = (V, T, P, S) una GIC. Si el procedimiento de inferencia recursiva dice que la cadena terminal w pertenece al lenguaje de la variable A, entonces existe un árbol de derivación con raíz A y resultado w.",
        pista: "Demostración por inducción sobre el número de pasos de inferencia. Se construye el árbol a partir de la producción usada en el último paso.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Inducción sobre el número de pasos de inferencia.</p>
            <p><strong>BASE:</strong> Un paso. Entonces se usó el caso básico, luego existe una producción A → w (con w cadena de terminales). El árbol con raíz A y hojas w es válido (si w = ε, una hoja ε).</p>
            <p><strong>PASO INDUCTIVO:</strong> Supongamos que w se infiere en n+1 pasos. El último paso usa una producción A → X₁X₂...Xₖ, donde cada Xᵢ es terminal o variable. Dividimos w = w₁w₂...wₖ, donde si Xᵢ es terminal, wᵢ = Xᵢ; si es variable, wᵢ pertenece al lenguaje de Xᵢ y se infirió en ≤ n pasos. Por hipótesis inductiva, para cada variable Xᵢ existe un árbol de raíz Xᵢ y resultado wᵢ. Construimos un árbol con raíz A, hijos X₁...Xₖ, y cada hijo es raíz del subárbol correspondiente (o hoja si es terminal). El resultado es w. ✷</p>
        `
    },

    // ========== TEOREMA 5.14 ==========
    {
        id: "5.14",
        texto: "Sea G = (V, T, P, S) una GIC. Si existe un árbol de derivación con raíz A y resultado w (w ∈ T*), entonces existe una derivación más a la izquierda A ⇒*<sub>lm</sub> w.",
        pista: "Inducción sobre la altura del árbol. Se expanden los hijos de izquierda a derecha, reemplazando cada variable por su derivación izquierda.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Inducción sobre la altura del árbol.</p>
            <p><strong>BASE:</strong> Altura 1. Entonces A → w es una producción, y A ⇒<sub>lm</sub> w es una derivación izquierda de un paso.</p>
            <p><strong>PASO INDUCTIVO:</strong> Altura n > 1. El árbol tiene raíz A, hijos X₁...Xₖ, y resultado w = w₁...wₖ, donde cada wᵢ es el resultado del subárbol con raíz Xᵢ (si Xᵢ es terminal, wᵢ = Xᵢ). Por hipótesis inductiva, para cada variable Xᵢ existe una derivación izquierda Xᵢ ⇒*<sub>lm</sub> wᵢ.</p>
            <p>Construimos una derivación izquierda de w: primero A ⇒<sub>lm</sub> X₁X₂...Xₖ. Luego, para i = 1...k, expandimos Xᵢ de izquierda a derecha usando la derivación izquierda de wᵢ, manteniendo el resto de los símbolos sin tocar. Al final obtenemos w. ✷</p>
        `
    },

    // ========== TEOREMA 5.16 ==========
    {
        id: "5.16",
        texto: "Sea G = (V, T, P, S) una GIC. Si existe un árbol de derivación con raíz A y resultado w (w ∈ T*), entonces existe una derivación más a la derecha A ⇒*<sub>rm</sub> w.",
        pista: "Análogo al Teorema 5.14, pero expandiendo los hijos de derecha a izquierda.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> La demostración es simétrica a la del Teorema 5.14, pero expandiendo los símbolos de la parte derecha de la producción en orden inverso (de derecha a izquierda). Se aplica inducción sobre la altura del árbol y se construye una derivación más a la derecha. Los detalles son idénticos intercambiando "izquierda" por "derecha". ✷</p>
        `
    }
];

window.DATOS = teoremas;
