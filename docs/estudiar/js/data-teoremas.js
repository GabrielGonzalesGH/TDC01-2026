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
        id: "1.22",
        texto: "Todas las expresiones regulares (y todas las expresiones en general) tienen el mismo número de paréntesis de apertura <code>(</code> que de cierre <code>)</code>.",
        pista: "Piensa en el balanceo de paréntesis y cómo se define la sintaxis. Se demuestra por inducción en la longitud de la expresión.",
        clasificacion: "C"
        // Nota: este no lleva demostración porque es bastante obvio, pero si la tuvieras, la pondrías aquí abajo.
    }

    // ==========================================================
    // AQUÍ AGREGARÁS EL RESTO DE TEOREMAS MANUALMENTE
    // ==========================================================
];

window.DATOS = teoremas;
