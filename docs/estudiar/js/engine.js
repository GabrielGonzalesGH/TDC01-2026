// ================================================================
// ENGINE DE ESTUDIO (con toggle switch deslizante)
// ================================================================

(function() {
    "use strict";

    // ---------- CONFIGURACIÓN ----------
    const STORAGE_KEY = 'estudio_teoremas_progreso';
    const DATA = window.DATOS;

    if (!DATA || DATA.length === 0) {
        document.getElementById('cardContainer').innerHTML = `
            <div class="card-error">
                ⚠️ No hay teoremas cargados. Revisa el archivo <code>data-teoremas.js</code>.
            </div>`;
        return;
    }

    // ---------- ESTADO ----------
    let cardsFiltradas = [];
    let indiceActual = 0;
    let progreso = {};

    // Referencias DOM
    const contenedor = document.getElementById('cardContainer');
    const filtroSelect = document.getElementById('filtroClasificacion');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const switchSabido = document.getElementById('switchSabido');
    const switchLabel = document.getElementById('switchLabel');
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

    // Actualizar el switch y su etiqueta según el estado actual
    function actualizarSwitch(id) {
        const sabido = estaSabido(id);
        switchSabido.checked = sabido;
        switchLabel.textContent = sabido ? '✅ Sabido' : '❌ No sabido';
        switchLabel.classList.toggle('sabido', sabido);
    }

    // Aplicar filtro
    function aplicarFiltro() {
        const valor = filtroSelect.value;
        if (valor === 'all') {
            cardsFiltradas = DATA.slice();
        } else {
            cardsFiltradas = DATA.filter(t => t.clasificacion === valor);
        }

        if (cardsFiltradas.length === 0) {
            contenedor.innerHTML = `
                <div class="card-empty">
                    😅 No hay teoremas con clasificación ${valor}.
                </div>`;
            contadorCards.textContent = `0 teoremas`;
            btnAnterior.disabled = true;
            btnSiguiente.disabled = true;
            switchSabido.disabled = true;
            actualizarProgreso();
            return;
        }

        btnAnterior.disabled = false;
        btnSiguiente.disabled = false;
        switchSabido.disabled = false;

        if (indiceActual >= cardsFiltradas.length) {
            indiceActual = cardsFiltradas.length - 1;
        }
        if (indiceActual < 0) indiceActual = 0;

        renderCard();
        actualizarProgreso();
    }

    // Renderizar la card
    function renderCard() {
        if (cardsFiltradas.length === 0) return;

        const card = cardsFiltradas[indiceActual];
        const sabido = estaSabido(card.id);
        const tieneDemo = card.demostracion && card.demostracion.trim() !== '';

        // Actualizar el switch (fuera de la card)
        actualizarSwitch(card.id);

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
        contadorCards.textContent = `Card ${indiceActual + 1} / ${cardsFiltradas.length}`;

        // Eventos de los botones internos (pista, solución, demo)
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
    }

    // Actualizar barra de progreso
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

    // Navegación
    function irAleatorio() {
        if (cardsFiltradas.length <= 1) {
            const aviso = document.createElement('div');
            aviso.className = 'aviso-sin-teoremas';
            aviso.textContent = '📭 No hay más teoremas en esta lista. Agrega más o cambia el filtro.';
            contenedor.prepend(aviso);
            setTimeout(() => aviso.remove(), 3000);
            return;
        }
        let nuevoIndice;
        do {
            nuevoIndice = Math.floor(Math.random() * cardsFiltradas.length);
        } while (nuevoIndice === indiceActual && cardsFiltradas.length > 1);
        indiceActual = nuevoIndice;
        renderCard();
    }

    function irAnterior() {
        if (cardsFiltradas.length === 0) return;
        indiceActual = (indiceActual - 1 + cardsFiltradas.length) % cardsFiltradas.length;
        renderCard();
    }

    // ---------- INICIALIZACIÓN ----------
    function init() {
        cargarProgreso();

        filtroSelect.addEventListener('change', function() {
            indiceActual = 0;
            aplicarFiltro();
        });

        btnAnterior.addEventListener('click', irAnterior);
        btnSiguiente.addEventListener('click', irAleatorio);

        // Evento del switch: cuando se DESLIZA, cambia el estado
        switchSabido.addEventListener('change', function() {
            if (cardsFiltradas.length === 0) return;
            const card = cardsFiltradas[indiceActual];
            toggleSabido(card.id);
            renderCard();           // actualiza la card (badge y estilo)
            actualizarProgreso();   // actualiza barra de progreso
            actualizarSwitch(card.id); // actualiza etiqueta del switch
        });

        aplicarFiltro();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
