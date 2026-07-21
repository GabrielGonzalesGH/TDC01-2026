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
}
    // ==========================================================
    // AQUÍ AGREGARÁS EL RESTO DE TEOREMAS MANUALMENTE
    // ==========================================================
];

window.DATOS = teoremas;
