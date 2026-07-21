// ============================================================
// DATOS DE TEOREMAS (Hopcroft 3ra Edición)
// ============================================================
// Estructura de cada teorema:
//   id        : identificador único (ej. "1.22")
//   texto     : enunciado completo. Puede incluir HTML (tablas, símbolos, etc.)
//   pista     : pista corta que se muestra al hacer clic en "Mostrar pista"
//   clasificacion : "A", "B" o "C" (según importancia / dificultad)
// ============================================================

const teoremas = [
    {
        id: "1.22",
        texto: "Todas las expresiones regulares (y todas las expresiones en general) tienen el mismo número de paréntesis de apertura <code>(</code> que de cierre <code>)</code>.",
        pista: "Piensa en el balanceo de paréntesis y cómo se define la sintaxis.",
        clasificacion: "C"
    }

    // ==========================================================
    // AQUÍ AGREGARÁS EL RESTO DE TEOREMAS MANUALMENTE
    // Ejemplo adicional:
    // {
    //     id: "2.15",
    //     texto: "El lenguaje de los palíndromos sobre {a,b} no es regular.",
    //     pista: "Usa el lema de bombeo.",
    //     clasificacion: "A"
    // }
    // ==========================================================
];

// Exponer los datos globalmente para que engine.js los use
window.DATOS = teoremas;
