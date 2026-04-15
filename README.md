# 🔐 Cifrado Hill – Proyecto Final

Implementación web del **Cifrado Hill** — encriptación por álgebra matricial 2x2 con interfaz interactiva en JavaScript.

## 📋 ¿Qué hace?

- **Cifrado matricial**: Usa multiplicación de matrices para encriptar
- **Interfaz web**: UI interactiva en HTML/CSS/JavaScript
- **Validación de claves**: Verifica que la matriz sea invertible
- **Soporte español**: Alfabeto completo con ñ

## 🛠️ Tech Stack

| Frontend | Algoritmo | Matemáticas |
|----------|-----------|-------------|
| HTML/CSS | Hill Cipher | Álgebra Lineal |
| JavaScript | | Matrices 2x2 |

## 🚀 Cómo usarlo

```bash
# Clonar
git clone https://github.com/epinki07/cifrado-hill.git
cd cifrado-hill

# Abrir en navegador
open index.html
```

## 📖 ¿Cómo funciona?

El Cifrado Hill usa álgebra matricial para transformar texto:

1. Convertir letras a números (A=0, B=1, ...)
2. Agrupar en vectores de 2 elementos
3. Multiplicar por matriz de clave 2x2
4. Aplicar módulo 27 (alfabeto español)
5. Convertir resultado de vuelta a letras

**Matriz válida**: Debe tener determinante ≠ 0 y ser invertible módulo 27.

## 💡 Qué aprendí

- **Criptografía clásica**: Cifrados basados en álgebra
- **Álgebra lineal aplicada**: Matrices, determinantes, inversas
- **JavaScript DOM**: Manipulación dinámica del DOM
- **Validación de entrada**: Verificar condiciones matemáticas

## 🤝 Autor

**Diego Ramirez Magaña**

- 📧 dramirezmagana@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/diego-ramirez-maga%C3%B1a-b15022298/)
- 🐙 [GitHub](https://github.com/epinki07)
