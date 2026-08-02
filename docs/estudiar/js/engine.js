// ================================================================
// ENGINE DE ESTUDIO (con toggle deslizante)
// ================================================================

(function() {
    "use strict";

    const STORAGE_KEY = 'estudio_teoremas_progreso';
    const DATA = window.DATOS;

    if (!DATA || DATA.length === 0) {
        document.getElementById('cardContainer').innerHTML = `
            <div class="card-error">
                ⚠️ No hay teoremas cargados. Revisa el archivo <code>data-teoremas.js</code>.
            </div>`;
        return;
    }

    let cardsFiltradas = [];
    let indiceActual = 0;
    let progreso = {};

    const contenedor = document.getElementById('cardContainer');
    const filtroSelect = document.getElementById('filtroClasificacion');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const progresoTexto = document.getElementById('progresoTexto');
    const progresoBarra = document.getElementById('progresoBarra');
    const contadorCards = document.getElementById('contadorCards');

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

    function aplicarFiltro() {
        const valor = filtroSelect.value;
        cardsFiltradas = valor === 'all' ? DATA.slice() : DATA.filter(t => t.clasificacion === valor);

        if (cardsFiltradas.length === 0) {
            contenedor.innerHTML = `<div class="card-empty">😅 No hay teoremas con clasificación ${valor}.</div>`;
            contadorCards.textContent = '0 teoremas';
            btnAnterior.disabled = true;
            btnSiguiente.disabled = true;
            actualizarProgreso();
            return;
        }

        btnAnterior.disabled = false;
        btnSiguiente.disabled = false;

        if (indiceActual >= cardsFiltradas.length) indiceActual = cardsFiltradas.length - 1;
        if (indiceActual < 0) indiceActual = 0;

        renderCard();
        actualizarProgreso();
    }

    function renderCard() {
        if (cardsFiltradas.length === 0) return;

        const card = cardsFiltradas[indiceActual];
        const sabido = estaSabido(card.id);
        const tieneDemo = card.demostracion && card.demostracion.trim() !== '';

        const html = `
            <div class="card-body ${sabido ? 'card-sabido' : ''}">
                <div class="card-id">
                    <span class="id-text">Teorema ${card.id}</span>
                    <span class="badge ${card.clasificacion}">${card.clasificacion}</span>
                    <!-- Switch deslizante -->
                    <label class="switch" title="Marcar como aprendido / No aprendido">
                        <input type="checkbox" class="switch-input" data-id="${card.id}" ${sabido ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div class="card-hint-area">
                    <button class="btn-study btn-hint" data-toggle="pista">💡 Mostrar pista</button>
                    <div class="card-pista" style="display: none;">
                        <strong>Pista:</strong> ${card.pista || 'No hay pista disponible.'}
                    </div>
                </div>

                <div class="card-solution-area">
                    <button class="btn-study btn-solution" data-toggle="solucion">📖 Mostrar solución</button>
                    <div class="card-solucion" style="display: none;">
                        <div class="solucion-contenido">${card.texto}</div>
                    </div>
                </div>

                ${tieneDemo ? `
                <div class="card-proof-area">
                    <button class="btn-study btn-proof" data-toggle="demo">📝 Mostrar demostración</button>
                    <div class="card-demostracion" style="display: none;">
                        <strong>Demostración:</strong>
                        <div class="demo-contenido">${card.demostracion}</div>
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        contenedor.innerHTML = html;
        contadorCards.textContent = `Card ${indiceActual + 1} / ${cardsFiltradas.length}`;

        // ---- Eventos ----
        // Switch (toggle sabido)
        const switchInput = document.querySelector('.switch-input');
        if (switchInput) {
            switchInput.addEventListener('change', function(e) {
                const id = this.dataset.id;
                toggleSabido(id);
                // Actualizar el badge y el estilo de la card (sin recargar toda la card)
                // Simplemente volvemos a renderizar para que se vea el cambio
                renderCard();
                actualizarProgreso();
            });
        }

        // Botones de pista, solución, demo
        document.querySelectorAll('[data-toggle]').forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.dataset.toggle;
                let div;
                if (target === 'pista') div = this.parentElement.querySelector('.card-pista');
                else if (target === 'solucion') div = this.parentElement.querySelector('.card-solucion');
                else if (target === 'demo') div = this.parentElement.querySelector('.card-demostracion');
                if (div) {
                    if (div.style.display === 'none') {
                        div.style.display = 'block';
                        this.textContent = this.textContent.replace('Mostrar', 'Ocultar');
                    } else {
                        div.style.display = 'none';
                        this.textContent = this.textContent.replace('Ocultar', 'Mostrar');
                    }
                }
            });
        });
    }

    function actualizarProgreso() {
        const total = cardsFiltradas.length;
        if (total === 0) {
            progresoTexto.textContent = '0 / 0 aprendidos';
            progresoBarra.style.width = '0%';
            return;
        }
        let aprendidos = cardsFiltradas.filter(c => estaSabido(c.id)).length;
        const porcentaje = Math.round((aprendidos / total) * 100);
        progresoTexto.textContent = `${aprendidos} / ${total} aprendidos`;
        progresoBarra.style.width = porcentaje + '%';
    }

    function irAleatorio() {
        if (cardsFiltradas.length <= 1) return;
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

    // Inicialización
    function init() {
        cargarProgreso();
        filtroSelect.addEventListener('change', () => { indiceActual = 0; aplicarFiltro(); });
        btnAnterior.addEventListener('click', irAnterior);
        btnSiguiente.addEventListener('click', irAleatorio);
        aplicarFiltro();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
