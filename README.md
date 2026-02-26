# kanbanclaw

Kanbanclaw es una aplicación web para visualizar un tablero Kanban con tareas asignadas a agentes y su estado. El objetivo es tener una base sólida, modular y extensible: UI responsiva en React + Vite + TypeScript y un backend en Node + Express + TypeScript con almacenamiento intercambiable.

Principales objetivos
- Interfaz clara para mostrar tareas por columnas (To Do / In Progress / Done).
- Backend ligero con una interfaz de almacenamiento (`Storage`) que permite múltiples adaptadores (JSON, SQLite, etc.).
- Facilitar desarrollo local en Windows sin dependencias nativas obligatorias.

Arquitectura
- Frontend: React + Vite + TypeScript (carpeta `frontend`).
- Backend: Node + Express + TypeScript (carpeta `backend`).
- Almacenamiento: adaptadores en `backend/src/storage/`.

Estructura relevante
- Frontend: [frontend/src/App.tsx](frontend/src/App.tsx)
- Backend servidor: [backend/src/index.ts](backend/src/index.ts)
- Interfaz de almacenamiento: [backend/src/storage/types.ts](backend/src/storage/types.ts)
- Adaptador JSON (por defecto): [backend/src/storage/jsonStorage.ts](backend/src/storage/jsonStorage.ts)
- Adaptador SQLite (placeholder): [backend/src/storage/sqliteStorage.ts](backend/src/storage/sqliteStorage.ts)
- Rutas: [backend/src/routes/tasks.ts](backend/src/routes/tasks.ts)

Cómo ejecutar (desarrollo)

1) Backend

```powershell
cd backend
npm install
npm run dev
```

El backend por defecto expone `/api/tasks` en el puerto `4000`.

2) Frontend

```powershell
cd frontend
npm install
npm run dev
```

El frontend por defecto corre en `http://localhost:3000` y está configurado para hacer proxy de `/api` a `http://localhost:4000`.

Variables de entorno importantes
- `PORT`: puerto del backend (por defecto `4000`).
- `STORAGE`: selecciona el adaptador de almacenamiento. Valores admitidos:
	- `json` (por defecto) — usa `backend/data/tasks.json`.
	- `sqlite` — placeholder; implementarás este adaptador cuando aceptes dependencias nativas o uses un contenedor.

Notas sobre Windows y dependencias nativas
- El proyecto originalmente usó `better-sqlite3` (requiere compilación nativa). Para evitar fallos en entornos Windows sin herramientas C++ instaladas, actualmente el backend usa por defecto el adaptador JSON. Si quieres usar SQLite nativo, instala las herramientas de compilación (Visual Studio "Desktop development with C++") o usa Node 18 LTS.

Cómo añadir/usar otro adaptador de almacenamiento
1. Implementa la interfaz `Storage` en `backend/src/storage/types.ts`.
2. Crea un archivo en `backend/src/storage/` que exporte un objeto que cumpla `Storage`.
3. Actualiza `backend/src/db.ts` para seleccionar el adaptador por la variable `STORAGE` (ya está preparado para `json` y `sqlite`).

Desarrollo y pruebas
- Añade linter, pruebas unitarias o integración según prefieras.
- Considera añadir migraciones o una capa de repositorio si el almacenamiento crece en complejidad.

Próximos pasos recomendados
- Implementar adaptador SQLite real o usar `sql.js`/WASM si prefieres evitar builds nativas.
- Añadir autenticación y permisos (JWT, OAuth).
- Soporte en tiempo real (WebSocket / Socket.IO) para actualizaciones instantáneas en el tablero.
- Añadir CI (GitHub Actions) y scripts de lint/test.

Contacto y contribuciones
- Si deseas que implemente un adaptador SQLite real, migraciones o autenticación, dime cuál prefieres y lo integro.

---
Actualizado: instrucciones de ejecución y diseño de almacenamiento extensible.
# kanbanclaw
Kanban de tareas de agentes openclaw
