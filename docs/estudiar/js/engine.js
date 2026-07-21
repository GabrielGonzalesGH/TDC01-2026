// ================================================================
// ENGINE DE ESTUDIO (reutilizable para teoremas, definiciones, etc.)
// ================================================================
// Depende de:
//   - window.DATOS : array de objetos con {id, texto, pista, clasificacion}
//   - localStorage con clave "estudio_PROGRESO" (se setea automáticamente)
// ================================================================

(function() {
    "use strict";

    // ---------- CONFIGURACIÓN ----------
    const STORAGE_KEY = 'estudio_teoremas_progreso'; // clave en Local Storage
    const DATA = window.DATOS;

    // Verificar que existan datos
    if (!DATA || DATA.length === 0) {
        document.getElementById('cardContainer').innerHTML = `
            <div class="card-error">
                ⚠️ No hay teoremas cargados. Revisa el archivo <code>data-teoremas.js</code>.
            </div>`;
        return;
    }

    // ---------- ESTADO ----------
    let cardsFiltradas = [];        // subconjunto según filtro
    let indiceActual = 0;          // índice dentro de cardsFiltradas
    let progreso = {};             // { id: { sabido: true/false } }

    // Referencias a elementos DOM
    const contenedor = document.getElementById('cardContainer');
    const filtroSelect = document.getElementById('filtroClasificacion');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnMarcar = document.getElementById('btnMarcarSabido');
    const progresoTexto = document.getElementById('progresoTexto');
    const progresoBarra = document.getElementById('progresoBarra');
    const contadorCards = document.getElementById('contadorCards');

    // ---------- FUNCIONES AUXILIARES ----------
    function cargarProgreso() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            progreso = raw ? JSON.parse(raw) : {};
        } catch (e) {
            progreso = {};
        }
    }

    function guardarProgreso() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
    }

    function estaSabido(id) {
        return progreso[id] && progreso[id].sabido === true;
    }

    function toggleSabido(id) {
        if (!progreso[id]) progreso[id] = {};
        progreso[id].sabido = !progreso[id].sabido;
        guardarProgreso();
    }

    // Aplicar filtro y actualizar la lista
    function aplicarFiltro() {
        const valor = filtroSelect.value;
        if (valor === 'all') {
            cardsFiltradas = DATA.slice();
        } else {
            cardsFiltradas = DATA.filter(t => t.clasificacion === valor);
        }

        // Si no hay cards con ese filtro, mostrar mensaje
        if (cardsFiltradas.length === 0) {
            contenedor.innerHTML = `
                <div class="card-empty">
                    😅 No hay teoremas con clasificación ${valor}.
                </div>`;
            contadorCards.textContent = `0 teoremas`;
            btnAnterior.disabled = true;
            btnSiguiente.disabled = true;
            btnMarcar.disabled = true;
            actualizarProgreso();
            return;
        }

        // Habilitar botones
        btnAnterior.disabled = false;
        btnSiguiente.disabled = false;
        btnMarcar.disabled = false;

        // Asegurar que el índice sea válido
        if (indiceActual >= cardsFiltradas.length) {
            indiceActual = cardsFiltradas.length - 1;
        }
        if (indiceActual < 0) indiceActual = 0;

        renderCard();
        actualizarProgreso();
    }

    // Renderizar la card actual
    // ---------- Renderizar la card actual (VERSIÓN CON DEMOSTRACIÓN) ----------
function renderCard() {
    if (cardsFiltradas.length === 0) return;

    const card = cardsFiltradas[indiceActual];
    const sabido = estaSabido(card.id);
    const tieneDemo = card.demostracion && card.demostracion.trim() !== '';

    // Construir HTML de la card
    const html = `
        <div class="card-body ${sabido ? 'card-sabido' : ''}">
            <div class="card-id">
                <span class="id-text">Teorema ${card.id}</span>
                <span class="badge ${card.clasificacion}">${card.clasificacion}</span>
                ${sabido ? '<span class="badge-sabido">✅ Aprendido</span>' : ''}
            </div>

            <div class="card-hint-area">
                <button id="btnMostrarPista" class="btn-study btn-hint">💡 Mostrar pista</button>
                <div id="pistaDiv" class="card-pista" style="display: none;">
                    <strong>Pista:</strong> ${card.pista || 'No hay pista disponible.'}
                </div>
            </div>

            <div class="card-solution-area">
                <button id="btnMostrarSolucion" class="btn-study btn-solution">📖 Mostrar solución</button>
                <div id="solucionDiv" class="card-solucion" style="display: none;">
                    <div class="solucion-contenido">
                        ${card.texto}
                    </div>
                </div>
            </div>

            ${tieneDemo ? `
            <div class="card-proof-area">
                <button id="btnMostrarDemo" class="btn-study btn-proof">📝 Mostrar demostración</button>
                <div id="demoDiv" class="card-demostracion" style="display: none;">
                    <strong>Demostración:</strong>
                    <div class="demo-contenido">
                        ${card.demostracion}
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    contenedor.innerHTML = html;

    // Actualizar contador
    contadorCards.textContent = `Card ${indiceActual + 1} / ${cardsFiltradas.length}`;

    // ---- Eventos de los botones dentro de la card ----
    const btnPista = document.getElementById('btnMostrarPista');
    const pistaDiv = document.getElementById('pistaDiv');
    const btnSolucion = document.getElementById('btnMostrarSolucion');
    const solucionDiv = document.getElementById('solucionDiv');
    const btnDemo = document.getElementById('btnMostrarDemo');
    const demoDiv = document.getElementById('demoDiv');

    if (btnPista && pistaDiv) {
        btnPista.addEventListener('click', function() {
            if (pistaDiv.style.display === 'none') {
                pistaDiv.style.display = 'block';
                btnPista.textContent = '🙈 Ocultar pista';
            } else {
                pistaDiv.style.display = 'none';
                btnPista.textContent = '💡 Mostrar pista';
            }
        });
    }

    if (btnSolucion && solucionDiv) {
        btnSolucion.addEventListener('click', function() {
            if (solucionDiv.style.display === 'none') {
                solucionDiv.style.display = 'block';
                btnSolucion.textContent = '🔒 Ocultar solución';
            } else {
                solucionDiv.style.display = 'none';
                btnSolucion.textContent = '📖 Mostrar solución';
            }
        });
    }

    if (btnDemo && demoDiv) {
        btnDemo.addEventListener('click', function() {
            if (demoDiv.style.display === 'none') {
                demoDiv.style.display = 'block';
                btnDemo.textContent = '🔒 Ocultar demostración';
            } else {
                demoDiv.style.display = 'none';
                btnDemo.textContent = '📝 Mostrar demostración';
            }
        });
    }

    // Actualizar estado del botón "Marcar sabido"
    btnMarcar.textContent = sabido ? '❌ Marcar como NO sabido' : '✅ Marcar como sabido';
    btnMarcar.classList.toggle('btn-sabido-activo', sabido);
}
    // Actualizar barra de progreso y texto
    function actualizarProgreso() {
        const total = cardsFiltradas.length;
        if (total === 0) {
            progresoTexto.textContent = '0 / 0 aprendidos';
            progresoBarra.style.width = '0%';
            return;
        }

        let aprendidos = 0;
        cardsFiltradas.forEach(c => {
            if (estaSabido(c.id)) aprendidos++;
        });

        const porcentaje = Math.round((aprendidos / total) * 100);
        progresoTexto.textContent = `${aprendidos} / ${total} aprendidos`;
        progresoBarra.style.width = porcentaje + '%';
    }

function irAleatorio() {
    console.log("Botón Siguiente pulsado. Cards filtradas:", cardsFiltradas.length);
    if (cardsFiltradas.length <= 1) {
        console.warn("No hay suficientes teoremas para cambiar.");
        return;
    }
    let nuevoIndice;
    do {
        nuevoIndice = Math.floor(Math.random() * cardsFiltradas.length);
    } while (nuevoIndice === indiceActual && cardsFiltradas.length > 1);
    indiceActual = nuevoIndice;
    renderCard();
}

    // Cambiar a anterior / siguiente
    function irAnterior() {
        if (cardsFiltradas.length === 0) return;
        indiceActual = (indiceActual - 1 + cardsFiltradas.length) % cardsFiltradas.length;
        renderCard();
    }

    function irSiguiente() {
        if (cardsFiltradas.length === 0) return;
        // Si estamos en la última, vamos a la primera
        indiceActual = (indiceActual + 1) % cardsFiltradas.length;
        renderCard();
    }

    // ---------- INICIALIZACIÓN ----------
    function init() {
        cargarProgreso();

        // Eventos
        filtroSelect.addEventListener('change', function() {
            indiceActual = 0; // resetear al primer elemento del nuevo filtro
            aplicarFiltro();
        });

        btnAnterior.addEventListener('click', irAnterior);
        btnSiguiente.addEventListener('click', irSiguiente);
        // El botón "Siguiente" también puede ser aleatorio, pero el usuario pidió "Siguiente" como navegación secuencial.
        // No obstante, el botón dice "🎲 Siguiente" en el HTML, lo dejamos como aleatorio por la flecha y la música.
        // Le damos doble funcionalidad: si no hay filtro, puede ser aleatorio. Pero mejor lo dejamos como "Siguiente" secuencial.
        // Pero el usuario pidió "Siguiente" (random). Cambio el listener para que sea aleatorio, pero manteniendo el botón "Anterior" secuencial.
        // El usuario dijo "Siguiente" en el plan, pero en la interfaz puse "🎲 Siguiente". Voy a hacer que haga random.
        btnSiguiente.addEventListener('click', irAleatorio);

        btnMarcar.addEventListener('click', function() {
            if (cardsFiltradas.length === 0) return;
            const card = cardsFiltradas[indiceActual];
            toggleSabido(card.id);
            renderCard();    // actualiza la card (muestra el badge de sabido)
            actualizarProgreso(); // actualiza barra
        });

        // Aplicar filtro inicial (todos)
        aplicarFiltro();
    }

    // Arrancar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
