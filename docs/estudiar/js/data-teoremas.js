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
    },
        // ========== TEOREMA 5.18 ==========
    {
        id: "5.18",
        texto: "Sea G = (V, T, P, S) una GIC. Si existe una derivación A ⇒*<sub>G</sub> w (w ∈ T*), entonces el procedimiento de inferencia recursiva determina que w pertenece al lenguaje de la variable A.",
        pista: "Inducción sobre la longitud de la derivación. Se descompone el primer paso y se aplica la hipótesis inductiva a cada variable.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Inducción sobre la longitud de la derivación A ⇒* w.</p>
            <p><strong>BASE:</strong> Un paso. Entonces A → w es una producción, y el caso base de la inferencia recursiva lo descubre.</p>
            <p><strong>PASO INDUCTIVO:</strong> Supongamos la derivación usa n+1 pasos: A ⇒ X₁X₂...Xₖ ⇒* w. Descomponemos w = w₁w₂...wₖ donde:</p>
            <ul>
                <li>Si Xᵢ es terminal, wᵢ = Xᵢ.</li>
                <li>Si Xᵢ es variable, Xᵢ ⇒* wᵢ en ≤ n pasos. Por hipótesis inductiva, se infiere que wᵢ está en el lenguaje de Xᵢ.</li>
            </ul>
            <p>Luego, usando la producción A → X₁...Xₖ, el procedimiento de inferencia deduce que w₁...wₖ = w está en el lenguaje de A. ✷</p>
        `
    },

    // ========== TEOREMA 5.29 ==========
    {
        id: "5.29",
        texto: "Para toda GIC G y cadena w ∈ T*, w tiene dos árboles de derivación distintos si y solo si w tiene dos derivaciones a la izquierda distintas desde S.",
        pista: "La correspondencia entre árboles y derivaciones izquierdas es biyectiva. Árboles distintos producen derivaciones izquierdas distintas y viceversa.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong></p>
            <p><strong>Parte Sólo-si (árboles distintos ⇒ derivaciones izquierdas distintas):</strong> En la construcción de una derivación izquierda a partir de un árbol (Teorema 5.14), si dos árboles difieren en algún nodo (usan producciones distintas), las derivaciones izquierdas construidas también difieren en ese punto.</p>
            <p><strong>Parte Si (derivaciones izquierdas distintas ⇒ árboles distintos):</strong> Construimos el árbol a partir de la derivación izquierda expandiendo el nodo más a la izquierda en cada paso. Si dos derivaciones difieren en el primer paso donde usan producciones distintas, los árboles tendrán hijos distintos en ese nodo. Por tanto, los árboles son distintos. ✷</p>
        `
    },

    // ========== TEOREMA 6.5 ==========
    {
        id: "6.5",
        texto: "Si (q, x, α) ⇒*<sub>P</sub> (p, y, β), entonces para cualquier w ∈ Σ* y γ ∈ Γ*, (q, xw, αγ) ⇒*<sub>P</sub> (p, yw, βγ).",
        pista: "Principio de inserción: se pueden añadir símbolos a la entrada y a la pila sin afectar la computación.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Por inducción sobre el número de pasos de la secuencia (q, x, α) ⇒* (p, y, β). Cada movimiento está justificado por una transición de P. Al añadir w a la entrada y γ a la pila, las transiciones siguen siendo válidas porque no dependen de esos símbolos adicionales. Por tanto, la misma secuencia de movimientos es válida con (q, xw, αγ) como configuración inicial. ✷</p>
        `
    },

    // ========== TEOREMA 6.6 ==========
    {
        id: "6.6",
        texto: "Si (q, xw, α) ⇒*<sub>P</sub> (p, yw, β), entonces (q, x, α) ⇒*<sub>P</sub> (p, y, β).",
        pista: "Principio de extracción: se pueden eliminar símbolos comunes de la entrada sin afectar la computación.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Análogo al Teorema 6.5. Si los símbolos w en la entrada no son consumidos durante la computación (porque permanecen al final), la misma secuencia de movimientos es válida sin ellos. Por tanto, (q, x, α) ⇒* (p, y, β). ✷</p>
        `
    },

    // ========== TEOREMA 6.9 ==========
    {
        id: "6.9",
        texto: "Si L = N(P<sub>N</sub>) para un autómata a pila P<sub>N</sub>, entonces existe un autómata a pila P<sub>F</sub> tal que L = L(P<sub>F</sub>). Es decir, todo lenguaje aceptado por pila vacía también es aceptado por estado final.",
        pista: "Se añade un marcador de fondo X₀ para detectar cuándo la pila está vacía, y se usa un nuevo estado final.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea P<sub>N</sub> = (Q, Σ, Γ, δ<sub>N</sub>, q₀, Z₀). Construimos P<sub>F</sub> = (Q ∪ {p₀, p<sub>f</sub>}, Σ, Γ ∪ {X₀}, δ<sub>F</sub>, p₀, X₀, {p<sub>f</sub>}) donde:</p>
            <ol>
                <li>δ<sub>F</sub>(p₀, ε, X₀) = {(q₀, Z₀X₀)} — introduce el símbolo inicial de P<sub>N</sub>.</li>
                <li>δ<sub>F</sub>(q, a, Y) contiene δ<sub>N</sub>(q, a, Y) para todo q ∈ Q, a ∈ Σ∪{ε}, Y ∈ Γ — simula P<sub>N</sub>.</li>
                <li>δ<sub>F</sub>(q, ε, X₀) contiene (p<sub>f</sub>, ε) para todo q ∈ Q — detecta pila vacía.</li>
            </ol>
            <p>Si P<sub>N</sub> vacía su pila: (q₀, w, Z₀) ⇒* (q, ε, ε). Por el Teorema 6.5, (q₀, w, Z₀X₀) ⇒* (q, ε, X₀). Luego P<sub>F</sub> hace: (p₀, w, X₀) ⇒ (q₀, w, Z₀X₀) ⇒* (q, ε, X₀) ⇒ (p<sub>f</sub>, ε, ε). Así que w ∈ L(P<sub>F</sub>).</p>
            <p>El recíproco es similar: la única forma de aceptar en P<sub>F</sub> es usando la regla (3), lo que implica que P<sub>N</sub> vació su pila. ✷</p>
        `
    },

    // ========== TEOREMA 6.11 ==========
    {
        id: "6.11",
        texto: "Sea L = L(P<sub>F</sub>) para un autómata a pila P<sub>F</sub>. Entonces existe un autómata a pila P<sub>N</sub> tal que L = N(P<sub>N</sub>). Es decir, todo lenguaje aceptado por estado final también es aceptado por pila vacía.",
        pista: "Se añade un marcador X₀ y un estado p que vacía la pila cuando P<sub>F</sub> entra en estado de aceptación.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea P<sub>F</sub> = (Q, Σ, Γ, δ<sub>F</sub>, q₀, Z₀, F). Construimos P<sub>N</sub> = (Q ∪ {p₀, p}, Σ, Γ ∪ {X₀}, δ<sub>N</sub>, p₀, X₀) donde:</p>
            <ol>
                <li>δ<sub>N</sub>(p₀, ε, X₀) = {(q₀, Z₀X₀)} — introduce Z₀.</li>
                <li>δ<sub>N</sub>(q, a, Y) = δ<sub>F</sub>(q, a, Y) para todo q ∈ Q, a ∈ Σ∪{ε}, Y ∈ Γ — simula P<sub>F</sub>.</li>
                <li>δ<sub>N</sub>(q, ε, Y) contiene (p, ε) para todo q ∈ F y todo Y ∈ Γ∪{X₀} — cuando P<sub>F</sub> acepta, empieza a vaciar.</li>
                <li>δ<sub>N</sub>(p, ε, Y) = {(p, ε)} para todo Y ∈ Γ∪{X₀} — vacía toda la pila.</li>
            </ol>
            <p>La demostración es análoga a la del Teorema 6.9, pero en sentido inverso. ✷</p>
        `
    },

    // ========== TEOREMA 6.13 ==========
    {
        id: "6.13",
        texto: "Si un autómata a pila P se construye a partir de una GIC G mediante la construcción de la Figura 6.8 (simulación de derivaciones izquierdas), entonces N(P) = L(G).",
        pista: "Se simulan las derivaciones más a la izquierda de G. La pila contiene la cola de la forma sentencial y la entrada contiene el prefijo no consumido.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> La construcción de P tiene dos reglas:</p>
            <ol>
                <li>Si A → β es una producción, P puede reemplazar A en la cima de la pila por β (consumiendo ε).</li>
                <li>Si un terminal a está en la cima de la pila, P puede consumirlo de la entrada.</li>
            </ol>
            <p><strong>Parte Si (w ∈ L(G) ⇒ w ∈ N(P)):</strong> Si S ⇒*<sub>lm</sub> w, por inducción sobre la derivación izquierda, P simula cada paso: las producciones se aplican en la pila y los terminales se consumen de la entrada. Al final, la pila queda vacía y la entrada consumida, luego P acepta por pila vacía.</p>
            <p><strong>Parte Sólo-si (w ∈ N(P) ⇒ w ∈ L(G)):</strong> Si P vacía su pila al leer w, la secuencia de movimientos corresponde a una derivación izquierda en G. Se demuestra por inducción sobre el número de movimientos que la pila contiene la cola de una forma sentencial izquierda. Al final, la pila vacía y entrada consumida implican S ⇒* w. ✷</p>
        `
    },

    // ========== TEOREMA 6.14 ==========
    {
        id: "6.14",
        texto: "Sea P = (Q, Σ, Γ, δ, q₀, Z₀) un autómata a pila. Entonces existe una GIC G tal que L(G) = N(P).",
        pista: "Las variables de G son de la forma [pXq], que generan las cadenas que hacen que P pase de p a q extrayendo X.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Construimos G = (V, Σ, R, S) donde:</p>
            <ul>
                <li>V = {S} ∪ { [pXq] | p, q ∈ Q, X ∈ Γ }</li>
                <li>Producciones: S → [q₀Z₀p] para todo p ∈ Q</li>
                <li>Si δ(q, a, X) contiene (r, Y₁Y₂...Yₖ), entonces para todo r₁,...,rₖ ∈ Q:
                    <br>[qXrₖ] → a [rY₁r₁] [r₁Y₂r₂] ... [rₖ₋₁Yₖrₖ]</li>
            </ul>
            <p>Se demuestra (por inducción sobre movimientos/derivaciones) que:</p>
            <pre>[qXp] ⇒* w ⇔ (q, w, X) ⇒* (p, ε, ε)</pre>
            <p>Luego S ⇒* w ⇔ (q₀, w, Z₀) ⇒* (p, ε, ε) para algún p, es decir, w ∈ N(P). ✷</p>
        `
    },

    // ========== TEOREMA 6.17 ==========
    {
        id: "6.17",
        texto: "Si L es un lenguaje regular, entonces L = L(P) para algún autómata a pila determinista P.",
        pista: "Un APD puede simular un AFD ignorando la pila. Solo se usa el estado.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Sea A = (Q, Σ, δ<sub>A</sub>, q₀, F) un AFD. Construimos un APD P = (Q, Σ, {Z₀}, δ<sub>P</sub>, q₀, Z₀, F) con δ<sub>P</sub>(q, a, Z₀) = {(p, Z₀)} donde δ<sub>A</sub>(q, a) = p.</p>
            <p>P simplemente simula A usando su estado, ignorando la pila. Por inducción sobre |w|, se demuestra que (q₀, w, Z₀) ⇒* (p, ε, Z₀) si y solo si δ<sub>A</sub>(q₀, w) = p. Como los estados de aceptación son los mismos, L(P) = L(A). ✷</p>
        `
    },

    // ========== TEOREMA 6.19 ==========
    {
        id: "6.19",
        texto: "Un lenguaje L es N(P) para algún autómata a pila P si y solo si L tiene la propiedad de prefijo y L = L(P') para algún APD P'. Es decir, la aceptación por pila vacía en APD corresponde a lenguajes con propiedad de prefijo aceptados por estado final.",
        pista: "Teorema fundamental que relaciona APD por pila vacía y por estado final. La propiedad de prefijo evita ambigüedades.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Este teorema es un resultado fundamental. La demostración completa es extensa, pero la idea es:</p>
            <ul>
                <li>Si L = N(P) con P determinista, entonces L tiene la propiedad de prefijo (ninguna cadena de L es prefijo de otra en L).</li>
                <li>Si L tiene la propiedad de prefijo y L = L(P') para un APD P', entonces se puede modificar P' para que acepte por pila vacía añadiendo un marcador de final y vaciando la pila al final.</li>
            </ul>
            <p>La construcción es similar a la de los Teoremas 6.9 y 6.11, pero garantizando determinismo gracias a la propiedad de prefijo. ✷</p>
        `
    },

    // ========== TEOREMA 6.20 ==========
    {
        id: "6.20",
        texto: "Si L = N(P) para algún APD P, entonces L tiene una gramática independiente del contexto no ambigua.",
        pista: "La construcción del Teorema 6.14 aplicada a un APD produce una GIC no ambigua, porque el determinismo garantiza derivaciones izquierdas únicas.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Aplicamos la construcción del Teorema 6.14 a P. Las variables son [pXq]. Como P es determinista, para cada configuración (q, a, X) hay a lo sumo un movimiento. En la gramática, para cada producción [qXrₖ] → a [rY₁r₁]... sólo una secuencia de estados intermedios es consistente con la computación real de P. Por tanto, cada cadena w tiene una única derivación izquierda. Por el Teorema 5.29, si las derivaciones izquierdas son únicas, la gramática no es ambigua. ✷</p>
        `
    },

    // ========== TEOREMA 6.21 ==========
    {
        id: "6.21",
        texto: "Si L = L(P) para un APD P, entonces L tiene una GIC no ambigua.",
        pista: "Se añade un marcador de final $ a L, se aplica el Teorema 6.19 para obtener un APD por pila vacía, luego el Teorema 6.20, y finalmente se elimina $ como variable.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea $ un símbolo que no aparece en L. Definimos L$ = { w$ | w ∈ L }. L$ tiene la propiedad de prefijo (ninguna cadena en L$ es prefijo de otra en L$). Por el Teorema 6.19, L$ = N(P') para algún APD P'. Por el Teorema 6.20, existe una GIC no ambigua G' con L(G') = L$.</p>
            <p>Ahora construimos G a partir de G' reemplazando $ por ε (tratando $ como variable y añadiendo $ → ε). Entonces L(G) = L. Si G tuviera dos derivaciones izquierdas para alguna w, entonces G' tendría dos derivaciones izquierdas para w$, contradiciendo la no ambigüedad de G'. Luego G es no ambigua. ✷</p>
        `
    },

    // ========== TEOREMA 7.2 ==========
    {
        id: "7.2",
        texto: "Sea G = (V, T, P, S) una GIC con L(G) ≠ ∅. Sea G₁ la gramática obtenida eliminando (1) símbolos no generadores y luego (2) símbolos no alcanzables. Entonces G₁ no tiene símbolos inútiles y L(G₁) = L(G).",
        pista: "Dos pasos: primero eliminar no generadores, luego no alcanzables. El orden es importante.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Sea G₂ la gramática tras eliminar no generadores. Si X permanece en G₁, entonces:</p>
            <ol>
                <li>X ⇒* w para algún w ∈ T* (porque es generador en G₂).</li>
                <li>S ⇒* αXβ (porque es alcanzable en G₂).</li>
            </ol>
            <p>Como todos los símbolos en αXβ son generadores y alcanzables, la derivación αXβ ⇒* xwy es válida en G₁. Luego X es útil.</p>
            <p>Para L(G₁) = L(G):</p>
            <ul>
                <li>L(G₁) ⊆ L(G): trivial (solo eliminamos producciones).</li>
                <li>L(G) ⊆ L(G₁): si w ∈ L(G), la derivación S ⇒* w usa solo símbolos generadores y alcanzables, por lo que también es derivación en G₁.</li>
            </ul>
            <p>Por tanto, L(G₁) = L(G). ✷</p>
        `
    },

    // ========== TEOREMA 7.4 ==========
    {
        id: "7.4",
        texto: "El algoritmo que encuentra símbolos generadores (los que derivan en terminales) encuentra todos y solo los símbolos generadores.",
        pista: "Demostración por inducción: (⇒) cada símbolo añadido deriva en terminales; (⇐) si X ⇒* w, se demuestra por inducción sobre la derivación que X es generador.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> El algoritmo es:</p>
            <ol>
                <li>Base: todos los terminales son generadores.</li>
                <li>Paso: si A → α y todo símbolo en α es generador, entonces A es generador.</li>
            </ol>
            <p><strong>Parte (⇒):</strong> Si X es añadido, por inducción sobre el orden de adición, X ⇒* w para algún w ∈ T*.</p>
            <p><strong>Parte (⇐):</strong> Si X ⇒* w, se demuestra por inducción sobre la longitud de la derivación:</p>
            <ul>
                <li>Base: 0 pasos ⇒ X es terminal (base del algoritmo).</li>
                <li>Paso: X ⇒ α ⇒* w. Cada símbolo de α deriva en una subcadena terminal en menos pasos, así que son generadores. Luego el paso inductivo del algoritmo añade X.</li>
            </ul>
            <p>Por tanto, el algoritmo encuentra exactamente los generadores. ✷</p>
        `
    },

    // ========== TEOREMA 7.6 ==========
    {
        id: "7.6",
        texto: "El algoritmo que encuentra símbolos alcanzables (desde S) encuentra todos y solo los símbolos alcanzables.",
        pista: "Demostración por inducción sobre el orden de descubrimiento. Se deja como ejercicio al lector.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> El algoritmo es:</p>
            <ol>
                <li>Base: S es alcanzable.</li>
                <li>Paso: si A es alcanzable y A → α, entonces todos los símbolos en α son alcanzables.</li>
            </ol>
            <p><strong>Parte (⇒):</strong> Por inducción sobre el orden en que se añaden, cada símbolo añadido es alcanzable desde S.</p>
            <p><strong>Parte (⇐):</strong> Si X es alcanzable, existe una derivación S ⇒* αXβ. Por inducción sobre la longitud de la derivación, X es añadido por el algoritmo.</p>
            <p>La demostración detallada es análoga a la del Teorema 7.4. ✷</p>
        `
    },
        // ========== TEOREMA 7.7 ==========
    {
        id: "7.7",
        texto: "En cualquier gramática G, los únicos símbolos anulables son las variables encontradas por el algoritmo de detección de anulables.",
        pista: "Demostración por inducción: (⇒) cada símbolo descubierto genera ε; (⇐) si A ⇒* ε, se demuestra por inducción sobre la derivación.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> El algoritmo de detección de anulables es:</p>
            <ol>
                <li><strong>Base:</strong> Si A → ε es una producción, A es anulable.</li>
                <li><strong>Paso:</strong> Si A → X₁X₂...Xₖ y todo Xᵢ es anulable, entonces A es anulable.</li>
            </ol>
            <p><strong>Parte (⇒):</strong> Por inducción sobre el orden en que se descubren, cada símbolo anulable genera ε.</p>
            <p><strong>Parte (⇐):</strong> Supongamos A ⇒* ε en n pasos. Inducción sobre n:</p>
            <ul>
                <li><strong>Base (n=1):</strong> A → ε es producción, luego A se descubre en la base.</li>
                <li><strong>Paso:</strong> A ⇒ X₁...Xₖ ⇒* ε. Cada Xᵢ genera ε en menos pasos, luego son anulables por hipótesis inductiva. El paso inductivo del algoritmo los descubre. ✷</li>
            </ul>
        `
    },

    // ========== TEOREMA 7.9 ==========
    {
        id: "7.9",
        texto: "Si G₁ se construye a partir de G eliminando producciones-ε, entonces L(G₁) = L(G) - {ε}.",
        pista: "Demostración por doble inclusión. Se usa inducción sobre derivaciones en ambas gramáticas.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Se demuestra la proposición más general: A ⇒*<sub>G₁</sub> w ⇔ A ⇒*<sub>G</sub> w y w ≠ ε, por inducción sobre la longitud de la derivación.</p>
            <p><strong>Parte Sólo-si (G₁ ⇒ G):</strong> Si A ⇒*<sub>G₁</sub> w, w ≠ ε. Por inducción sobre la derivación en G₁, cada producción de G₁ corresponde a una producción de G seguida de derivaciones ε de variables anulables. Luego A ⇒*<sub>G</sub> w.</p>
            <p><strong>Parte Si (G ⇒ G₁):</strong> Si A ⇒*<sub>G</sub> w, w ≠ ε. Por inducción sobre la derivación en G, se eliminan las variables que derivan ε (que no contribuyen a w). Las producciones resultantes están en G₁. ✷</p>
        `
    },

    // ========== TEOREMA 7.11 ==========
    {
        id: "7.11",
        texto: "El algoritmo de detección de pares unitarios determina exactamente los pares (A, B) tales que A ⇒* B usando solo producciones unitarias.",
        pista: "Demostración por inducción: (⇒) cada par descubierto corresponde a una derivación; (⇐) si A ⇒* B con unitarias, se demuestra por inducción sobre la derivación.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> El algoritmo es:</p>
            <ol>
                <li><strong>Base:</strong> (A, A) es unitario para toda variable A.</li>
                <li><strong>Paso:</strong> Si (A, B) es unitario y B → C es unitaria, entonces (A, C) es unitario.</li>
            </ol>
            <p><strong>Parte (⇒):</strong> Por inducción sobre el orden de descubrimiento, si (A,B) se descubre, entonces A ⇒* B con unitarias.</p>
            <p><strong>Parte (⇐):</strong> Si A ⇒* B con unitarias en n pasos, inducción sobre n:</p>
            <ul>
                <li><strong>Base (n=0):</strong> A = B, base del algoritmo.</li>
                <li><strong>Paso:</strong> A ⇒* C ⇒ B. Por hipótesis inductiva (A,C) es unitario, y C → B es unitaria, luego el paso inductivo descubre (A,B). ✷</li>
            </ul>
        `
    },

    // ========== TEOREMA 7.13 ==========
    {
        id: "7.13",
        texto: "Si G₁ se construye a partir de G eliminando producciones unitarias, entonces L(G₁) = L(G).",
        pista: "Cada producción de G₁ equivale a una secuencia de producciones unitarias seguidas de una no unitaria en G. La derivación izquierda de G se descompone en tales secuencias.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong></p>
            <p><strong>Parte Si (G₁ ⇒ G):</strong> Toda producción de G₁ es de la forma A → α donde existe A ⇒*<sub>G</sub> B y B → α es no unitaria. Luego cada paso en G₁ equivale a uno o más pasos en G. Por tanto, S ⇒*<sub>G₁</sub> w implica S ⇒*<sub>G</sub> w.</p>
            <p><strong>Parte Sólo-si (G ⇒ G₁):</strong> En una derivación izquierda de G, las producciones unitarias consecutivas seguidas de una no unitaria forman un bloque. Cada bloque se reemplaza por una producción de G₁. Luego S ⇒*<sub>G</sub> w implica S ⇒*<sub>G₁</sub> w. ✷</p>
        `
    },

    // ========== TEOREMA 7.14 ==========
    {
        id: "7.14",
        texto: "Si G genera un lenguaje con al menos una cadena no vacía, entonces existe G₁ tal que L(G₁) = L(G) - {ε} y G₁ no tiene producciones-ε, ni unitarias, ni símbolos inútiles.",
        pista: "Se aplican en orden: eliminar ε, eliminar unitarias, eliminar inútiles. Las transformaciones no reintroducen los tipos eliminados.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Se aplican tres transformaciones en el orden correcto:</p>
            <ol>
                <li>Eliminar producciones-ε (Teorema 7.9).</li>
                <li>Eliminar producciones unitarias (Teorema 7.13). Esta transformación no introduce ε.</li>
                <li>Eliminar símbolos inútiles (Teorema 7.2). Esta transformación solo elimina producciones y símbolos, no introduce ε ni unitarias.</li>
            </ol>
            <p>La gramática resultante G₁ cumple las tres propiedades y L(G₁) = L(G) - {ε}. ✷</p>
        `
    },

    // ========== TEOREMA 7.16 ==========
    {
        id: "7.16",
        texto: "Si G es una GIC con L(G) ≠ ∅ y contiene al menos una cadena no vacía, entonces existe G₁ en Forma Normal de Chomsky (FNC) tal que L(G₁) = L(G) - {ε}.",
        pista: "Primero se eliminan ε, unitarias e inútiles (Teorema 7.14). Luego se convierten producciones con cuerpos largos y terminales usando variables auxiliares.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Aplicando el Teorema 7.14, obtenemos G₂ sin ε, unitarias ni inútiles. Convertimos G₂ a FNC:</p>
            <ol>
                <li>Para cada terminal a, se introduce una variable Bₐ y la producción Bₐ → a.</li>
                <li>Para cada producción A → X₁X₂...Xₖ con k ≥ 3, se introducen variables C₁, C₂,... para binificar: A → X₁C₁, C₁ → X₂C₂, etc.</li>
                <li>Las producciones de la forma A → X (donde X es terminal o variable) ya están en FNC; si X es terminal, se usa la variable auxiliar.</li>
            </ol>
            <p>La gramática resultante G₁ está en FNC y L(G₁) = L(G₂) = L(G) - {ε}. ✷</p>
        `
    },

    // ========== TEOREMA 7.17 ==========
    {
        id: "7.17",
        texto: "Si G está en FNC y el camino más largo en un árbol de derivación tiene longitud n, entonces |w| ≤ 2<sup>n-1</sup>.",
        pista: "Inducción sobre n: un árbol de altura n tiene dos subárboles de altura ≤ n-1, cuyos resultados tienen longitud ≤ 2<sup>n-2</sup> cada uno.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Inducción sobre n (longitud del camino más largo).</p>
            <p><strong>Base (n=1):</strong> El árbol es raíz → hoja terminal. |w| = 1 = 2<sup>0</sup>.</p>
            <p><strong>Paso (n>1):</strong> La raíz usa A → BC. Los subárboles B y C tienen caminos de longitud ≤ n-1. Por hipótesis inductiva, sus resultados tienen longitud ≤ 2<sup>n-2</sup> cada uno. El resultado total es la concatenación, de longitud ≤ 2·2<sup>n-2</sup> = 2<sup>n-1</sup>. ✷</p>
        `
    },

    // ========== TEOREMA 7.18 (LEMA DE BOMBEO PARA LIC) ==========
    {
        id: "7.18",
        texto: "Lema de bombeo para LIC: Sea L un LIC. Existe n tal que para todo z ∈ L con |z| ≥ n, se puede escribir z = uvwxy con (1) |vwx| ≤ n, (2) vx ≠ ε, (3) para todo i ≥ 0, uv<sup>i</sup>wx<sup>i</sup>y ∈ L.",
        pista: "Se usa FNC con m variables, n = 2<sup>m</sup>. En el camino más largo hay m+1 variables, luego dos son iguales. Se bombea el subárbol entre esas variables.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea G en FNC con m variables. Tomamos n = 2<sup>m</sup>. Para z ∈ L con |z| ≥ n, un árbol de derivación debe tener un camino de longitud ≥ m+1. Hay m+1 variables en el camino, luego Aᵢ = Aⱼ para algún i < j, con j-i ≤ m.</p>
            <p>Se divide el árbol: la variable repetida A genera el subárbol central. Se puede reemplazar el subárbol superior por el inferior (bombeo hacia abajo) o viceversa (bombeo hacia arriba). Esto produce derivaciones para uv<sup>i</sup>wx<sup>i</sup>y para todo i ≥ 0.</p>
            <p>Las condiciones: vx ≠ ε (no hay producciones unitarias), y |vwx| ≤ 2<sup>m</sup> = n porque el subárbol entre Aᵢ y Aⱼ tiene altura ≤ m+1. ✷</p>
        `
    },

    // ========== TEOREMA 7.23 ==========
    {
        id: "7.23",
        texto: "Si L es LIC y s es una sustitución tal que s(a) es LIC para cada a, entonces s(L) es LIC.",
        pista: "Se toma una GIC para L y se reemplaza cada terminal a por el símbolo inicial de la GIC para s(a). Se renombran variables para evitar mezclas.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sean G para L y Gₐ para cada s(a). Se construye G' con variables disjuntas (renombrando). Las producciones de G' son:</p>
            <ol>
                <li>Las producciones de cada Gₐ.</li>
                <li>Las producciones de G, pero reemplazando cada terminal a por Sₐ (el símbolo inicial de Gₐ).</li>
            </ol>
            <p>Entonces L(G') = s(L). Los árboles de derivación primero usan las producciones de G (con Sₐ en las hojas) y luego cada Sₐ genera una cadena de s(a). ✷</p>
        `
    },

    // ========== TEOREMA 7.24 ==========
    {
        id: "7.24",
        texto: "Los lenguajes independientes del contexto son cerrados para: (1) unión, (2) concatenación, (3) clausura de Kleene (*) y positiva (+), (4) homomorfismo.",
        pista: "Se usa el Teorema 7.23 con sustituciones apropiadas: para unión, L = {1,2}; para concatenación, L = {12}; para clausura, L = {1}* o {1}+; para homomorfismo, s(a) = {h(a)}.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Todas son aplicaciones del Teorema 7.23:</p>
            <ol>
                <li><strong>Unión:</strong> Sea L = {1,2}, s(1)=L₁, s(2)=L₂. Entonces s(L) = L₁ ∪ L₂.</li>
                <li><strong>Concatenación:</strong> Sea L = {12}, s(1)=L₁, s(2)=L₂. Entonces s(L) = L₁L₂.</li>
                <li><strong>Clausura:</strong> Sea L = {1}*, s(1)=L₁. Entonces s(L) = L₁*. Análogo para +.</li>
                <li><strong>Homomorfismo:</strong> Sea s(a) = {h(a)}. Entonces s(L) = h(L).</li>
            </ol>
            <p>En todos los casos, s(L) es LIC por el Teorema 7.23. ✷</p>
        `
    },

    // ========== TEOREMA 7.25 ==========
    {
        id: "7.25",
        texto: "Si L es LIC, entonces L<sup>R</sup> (el lenguaje reflejado) también es LIC.",
        pista: "Se toma una GIC para L y se reflejan todos los cuerpos de las producciones. La gramática resultante genera L<sup>R</sup>.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea G = (V, T, P, S). Construimos G<sup>R</sup> = (V, T, P<sup>R</sup>, S) donde P<sup>R</sup> = { A → α<sup>R</sup> | A → α ∈ P }.</p>
            <p>Por inducción sobre la longitud de la derivación, se demuestra que A ⇒*<sub>G</sub> w ⇔ A ⇒*<sub>G<sup>R</sup></sub> w<sup>R</sup>. Por tanto, L(G<sup>R</sup>) = L(G)<sup>R</sup>. ✷</p>
        `
    },

    // ========== TEOREMA 7.27 ==========
    {
        id: "7.27",
        texto: "Si L es LIC y R es regular, entonces L ∩ R es LIC.",
        pista: "Se ejecuta un autómata a pila para L en paralelo con un AFD para R. El producto es un autómata a pila cuyo estado es el par (estado_AP, estado_AFD).",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea P un AP que acepta L por estado final, y A un AFD para R. Construimos P' = (Q<sub>P</sub> × Q<sub>A</sub>, Σ, Γ, δ', (q<sub>P</sub>, q<sub>A</sub>), Z₀, F<sub>P</sub> × F<sub>A</sub>) donde:</p>
            <pre>δ'((q, p), a, X) = { ((r, δ<sub>A</sub>(p, a)), γ) | (r, γ) ∈ δ<sub>P</sub>(q, a, X) }</pre>
            <p>Para a = ε, δ<sub>A</sub>(p, ε) = p (no cambia). Por inducción se demuestra que P' simula P y A simultáneamente. P' acepta w ⇔ P acepta w y A acepta w. ✷</p>
        `
    },

    // ========== TEOREMA 7.29 ==========
    {
        id: "7.29",
        texto: "Para LIC L, L₁, L₂ y regular R: (1) L - R es LIC; (2) L no es necesariamente LIC; (3) L₁ - L₂ no es necesariamente LIC.",
        pista: "(1) L - R = L ∩ complemento(R) y complemento de regular es regular. (2) Si L fuera siempre LIC, entonces la intersección sería LIC (por leyes de De Morgan), pero no lo es. (3) Si L₁ - L₂ fuera siempre LIC, el complemento sería LIC.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong></p>
            <ol>
                <li><strong>L - R es LIC:</strong> R es regular, por Teorema 4.5, complemento(R) es regular. Luego L ∩ complemento(R) es LIC por Teorema 7.27.</li>
                <li><strong>L no es necesariamente LIC:</strong> Si lo fuera, por leyes de De Morgan, L₁ ∩ L₂ = complemento(complemento(L₁) ∪ complemento(L₂)) sería LIC, contradiciendo que LIC no son cerrados para intersección (Ejemplo 7.26).</li>
                <li><strong>L₁ - L₂ no es necesariamente LIC:</strong> Si lo fuera, Σ* - L sería LIC (pues Σ* es LIC), contradiciendo (2).</li>
            </ol>
            <p>Por tanto, (2) y (3) son falsos en general. ✷</p>
        `
    },

    // ========== TEOREMA 7.30 ==========
    {
        id: "7.30",
        texto: "Si L es LIC y h es un homomorfismo, entonces h<sup>-1</sup>(L) es LIC.",
        pista: "Se usa un AP para L y se construye un AP con buffer que lee símbolos de entrada, los traduce mediante h y los pasa al AP simulado.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea P un AP que acepta L por estado final. Construimos P' con estados (q, x) donde x es un sufijo de h(a) para algún a. El buffer se carga con h(a) al leer a. Las transiciones simulan a P usando el buffer como entrada. Los estados de aceptación son (q, ε) con q ∈ F. Se demuestra por inducción que (q₀, h(w), Z₀) ⇒*<sub>P</sub> (q, ε, γ) ⇔ ((q₀, ε), w, Z₀) ⇒*<sub>P'</sub> ((q, ε), ε, γ). Por tanto, L(P') = h<sup>-1</sup>(L). ✷</p>
        `
    },

    // ========== TEOREMA 7.31 ==========
    {
        id: "7.31",
        texto: "Existe un algoritmo O(n³) que, dado un AP de longitud n, produce una GIC de longitud O(n³) que genera el mismo lenguaje (por pila vacía o estado final).",
        pista: "Se aplica la construcción del Teorema 6.14 y se observa que el número de estados y símbolos de pila es O(n), luego la gramática tiene O(n³) producciones.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> La construcción del Teorema 6.14 produce variables [pXq] para cada terna (p, q ∈ Q, X ∈ Γ). Hay |Q|²·|Γ| = O(n³) variables. Para cada transición δ(q, a, X) ∋ (r, Y₁...Yₖ), se generan producciones para todas las combinaciones de estados intermedios, que son O(|Q|<sup>k-1</sup>) = O(n³). El algoritmo de construcción es O(n³). ✷</p>
        `
    },

    // ========== TEOREMA 7.32 ==========
    {
        id: "7.32",
        texto: "Dada una gramática G de longitud n, se puede construir una FNC equivalente en tiempo O(n²), con longitud O(n²).",
        pista: "Se eliminan ε, unitarias e inútiles (O(n²)), luego se binifican producciones (O(n²)) y se introducen variables para terminales (O(n²)).",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> La construcción de FNC a partir de G implica:</p>
            <ol>
                <li>Eliminar ε, unitarias e inútiles (Teorema 7.14) en O(n²).</li>
                <li>Introducir variables para terminales: a lo sumo |T| ≤ n variables.</li>
                <li>Binificar producciones de cuerpos largos: cada producción de longitud k se convierte en k-2 producciones nuevas. El total es O(n²).</li>
            </ol>
            <p>El tiempo total es O(n²) y la gramática resultante tiene O(n²) producciones. ✷</p>
        `
    },

    // ========== TEOREMA 7.33 ==========
    {
        id: "7.33",
        texto: "El algoritmo CYK (Cocke-Younger-Kasami) para GIC en FNC calcula correctamente X<sub>ij</sub> (variables que generan w<sub>i</sub>...w<sub>j</sub>) en tiempo O(n³).",
        pista: "Programación dinámica: X<sub>ii</sub> = {A | A → wᵢ}; X<sub>ij</sub> = ⋃<sub>k</sub> { A | A → BC, B ∈ X<sub>ik</sub>, C ∈ X<sub>k+1,j</sub> }.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> El algoritmo CYK:</p>
            <ol>
                <li><strong>Base:</strong> X<sub>ii</sub> = { A | A → wᵢ }.</li>
                <li><strong>Paso:</strong> Para longitud l = 2..n, para i = 1..n-l+1, j = i+l-1:<br>
                    X<sub>ij</sub> = ⋃<sub>k=i..j-1</sub> { A | A → BC, B ∈ X<sub>ik</sub>, C ∈ X<sub>k+1,j</sub> }.</li>
            </ol>
            <p>Se demuestra por inducción que X<sub>ij</sub> contiene exactamente las variables que generan w<sub>i</sub>...w<sub>j</sub>. Hay O(n²) subproblemas, cada uno con O(n) particiones, y cada operación de conjuntos es O(1) (gramática fija). Luego O(n³). ✷</p>
        `
    },

    // ========== TEOREMA 8.9 ==========
    {
        id: "8.9",
        texto: "Todo lenguaje aceptado por una MT de varias cintas es recursivamente enumerable.",
        pista: "Se simula una MT de k cintas con una MT de una cinta usando 2k pistas: k para los contenidos y k para los marcadores de cabeza.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea M una MT de k cintas. Construimos N de una cinta con 2k pistas: las pistas impares guardan los contenidos de las cintas de M, las pares guardan un marcador para la posición de cada cabeza. N simula un movimiento de M:</p>
            <ol>
                <li>Localiza los k marcadores de cabeza leyendo la cinta.</li>
                <li>Almacena los símbolos leídos en su estado.</li>
                <li>Conoce el movimiento de M (estado, símbolos).</li>
                <li>Actualiza cada pista de contenido y mueve los marcadores.</li>
                <li>Cambia al estado simulado de M.</li>
            </ol>
            <p>N acepta cuando M entra en estado de aceptación. Luego L(N) = L(M). ✷</p>
        `
    },

    // ========== TEOREMA 8.10 ==========
    {
        id: "8.10",
        texto: "El tiempo de simulación de n movimientos de una MT de k cintas por una MT de una cinta es O(n²).",
        pista: "Después de n movimientos, los marcadores de cabeza están a distancia ≤ 2n. Cada movimiento requiere O(n) pasos para recorrer la cinta. Luego n movimientos requieren O(n²).",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Después de n movimientos de M, los marcadores de cabeza no pueden estar separados más de 2n casillas. Para simular un movimiento, la MT N debe recorrer la cinta para encontrar todos los marcadores y luego actualizar el contenido, lo que requiere O(n) pasos. Por tanto, n movimientos requieren O(n²) pasos. ✷</p>
        `
    },

    // ========== TEOREMA 8.11 ==========
    {
        id: "8.11",
        texto: "Si M<sub>N</sub> es una MT no determinista, entonces existe una MT determinista M<sub>D</sub> tal que L(M<sub>N</sub>) = L(M<sub>D</sub>).",
        pista: "Se usa una búsqueda en anchura sobre el árbol de configuraciones. La primera cinta guarda la cola de configuraciones; la segunda se usa para copiar.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> M<sub>D</sub> tiene tres cintas:</p>
            <ol>
                <li>Cola de configuraciones (IDs) de M<sub>N</sub>, con una marca en la configuración actual.</li>
                <li>Cinta auxiliar para copiar.</li>
                <li>(Opcional) para control.</li>
            </ol>
            <p>M<sub>D</sub> procesa la configuración actual: si es de aceptación, acepta. Si no, genera todas las configuraciones sucesoras (una por cada movimiento no determinista) y las añade al final de la cola. Luego marca la siguiente configuración.</p>
            <p>La búsqueda en anchura garantiza que si M<sub>N</sub> tiene una computación de aceptación de n pasos, M<sub>D</sub> la encontrará después de explorar todas las configuraciones de profundidad ≤ n, que son finitas. ✷</p>
        `
    },

    // ========== TEOREMA 8.12 ==========
    {
        id: "8.12",
        texto: "Todo lenguaje aceptado por una MT M₂ es aceptado por una MT M₁ que nunca se mueve a la izquierda de su posición inicial y nunca escribe blancos.",
        pista: "Para no escribir blancos, se introduce un nuevo símbolo B' que se comporta como blanco. Para no moverse a la izquierda, se usa una cinta semi-infinita con dos pistas (superior e inferior) para simular las dos mitades de la cinta.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Primero se modifica M₂ para que nunca escriba blancos: se reemplaza cada blanco B por un nuevo símbolo B' (que no es B) y se añaden transiciones para B' que imitan a B.</p>
            <p>Para evitar moverse a la izquierda, se usa una cinta con dos pistas: la pista superior almacena la mitad derecha de la cinta (desde la posición inicial hacia la derecha), y la inferior almacena la mitad izquierda en orden inverso. El marcador * en la posición inicial indica el límite. Los movimientos a la derecha se simulan en la pista superior; los movimientos a la izquierda en la inferior (en dirección opuesta). ✷</p>
        `
    },

    // ========== TEOREMA 8.13 ==========
    {
        id: "8.13",
        texto: "Si L es aceptado por una MT, entonces L es aceptado por una máquina de dos pilas.",
        pista: "Una pila almacena el contenido a la izquierda de la cabeza (con la cabeza en la cima) y la otra almacena el contenido a la derecha (con la cabeza en la cima). Se simula cada movimiento de la MT.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Se usa una pila para la parte izquierda de la cinta (con la casilla actual en la cima) y otra para la derecha.</p>
            <ol>
                <li>Se copia la entrada w en la primera pila, luego se pasa a la segunda (inviertiendo el orden) para que la cima sea el primer símbolo.</li>
                <li>Para simular un movimiento:
                    <ul>
                        <li>La cima de la segunda pila es el símbolo actual.</li>
                        <li>Si la pila está vacía, es un blanco.</li>
                        <li>Se actualiza el estado y se mueve la cabeza: si se mueve a la derecha, se apila el símbolo en la primera pila y se extrae de la segunda; si se mueve a la izquierda, se extrae de la primera y se apila en la segunda.</li>
                    </ul>
                </li>
            </ol>
            <p>La máquina de dos pilas acepta cuando la MT simulada acepta. ✷</p>
        `
    },

    // ========== TEOREMA 8.14 ==========
    {
        id: "8.14",
        texto: "Todo lenguaje recursivamente enumerable es aceptado por una máquina de tres contadores.",
        pista: "Se simula una máquina de dos pilas codificando cada pila como un entero en base r, usando dos contadores para las pilas y un tercero para multiplicar/dividir.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Se simula una máquina de dos pilas con tres contadores:</p>
            <ol>
                <li>Se codifica una pila X₁X₂...Xₙ como entero Xₙr<sup>n-1</sup> + ... + X₂r + X₁ (base r).</li>
                <li>Dos contadores almacenan los enteros de las dos pilas.</li>
                <li>El tercer contador se usa para operaciones:
                    <ul>
                        <li><strong>Extraer:</strong> dividir el contador entre r (decrementar r veces, incrementar el tercero).</li>
                        <li><strong>Apilar:</strong> multiplicar por r y sumar el nuevo símbolo (decrementar el contador, incrementar el tercero en r).</li>
                        <li><strong>Cambiar cima:</strong> sumar/restar la diferencia entre símbolos.</li>
                    </ul>
                </li>
            </ol>
            <p>El determinismo se mantiene porque las operaciones aritméticas son deterministas. ✷</p>
        `
    },

    // ========== TEOREMA 8.15 ==========
    {
        id: "8.15",
        texto: "Todo lenguaje recursivamente enumerable es aceptado por una máquina de dos contadores.",
        pista: "Se codifican tres contadores (i, j, k) en un único entero m = 2<sup>i</sup>3<sup>j</sup>5<sup>k</sup>. El segundo contador se usa para multiplicar/dividir por 2, 3 o 5.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Se simula una máquina de tres contadores con dos contadores:</p>
            <ul>
                <li>El primer contador almacena m = 2<sup>i</sup>3<sup>j</sup>5<sup>k</sup>.</li>
                <li>El segundo es auxiliar.</li>
                <li><strong>Incrementar i:</strong> multiplicar m por 2.</li>
                <li><strong>Decrementar i:</strong> dividir m por 2 (si no es divisible, la simulación falla).</li>
                <li><strong>Probar si i=0:</strong> comprobar si m es divisible por 2 (copiando m al segundo contador y restando 2 repetidamente).</li>
                <li>Análogo para j (factor 3) y k (factor 5).</li>
            </ul>
            <p>Las operaciones de multiplicación y división por constantes se realizan con el segundo contador (Teorema 8.14). ✷</p>
        `
    },

    // ========== TEOREMA 8.17 ==========
    {
        id: "8.17",
        texto: "Una MT puede simular n pasos de una computadora (con instrucciones que incrementan la longitud de palabra en ≤1 y ejecutables en O(k²) por una MT) en O(n³) pasos.",
        pista: "La memoria ocupa O(n²) casillas después de n pasos. Cada instrucción requiere O(n²) tiempo para buscar direcciones y desplazar memoria. Luego n instrucciones toman O(n³).",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Después de n pasos, la computadora ha creado a lo sumo O(n²) palabras de memoria, cada una de longitud O(n). La MT que simula la computadora usa una cinta con todas las direcciones y contenidos. Cada instrucción requiere:</p>
            <ol>
                <li>Buscar direcciones (O(n²) tiempo en la MT).</li>
                <li>Ejecutar la operación (O(n²) por suposición).</li>
                <li>Desplazar memoria para hacer espacio para nuevas palabras (O(n²) por movimiento).</li>
            </ol>
            <p>Por tanto, cada paso se simula en O(n²), y n pasos en O(n³). ✷</p>
        `
    },

    // ========== TEOREMA 8.18 ==========
    {
        id: "8.18",
        texto: "Una computadora del tipo descrito en el Teorema 8.17 puede ser simulada por una MT de una cinta en O(n⁶) pasos.",
        pista: "Se simula la MT de varias cintas del Teorema 8.17 con una MT de una cinta, lo que añade un factor O(n²) (Teorema 8.10). Luego O(n³)·O(n²) = O(n⁵) en realidad, pero el enunciado dice O(n⁶) por holgura.",
        clasificacion: "B",
        demostracion: `
            <p><strong>Demostración.</strong> Por el Teorema 8.17, una MT de varias cintas simula la computadora en O(n³) pasos. Por el Teorema 8.10, una MT de una cinta simula a la MT de varias cintas con un factor O(n²) adicional. Por tanto, el tiempo total es O(n³)·O(n²) = O(n⁵) (o O(n⁶) si se usa una cota más holgada). ✷</p>
        `
    },

    // ========== TEOREMA 9.2 ==========
    {
        id: "9.2",
        texto: "L<sub>d</sub> = { wᵢ | Mᵢ no acepta wᵢ } no es recursivamente enumerable.",
        pista: "Demostración por contradicción: si L<sub>d</sub> = L(M), entonces M = Mᵢ para algún i. Se evalúa si wᵢ ∈ L<sub>d</sub>, lo que lleva a una contradicción (wᵢ ∈ L<sub>d</sub> ⇔ wᵢ ∉ L<sub>d</sub>).",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Supongamos que L<sub>d</sub> = L(M) para alguna MT M. Como L<sub>d</sub> ⊆ {0,1}*, M está en la enumeración de MT, digamos M = Mᵢ.</p>
            <p>Consideremos wᵢ:</p>
            <ul>
                <li>Si wᵢ ∈ L<sub>d</sub>, entonces Mᵢ acepta wᵢ. Pero por definición de L<sub>d</sub>, wᵢ ∉ L<sub>d</sub>. Contradicción.</li>
                <li>Si wᵢ ∉ L<sub>d</sub>, entonces Mᵢ no acepta wᵢ. Pero por definición de L<sub>d</sub>, wᵢ ∈ L<sub>d</sub>. Contradicción.</li>
            </ul>
            <p>En ambos casos hay contradicción. Luego L<sub>d</sub> no es RE. ✷</p>
        `
    },

    // ========== TEOREMA 9.3 ==========
    {
        id: "9.3",
        texto: "Si L es recursivo, entonces complemento(L) también es recursivo.",
        pista: "Dada una MT M que siempre para y acepta L, se construye M' que invierte aceptación y rechazo. M' siempre para y acepta complemento(L).",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sea L = L(M) con M siempre para. Construimos M' que simula M pero:</p>
            <ol>
                <li>Los estados de aceptación de M se convierten en estados de rechazo sin transiciones.</li>
                <li>Se añade un nuevo estado de aceptación r.</li>
                <li>Para cada estado de no aceptación de M sin transiciones (rechazo), se añade una transición a r.</li>
            </ol>
            <p>M' siempre para y acepta exactamente las cadenas que M rechaza. Luego L(M') = complemento(L). ✷</p>
        `
    },

    // ========== TEOREMA 9.4 ==========
    {
        id: "9.4",
        texto: "Si L y complemento(L) son ambos RE, entonces L es recursivo.",
        pista: "Se simulan en paralelo las MT que aceptan L y complemento(L). Una de ellas aceptará siempre. Si acepta L, se acepta; si acepta complemento(L), se rechaza.",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> Sean L = L(M₁) y complemento(L) = L(M₂). Construimos M que simula M₁ y M₂ en paralelo (usando dos cintas).</p>
            <ul>
                <li>Si M₁ acepta w, M acepta y se para.</li>
                <li>Si M₂ acepta w, M rechaza y se para.</li>
            </ul>
            <p>Como w ∈ L o w ∈ complemento(L), exactamente una de las dos simulaciones acepta. Luego M siempre para y L(M) = L. Por tanto, L es recursivo. ✷</p>
        `
    },

    // ========== TEOREMA 9.6 ==========
    {
        id: "9.6",
        texto: "L<sub>u</sub> = { (M, w) | M acepta w } es RE pero no recursivo.",
        pista: "L<sub>u</sub> es RE (se simula M con w y se acepta si para). No es recursivo porque si lo fuera, su complemento sería recursivo, y entonces se podría decidir L<sub>d</sub> (contradicción con Teorema 9.2).",
        clasificacion: "A",
        demostracion: `
            <p><strong>Demostración.</strong> L<sub>u</sub> es RE: existe una MT universal que simula M sobre w y acepta si M acepta.</p>
            <p>Supongamos que L<sub>u</sub> es recursivo. Entonces complemento(L<sub>u</sub>) es recursivo (Teorema 9.3). Construimos una MT que decide L<sub>d</sub>:</p>
            <ol>
                <li>Dada wᵢ, construye el par (Mᵢ, wᵢ).</li>
                <li>Usa la MT que decide complemento(L<sub>u</sub>) para saber si Mᵢ no acepta wᵢ.</li>
            </ol>
            <p>Esto decidiría L<sub>d</sub>, contradiciendo el Teorema 9.2. Luego L<sub>u</sub> no es recursivo. ✷</p>
        `
    }
];

window.DATOS = teoremas;
