# Stack Tecnológico y Reglas de Implementación - Hosty Group

Al generar componentes de UI, **DEBES** adherirte a estas elecciones tecnológicas.

## Stack Principal
* **Framework:** React (TypeScript recomendado).
* **Estilos:** Tailwind CSS (Obligatorio).
* **Componentes:** shadcn/ui (Base para nuevos componentes).
* **Iconos:** Lucide React.

## Guías de Implementación

### 1. Configuración de Tailwind (Mapeo de Marca)
Usa los colores definidos en `design-tokens.json`:
* `bg-primary` debe ser `#0A2A54`.
* `text-accent-premium` debe ser `#D3B574`.
* `bg-accent-warm` debe ser `#F9F3EC`.
* **Modo Oscuro:** Soporte mediante variante `dark:`.

### 2. Patrones de Componentes
* **Botones:**
    * Primarios: Fondo sólido `#0A2A54` (Primary), texto Blanco.
    * Premium/CTA: Detalles o bordes en `#D3B574` (Accent Premium).
* **Tipografía:**
    * Usa `font-poppins` para Títulos (font-weight 600/700).
    * Usa `font-open-sans` para Texto corrido (font-weight 400/600).
* **Layout:** Flexbox y Grid mediante utilidades de Tailwind.

### 3. Restricciones
* NO usar jQuery ni Bootstrap.
* NO crear archivos CSS globales nuevos (usa utilidades).
