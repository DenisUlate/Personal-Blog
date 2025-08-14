---
title: "Introducción a React Hooks"
date: "2025-01-25"
author: "Denis Ulate"
tags: ["react", "hooks", "frontend"]
category: "Frontend"
excerpt: "Aprende los conceptos básicos de React Hooks y cómo pueden mejorar tus componentes"
featured: true
illustration: "/images/blog/illustrations/react-hooks-01-illustration.png"
---

# Introducción a React Hooks

Los React Hooks revolucionaron la forma en que escribimos componentes en React. En este post exploraremos los conceptos básicos.

## ¿Qué son los Hooks?

Los Hooks son funciones especiales que te permiten "enganchar" las características de React desde componentes funcionales.

## Hook useState

El Hook más básico es `useState`:

```jsx
import React, { useState } from "react";

function Contador() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Has hecho clic {count} veces</p>
			<button onClick={() => setCount(count + 1)}>Hacer clic</button>
		</div>
	);
}
```

## Hook useEffect

Para efectos secundarios usamos `useEffect`:

```jsx
import React, { useState, useEffect } from "react";

function Ejemplo() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `Has hecho clic ${count} veces`;
	});

	return (
		<div>
			<p>Has hecho clic {count} veces</p>
			<button onClick={() => setCount(count + 1)}>Hacer clic</button>
		</div>
	);
}
```

## Reglas de los Hooks

1. Solo llama Hooks desde el nivel superior
2. Solo llama Hooks desde funciones de React

## Conclusión

Los Hooks hacen que los componentes funcionales sean más poderosos y fáciles de testear.
