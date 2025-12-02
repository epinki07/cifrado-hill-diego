// Alfabeto usado (26 letras, sin Ñ)
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Utilidad para módulo positivo
function mod(n, m) {
    return ((n % m) + m) % m;
}

// Convierte texto a solo letras A-Z en mayúsculas
function limpiarTexto(texto) {
    return texto
        .toUpperCase()
        .normalize("NFD") // quita tildes
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z]/g, "");
}

// Convierte texto en pares numéricos [x, y]
function textoAPares(texto) {
    const limpio = limpiarTexto(texto);
    let procesado = limpio;

    // Si hay número impar de letras, rellenamos con X
    if (procesado.length % 2 === 1) {
        procesado += "X";
    }

    const pares = [];
    for (let i = 0; i < procesado.length; i += 2) {
        const a = ALFABETO.indexOf(procesado[i]);
        const b = ALFABETO.indexOf(procesado[i + 1]);
        pares.push([a, b]);
    }
    return { pares, textoProcesado: procesado };
}

// Convierte pares numéricos a texto
function paresATexto(pares) {
    let resultado = "";
    for (const [x, y] of pares) {
        resultado += ALFABETO[x] + ALFABETO[y];
    }
    return resultado;
}

// Calcula inverso modular de a (mod 26)
function inversoModular(a, m = 26) {
    a = mod(a, m);
    for (let x = 1; x < m; x++) {
        if (mod(a * x, m) === 1) return x;
    }
    return null;
}

// Obtiene matriz clave desde inputs
function obtenerMatrizClave() {
    const k11 = parseInt(document.getElementById("k11").value, 10);
    const k12 = parseInt(document.getElementById("k12").value, 10);
    const k21 = parseInt(document.getElementById("k21").value, 10);
    const k22 = parseInt(document.getElementById("k22").value, 10);

    if ([k11, k12, k21, k22].some(v => Number.isNaN(v))) {
        throw new Error("Completa todos los valores de la matriz clave.");
    }

    return { k11, k12, k21, k22 };
}

// Cifra usando Hill 2x2
function cifrarHill(texto, matriz) {
    const { k11, k12, k21, k22 } = matriz;
    const { pares, textoProcesado } = textoAPares(texto);
    const paresCifrados = [];

    for (const [x, y] of pares) {
        const cx = mod(k11 * x + k12 * y, 26);
        const cy = mod(k21 * x + k22 * y, 26);
        paresCifrados.push([cx, cy]);
    }

    return {
        textoOriginalProcesado: textoProcesado,
        resultado: paresATexto(paresCifrados),
        paresOriginales: pares,
        paresTransformados: paresCifrados
    };
}

// Descifra usando Hill 2x2
function descifrarHill(textoCifrado, matriz) {
    const { k11, k12, k21, k22 } = matriz;
    const { pares, textoProcesado } = textoAPares(textoCifrado);

    // determinante
    const det = k11 * k22 - k12 * k21;
    const detMod = mod(det, 26);
    const invDet = inversoModular(detMod);

    if (invDet === null) {
        throw new Error(
            "La matriz clave no es invertible módulo 26. Cambia los valores."
        );
    }

    // Matriz inversa K^-1 = (1/det) * [[d, -b], [-c, a]] (mod 26)
    const a = mod(invDet * k22, 26);
    const b = mod(invDet * -k12, 26);
    const c = mod(invDet * -k21, 26);
    const d = mod(invDet * k11, 26);

    const paresDescifrados = [];
    for (const [x, y] of pares) {
        const px = mod(a * x + b * y, 26);
        const py = mod(c * x + d * y, 26);
        paresDescifrados.push([px, py]);
    }

    return {
        textoOriginalProcesado: textoProcesado,
        resultado: paresATexto(paresDescifrados),
        paresOriginales: pares,
        paresTransformados: paresDescifrados,
        det,
        detMod,
        invDet,
        matrizInversa: { a, b, c, d }
    };
}

// Actualiza contador de caracteres
function actualizarContador() {
    const area = document.getElementById("mensaje");
    const count = document.getElementById("charCount");
    count.textContent = `${area.value.length} / ${area.maxLength}`;
}

// Muestra detalle paso a paso
function mostrarDetalleCifrado(info, esDescifrado, extras = null) {
    const detalle = document.getElementById("detalle");
    let texto = "";

    texto += `Texto procesado: ${info.textoOriginalProcesado}\n\n`;

    if (esDescifrado && extras) {
        texto += `det(K) = ${extras.det}\n`;
        texto += `det(K) mod 26 = ${extras.detMod}\n`;
        texto += `inv(det) mod 26 = ${extras.invDet}\n`;
        texto += `K⁻¹ (mod 26) =\n`;
        texto += `  [ ${extras.matrizInversa.a}  ${extras.matrizInversa.b} ]\n`;
        texto += `  [ ${extras.matrizInversa.c}  ${extras.matrizInversa.d} ]\n\n`;
    }

    texto += esDescifrado ? "Pares (cifrado → claro):\n" : "Pares (claro → cifrado):\n";

    for (let i = 0; i < info.paresOriginales.length; i++) {
        const [x1, y1] = info.paresOriginales[i];
        const [x2, y2] = info.paresTransformados[i];

        const parOriginal = ALFABETO[x1] + ALFABETO[y1];
        const parNuevo = ALFABETO[x2] + ALFABETO[y2];

        texto += `  ${parOriginal} → (${x1}, ${y1})  ==>  (${x2}, ${y2}) → ${parNuevo}\n`;
    }

    detalle.textContent = texto;
}

// Manejo de eventos
document.addEventListener("DOMContentLoaded", () => {
    const mensaje = document.getElementById("mensaje");
    const btnProcesar = document.getElementById("btnProcesar");
    const btnEjemplo = document.getElementById("btnEjemplo");
    const resultado = document.getElementById("resultado");
    const status = document.getElementById("status");

    mensaje.addEventListener("input", actualizarContador);
    actualizarContador();

    btnEjemplo.addEventListener("click", () => {
        document.getElementById("k11").value = 3;
        document.getElementById("k12").value = 3;
        document.getElementById("k21").value = 2;
        document.getElementById("k22").value = 5;
        status.textContent = "Matriz de ejemplo cargada (invertible mod 26).";
        status.className = "status-text ok";
    });

    btnProcesar.addEventListener("click", () => {
        status.textContent = "";
        status.className = "status-text";
        resultado.value = "";
        document.getElementById("detalle").textContent = "// Procesando...";

        const textoUsuario = mensaje.value.trim();
        if (!textoUsuario) {
            status.textContent = "Escribe un mensaje antes de continuar.";
            status.classList.add("error");
            document.getElementById("detalle").textContent = "// Esperando datos...";
            return;
        }

        let accion = "cifrar";
        const radios = document.querySelectorAll('input[name="accion"]');
        radios.forEach(r => {
            if (r.checked) accion = r.value;
        });

        try {
            const matriz = obtenerMatrizClave();

            if (accion === "cifrar") {
                const info = cifrarHill(textoUsuario, matriz);
                resultado.value = info.resultado;
                mostrarDetalleCifrado(info, false);
                status.textContent = "Mensaje cifrado correctamente.";
                status.classList.add("ok");
            } else {
                const info = descifrarHill(textoUsuario, matriz);
                resultado.value = info.resultado;
                mostrarDetalleCifrado(info, true, info);
                status.textContent = "Mensaje descifrado correctamente.";
                status.classList.add("ok");
            }
        } catch (err) {
            status.textContent = err.message;
            status.classList.add("error");
            document.getElementById("detalle").textContent = "// Error: " + err.message;
        }
    });
});
