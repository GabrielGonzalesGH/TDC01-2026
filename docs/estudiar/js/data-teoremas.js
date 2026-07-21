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
    {
    id: "2.11",
    texto: "Si D = (Q<sub>D</sub>, Σ, δ<sub>D</sub>, {q<sub>0</sub>}, F<sub>D</sub>) es el AFD construido a partir del AFN N = (Q<sub>N</sub>, Σ, δ<sub>N</sub>, q<sub>0</sub>, F<sub>N</sub>) mediante la construcción de subconjuntos, entonces L(D) = L(N).",
    pista: "Demostración por inducción sobre |w|, probando que δ<sub>D</sub>({q<sub>0</sub>}, w) = δ<sub>N</sub>(q<sub>0</sub>, w).",
    clasificacion: "A", // Esencial, porque es el teorema que valida la construcción de subconjuntos
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
    }
];

window.DATOS = teoremas;
