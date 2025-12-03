// script.js
document.addEventListener("DOMContentLoaded", () => {
    const mensajeEl   = document.getElementById("mensaje");
    const resultadoEl = document.getElementById("resultado");
    const detalleEl   = document.getElementById("detalle");
    const statusEl    = document.getElementById("status");
    const charCountEl = document.getElementById("charCount");
    const btnProcesar = document.getElementById("btnProcesar");
    const btnEjemplo  = document.getElementById("btnEjemplo");

    const k11El = document.getElementById("k11");
    const k12El = document.getElementById("k12");
    const k21El = document.getElementById("k21");
    const k22El = document.getElementById("k22");

    const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Contador de caracteres
    mensajeEl.addEventListener("input", () => {
        charCountEl.textContent = `${mensajeEl.value.length} / 160`;
    });

    // Botón de matriz de ejemplo (invertible mod 26)
    btnEjemplo.addEventListener("click", () => {
        k11El.value = 3;
        k12El.value = 3;
        k21El.value = 2;
        k22El.value = 5;
    });

    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    function normalizarTexto(txt) {
        // Mayúsculas, sin tildes, sólo A-Z
        return txt
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // quita acentos
            .replace(/[^A-Z]/g, "");
    }

    function textoANumeros(txt) {
        return [...txt].map(ch => ALFABETO.indexOf(ch));
    }

    function numerosATexto(nums) {
        return nums.map(n => ALFABETO[mod(n, 26)]).join("");
    }

    function obtenerMatrizClave() {
        const a = parseInt(k11El.value, 10);
        const b = parseInt(k12El.value, 10);
        const c = parseInt(k21El.value, 10);
        const d = parseInt(k22El.value, 10);

        if ([a, b, c, d].some(v => isNaN(v))) {
            throw new Error("Completa todos los valores de la matriz clave.");
        }

        return [
            [mod(a, 26), mod(b, 26)],
            [mod(c, 26), mod(d, 26)]
        ];
    }

    function determinanteMod26(K) {
        const det = K[0][0] * K[1][1] - K[0][1] * K[1][0];
        return mod(det, 26);
    }

    function inversoMod26(x) {
        x = mod(x, 26);
        for (let i = 1; i < 26; i++) {
            if (mod(x * i, 26) === 1) return i;
        }
        throw new Error("La matriz no es invertible mod 26 (det no tiene inverso).");
    }

    function matrizInversaMod26(K) {
        const det = determinanteMod26(K);
        const invDet = inversoMod26(det);

        const [[a, b], [c, d]] = K;

        // K⁻¹ = det⁻¹ * [ d  -b
        //                 -c  a ] (mod 26)
        const inv = [
            [mod(d * invDet, 26), mod(-b * invDet, 26)],
            [mod(-c * invDet, 26), mod(a * invDet, 26)]
        ];

        return inv;
    }

    function multiplicarMatrizVector(K, v) {
        // K 2x2 * v 2x1
        return [
            mod(K[0][0] * v[0] + K[0][1] * v[1], 26),
            mod(K[1][0] * v[0] + K[1][1] * v[1], 26)
        ];
    }

    function procesar() {
        statusEl.textContent = "";
        detalleEl.textContent = "";

        let texto = mensajeEl.value;

        if (!texto.trim()) {
            statusEl.textContent = "Escribe un mensaje primero.";
            return;
        }

        const accion = document.querySelector('input[name="accion"]:checked').value; // <- IMPORTANTE

        texto = normalizarTexto(texto);

        if (texto.length === 0) {
            statusEl.textContent = "Después de limpiar el texto no quedaron letras A–Z.";
            return;
        }

        // Rellenar con X si la longitud es impar
        if (texto.length % 2 !== 0) {
            texto += "X";
        }

        const numeros = textoANumeros(texto);

        let K;
        try {
            K = obtenerMatrizClave();
        } catch (e) {
            statusEl.textContent = e.message;
            return;
        }

        let K_usada = K;
        let info = "";

        info += `Texto limpio: ${texto}\n`;
        info += `Vector numérico: [${numeros.join(", ")}]\n\n`;
        info += `Matriz clave K:\n[${K[0][0]}  ${K[0][1]}]\n[${K[1][0]}  ${K[1][1]}]\n\n`;

        try {
            if (accion === "descifrar") {
                // Para DESCIFRAR usamos la inversa de K
                K_usada = matrizInversaMod26(K);
                info += "Operación: DESCIFRAR\n";
                info += "Matriz usada (K⁻¹ mod 26):\n";
                info += `[${K_usada[0][0]}  ${K_usada[0][1]}]\n`;
                info += `[${K_usada[1][0]}  ${K_usada[1][1]}]\n\n`;
            } else {
                info += "Operación: CIFRAR\n";
                info += "Matriz usada (K):\n";
                info += `[${K_usada[0][0]}  ${K_usada[0][1]}]\n`;
                info += `[${K_usada[1][0]}  ${K_usada[1][1]}]\n\n`;
            }
        } catch (e) {
            statusEl.textContent = e.message;
            detalleEl.textContent = info;
            return;
        }

        const resultadoNums = [];
        info += "Bloques de cálculo (en pares):\n";

        for (let i = 0; i < numeros.length; i += 2) {
            const bloque = [numeros[i], numeros[i + 1]];
            const prod = multiplicarMatrizVector(K_usada, bloque);

            info += `(${bloque[0]}, ${bloque[1]}) -> (${prod[0]}, ${prod[1]})\n`;

            resultadoNums.push(...prod);
        }

        const textoResultado = numerosATexto(resultadoNums);

        resultadoEl.value = textoResultado;
        detalleEl.textContent = info;

        statusEl.textContent = accion === "cifrar"
            ? "Mensaje cifrado correctamente."
            : "Mensaje descifrado correctamente (si la matriz era la adecuada).";
    }

    btnProcesar.addEventListener("click", procesar);
});
