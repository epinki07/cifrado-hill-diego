# Cifrado Hill – Proyecto Final

**Alumno:** Diego Ramírez Magaña  
**Grupo:** 1°C  
**Materia:** Fundamentos de Álgebra  

---

# 1. Descripción general del proyecto

Este proyecto implementa el **Cifrado Hill** utilizando una matriz clave de tamaño 2×2 y el alfabeto de 26 letras (A–Z).  
El usuario puede:

-
- Ingresar la matriz clave 2×2.
- **Cifrar** el mensaje.
- **Descifrar** el mensaje usando la matriz inversa.
- Visualizar un **detalle paso a paso** del proceso matemático.

El diseño de la interfaz se personalizó con un estilo moderno:  
fondos oscuros, bordes redondeados, tipografía clara y una estructura elegante visualmente.

---

# 2. Descripción del algoritmo implementado

## 2.1. Conversión de texto


1. Se convierte a **mayúsculas**.
2. Se eliminan tildes.
3. Se descartan caracteres no válidos (solo se aceptan A–Z).
4. Cada letra se convierte a número:

| Letra | Valor |
|-------|-------|
| A     | 0     |
| B     | 1     |
| ...   | ...   |
| Z     | 25    |


5. El mensaje se divide en **pares de dos letras**.  
   - Si es impar, se agrega una **X** al final para completar el último bloque.

---

## 2.2. Matriz clave

El cifrado utiliza una matriz de clave:

K =

| a   b |
| c   d |



Los valores deben permitir que la matriz sea **invertible módulo 26**, de lo contrario no se puede descifrar.

---

# 3. Proceso de cifrado

Dado un par de letras, por ejemplo: `HI`

1. Se convierten las letras en números:
   - H → 7
   - I → 8

El vector queda:

P =

| 7 |
| 8 |


2. Se aplica la transformación:

C = K · P mod 26

⎡ a   b ⎤   ⎡ 7 ⎤
⎣ c   d ⎦ * ⎣ 8 ⎦   mod 26



3. El resultado numérico se convierte de nuevo a letras usando la tabla A–Z.

El programa realiza esta operación para todos los pares del mensaje.

---

# 4. Proceso de descifrado

Para descifrar, se calcula la **matriz inversa** de K módulo 26.

---

## 4.1. Cálculo del determinante

det(K) = ad - bc


Luego:

det(K) mod 26


Si:

gcd(det(K), 26) ≠ 1



la matriz **no tiene inverso** módulo 26 y no se puede descifrar.

---

## 4.2. Inverso modular del determinante

Se busca un número `k` que cumpla:

(det(K) * k) mod 26 = 1


Ese valor `k` es el **inverso modular** de la determinante.

---

## 4.3. Matriz adjunta

La adjunta de la matriz clave es:

adj(K) = | d -b |
| -c a |


---

## 4.4. Cálculo de la matriz inversa

La matriz inversa es:

K⁻¹ = (1 / det(K)) * adj(K) mod 26


El sistema implementado en JavaScript calcula automáticamente:

- determinante
- determinante mod 26
- inverso modular
- matriz adjunta
- matriz inversa resultante

Luego, aplica:

P = K⁻¹ · C mod 26




---

# 5. Instrucciones de uso

1. Escribir un mensaje en el campo “Mensaje”.
2. Ingresar los valores de la matriz clave:
   - a → k11  
   - b → k12  
   - c → k21  
   - d → k22
3. Elegir entre:
   - **Cifrar**
   - **Descifrar**
4. Oprimir el botón **“Ejecutar operación”**.
5. Revisar:
   - El resultado (mensaje cifrado o descifrado).
   - El detalle matemático del procedimiento.

---

# 6. Detalles matemáticos del proyecto

- Se usa aritmética **módulo 26**.
- La función **mod()** implementada garantiza resultados positivos.
- La matriz clave debe cumplir:  
gcd(det(K), 26) = 1


para que exista matriz inversa.

- El descifrado se basa en:
- determinante  
- inverso modular  
- matriz adjunta  
- matriz inversa  

Todo se aplica bloque por bloque (dos letras a la vez).

---

# 7. Personalización aplicada

- Interfaz con diseño **tipo Apple**:
- Fondo oscuro con degradado.
- Tarjetas con bordes redondeados.
- Botones con efecto de iluminación.
- Tipografía del sistema (-apple-system).
- Secciones organizadas en paneles visuales.

- Modo responsivo para funcionar en celulares.
- Indicadores de éxito/error para mejorar la experiencia del usuario.

---

# 8. Tecnologías utilizadas

- **HTML5** para estructura.  
- **CSS3** diseño personalizado. 
- **JavaScript** para toda la lógica del cifrado y descifrado.  
- **Git y GitHub** para control de versiones.  
- **GitHub Pages** para despliegue del proyecto.

---

# 9. Posibles mejoras futuras

- Matrices clave de 3×3.
- Inclusión de la letra Ñ.
- Soporte para espacios.
- Historial de operaciones.
- Modo paso-a-paso interactivo.

---

# 10. Referencias

- Hill, Lester S. (1929). *Cryptography in an Algebraic Alphabet*.  
- Documentación de MDN Web Docs sobre JavaScript y métodos matemáticos.  
- Apuntes de clase de Fundamentos de Álgebra (matrices, determinantes e inversas).