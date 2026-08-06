# Cifrado Hill

Implementacion web educativa del cifrado Hill con matriz 2x2. La aplicacion permite introducir texto, definir una clave matricial, validar que sea invertible modulo 27 y cifrar usando algebra matricial.

**Demo:** https://epinki07.github.io/cifrado-hill/

## Stack

| Capa | Tecnologia |
|---|---|
| UI | HTML, CSS |
| Logica | JavaScript |
| Dependencias | Ninguna |

## Como funciona

1. Normaliza el texto al alfabeto espanol.
2. Agrupa caracteres en vectores de dos posiciones.
3. Multiplica cada vector por la matriz clave.
4. Aplica modulo 27.
5. Convierte los valores resultantes a texto cifrado.

La clave debe tener determinante invertible modulo 27.

## Ejecucion local

```bash
git clone https://github.com/epinki07/cifrado-hill.git
cd cifrado-hill
open index.html
```

## Derechos

Codigo publicado para revision academica y profesional. Sin licencia de reutilizacion; todos los derechos reservados.
