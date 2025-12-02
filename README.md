# Cifrado Hill – Proyecto Final

**Alumno:** Diego Ramírez Magaña  
**Grupo:** 1°C  
**Materia:** Fundamentos de Álgebra  

---

## 1. Descripción general del proyecto

Este proyecto implementa el algoritmo de **Cifrado Hill** usando una matriz clave de tamaño 2×2 y el alfabeto de 26 letras (A–Z).  
La aplicación está desarrollada como una página web sencilla donde el usuario puede:

- Escribir un mensaje en texto plano.
- Definir una matriz clave 2×2 con números enteros.
- **Cifrar** el mensaje usando la matriz.
- **Descifrar** un mensaje previamente cifrado, siempre que la matriz sea invertible módulo 26.
- Ver un detalle paso a paso de la conversión de letras a números y de la aplicación de la matriz.

La interfaz tiene un diseño inspirado en el estilo minimalista de Apple: fondo oscuro, tarjetas suaves, tipografía clara y botones redondeados.

---

## 2. Descripción del algoritmo implementado

El Cifrado Hill es un cifrado por bloques que utiliza **álgebra lineal** sobre aritmética modular.

### 2.1. Representación del mensaje

1. El usuario escribe un texto cualquiera (con o sin espacios, números o signos).
2. El programa:
   - Convierte todo a **mayúsculas**.
   - Elimina acentos y caracteres especiales.
   - Conserva únicamente letras A–Z.
3. Cada letra se asocia a un número:

   | Letra | Valor |
   |-------|-------|
   | A     | 0     |
   | B     | 1     |
   | ...   | ...   |
   | Z     | 25    |

4. El mensaje se agrupa en bloques de 2 letras.  
   - Si el número de letras es impar, se agrega una **X** al final para completar el último bloque.

### 2.2. Matriz clave

La clave es una matriz:

\[
K = \begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\]

con valores enteros.  
Para poder descifrar, es necesario que la matriz sea **invertible módulo 26** (es decir, que su determinante tenga inverso módulo 26).

---

## 3. Proceso de cifrado

Dado un bloque de dos letras, por ejemplo `HI`:

1. Se convierten las letras a números:  
   - H → 7  
   - I → 8  

   Formamos el vector columna:

   \[
   P = \begin{bmatrix} 7 \\ 8 \end{bmatrix}
   \]

2. Se aplica la matriz clave:

   \[
   C = K \cdot P \mod 26
   \]

   Es decir:

   \[
   C = 
   \begin{bmatrix}
   a & b \\
   c & d
   \end{bmatrix}
   \cdot
   \begin{bmatrix}
   7 \\
   8
   \end{bmatrix}
   \mod 26
   =
   \begin{bmatrix}
   a \cdot 7 + b \cdot 8 \\
   c \cdot 7 + d \cdot 8
   \end{bmatrix}
   \mod 26
   \]

3. Los resultados numéricos se vuelven a convertir a letras usando la tabla del alfabeto.

El programa realiza estos cálculos para todos los bloques de 2 letras y genera el texto cifrado.

---

## 4. Proceso de descifrado

Para descifrar, se necesita la **matriz inversa** de K módulo 26.

### 4.1. Cálculo del determinante

\[
\det(K) = ad - bc
\]

Luego se toma:

\[
\det(K) \mod 26
\]

Si `gcd(det(K), 26) ≠ 1`, la matriz **no tiene inverso** y no se puede descifrar con esa clave.

### 4.2. Inverso modular del determinante

Se busca un número `k` tal que:

\[
(\det(K) \cdot k) \mod 26 = 1
\]

Ese `k` es el **inverso modular** de la determinante.

### 4.3. Matriz inversa K⁻¹

La matriz inversa en aritmética modular es:

\[
K^{-1} = k \cdot
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
\mod 26
\]

El programa calcula esta matriz y luego, para cada bloque cifrado \( C \), aplica:

\[
P = K^{-1} \cdot C \mod 26
\]

para recuperar el texto original en números, que luego se convierte otra vez a letras.

---

## 5. Instrucciones de uso

1. Abrir la página `index.html` en el navegador o acceder al enlace desplegado (GitHub Pages / Netlify, etc.).
2. Escribir un mensaje en el cuadro **“Mensaje”**.
3. Ingresar la matriz clave 2×2 en los campos:
   - a = k11
   - b = k12
   - c = k21
   - d = k22
4. (Opcional) Presionar **“Usar matriz de ejemplo”** para cargar una clave válida.
5. Seleccionar:
   - **Cifrar** para generar un texto cifrado.
   - **Descifrar** para intentar recuperar el mensaje original.
6. Dar clic en **“Ejecutar operación”**.
7. En la parte de **Salida** se mostrará el resultado, y en **Detalle del proceso** se explican los pares y transformaciones.

---

## 6. Detalles sobre las matemáticas implementadas

- Se trabaja con aritmética módulo 26 (por las 26 letras del alfabeto).
- La función `mod()` en JavaScript se asegura de que el resultado sea positivo.
- El inverso modular del determinante se obtiene probando valores de 1 a 25 hasta encontrar uno que cumpla:

  \[
  (det \cdot x) \mod 26 = 1
  \]

- Si no se encuentra inverso modular, el programa muestra un mensaje de error y pide cambiar la matriz clave.

---

## 7. Personalización realizada

- Diseño de interfaz inspirado en el estilo **Apple**:
  - Fondo oscuro con degradado.
  - Tarjetas con bordes redondeados y sombras suaves.
  - Tipografía del sistema (-apple-system).
  - Botones redondeados con efecto de luz.
- Organización en paneles:
  - Mensaje y tipo de operación.
  - Matriz clave y recordatorio matemático.
  - Resultado y detalle del proceso.
- Mensajes de estado claros (éxito / error) para apoyar al usuario.

---

## 8. Tecnologías utilizadas

- **HTML5**: estructura de la aplicación.
- **CSS3**: estilos, diseño responsivo y apariencia visual.
- **JavaScript**: lógica del cifrado y descifrado, manejo del DOM y validaciones.

---

## 9. Posibles mejoras futuras

- Permitir elegir diferentes alfabetos (por ejemplo, incluir la Ñ o espacios).
- Soportar matrices de tamaño 3×3 para operar con bloques más grandes.
- Agregar pruebas automáticas con ejemplos conocidos.
- Incluir un modo “paso a paso” donde el usuario avance bloque por bloque.

---

## 10. Referencias

- Hill, L. S. (1929). *Cryptography in an Algebraic Alphabet*.  
- Documentación de MDN Web Docs sobre JavaScript y aritmética modular.  
- Material de clase de **Fundamentos de Álgebra** sobre matrices, determinante e inversa.
