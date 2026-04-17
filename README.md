# Cifrado Hill

Implementacion web del Cifrado Hill: encriptacion por algebra matricial 2x2 con interfaz interactiva en JavaScript. Proyecto final del tema de criptografia clasica.

## Que hace

Toma texto plano y una clave matricial 2x2, valida que la matriz sea invertible modulo 27, y cifra el texto usando multiplicacion de matrices. Incluye soporte para el alfabeto espanol con la letra n.

El proceso: convierte las letras a numeros, agrupa en vectores de dos elementos, multiplica por la matriz clave, aplica modulo 27, y convierte el resultado de vuelta a texto.

**Condicion de la clave**: la matriz debe tener determinante distinto de cero y ser invertible modulo 27.

## Como usarlo

```bash
git clone https://github.com/epinki07/cifrado-hill.git
cd cifrado-hill
open index.html
```

## Tech Stack

HTML, CSS y JavaScript. Sin dependencias externas.

## Autor

Diego Ramirez Magana — [LinkedIn](https://www.linkedin.com/in/diego-ramirez-maga%C3%B1a-b15022298/) | [GitHub](https://github.com/epinki07) | dramirezmagana@gmail.com
