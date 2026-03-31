# Guía de Deploy — CalculaChile.cl en Vercel Pro

> **Dominio:** calculadorachile.cl
> **Plataforma:** Vercel Pro
> **Framework:** Next.js 15
> **Fecha:** 31 de Marzo 2026

---

## Paso 1: Crear repositorio en GitHub

1. Ir a [github.com/new](https://github.com/new)
2. **Repository name:** `calculachile` (o `calculadorachile`)
3. **Description:** `Calculadoras financieras y laborales de Chile`
4. **Visibility:** Public (mejor para SEO) o Private
5. **NO marcar** "Add a README file" (ya tenemos código)
6. Click en **"Create repository"**

## Paso 2: Push del código a GitHub

Abre una terminal y ejecuta:

```bash
cd c:\code\SaaS2\CalculaChile

# Inicializar git si no está hecho
git init

# Crear .gitignore si no existe
# Asegúrate de excluir: .next/, node_modules/, .env, .env.local

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: CalculaChile v0.1.0"

# Renombrar branch a main
git branch -M main

# Agregar remoto (reemplaza con tu URL real del repo)
git remote add origin https://github.com/TU-USUARIO/calculachile.git

# Push
git push -u origin main
```

### Verificar que .gitignore existe

Asegúrate de que estos directorios/archivos estén excluidos:

```
# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Build
tsconfig.tsbuildinfo
```

---

## Paso 3: Crear proyecto en Vercel Pro

1. Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Seleccionar el repo `calculachile` (importar desde GitHub)
4. Vercel detectará automáticamente Next.js
5. **Framework Preset:** Next.js
6. **Build Command:** `next build` (default)
7. **Output Directory:** `.next` (default)
8. Click en **"Deploy"**

El primer deploy tomará 2-5 minutos.

---

## Paso 4: Configurar dominio en Vercel

1. En el dashboard del proyecto, ir a **"Settings"** → **"Domains"**
2. Click en **"Add"**
3. Ingresar: `calculadorachile.cl`
4. Click en **"Add"**
5. Vercel mostrará dos opciones de configuración DNS:
   - **Opción A (recomendada):** Nameservers de Vercel
   - **Opción B:** Registros A/CNAME (si quieres mantener DNS en NIC Chile)

### Opción A: Nameservers de Vercel (Más simple)

Vercel te dará 4 nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Opción B: Registros A/CNAME (Más control)

Si prefieres mantener los DNS en NIC Chile, agrega estos registros:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## Paso 5: Configurar DNS en NIC Chile

1. Ir a [nic.cl](https://www.nic.cl)
2. Iniciar sesión con tu cuenta
3. Ir a **"Administrar dominios"** → `calculadorachile.cl`
4. Ir a **"DNS"** o **"Nameservers"**

### Si elegiste Opción A (Nameservers Vercel):

Reemplaza los nameservers actuales con:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Si elegiste Opción B (Registros A/CNAME):

Agrega los registros A y CNAME que te dio Vercel en el paso anterior.

**Nota:** La propagación DNS puede tomar hasta 48 horas, pero normalmente es 1-4 horas.

---

## Paso 6: Configurar variables de entorno en Vercel

Ir a **Settings** → **Environment Variables** y agregar:

### Variables requeridas:

| Variable | Valor | Nota |
|----------|-------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://calculadorachile.cl` | URL de producción |
| `BCENTRAL_USER` | *(tu usuario BCentral)* | Opcional, fallback a constantes locales |
| `BCENTRAL_PASS` | *(tu password BCentral)* | Opcional, fallback a constantes locales |

### Variables opcionales:

| Variable | Valor | Nota |
|----------|-------|------|
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | `ca-pub-XXXXXXXXXXXXXXXX` | Cuando tengas AdSense aprobado |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Cuando crees propiedad en GA4 |
| `DEBUG` | `false` | Solo `true` para debugging |

### Variables que NO necesitas (eliminadas):

| Variable | Estado |
|----------|--------|
| `FIREBASE_PROJECT_ID` | ~~Eliminada~~ |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | ~~Eliminada~~ |
| `MERCADOPAGO_ACCESS_TOKEN` | ~~Eliminada~~ |
| `MERCADOPAGO_PUBLIC_KEY` | ~~Eliminada~~ |

---

## ANTES del deploy: Actualizar .env.example

El archivo `.env.example` aún tiene referencias a Firebase y MercadoPago. Debes limpiarlo:

1. Abrir `CalculaChile/.env.example`
2. Eliminar la sección completa de Firebase (líneas 14-25)
3. Eliminar la sección de MercadoPago (líneas 37-39)
4. Cambiar `NEXT_PUBLIC_SITE_URL` a `https://calculadorachile.cl`

El archivo debe quedar así:

```bash
# ===========================================
# CalculaChile — Variables de Entorno
# ===========================================

# BCentral API (opcional, fallback a constants.ts)
BCENTRAL_USER=
BCENTRAL_PASS=

# Next.js
NEXT_PUBLIC_SITE_URL=https://calculadorachile.cl

# Google AdSense (cuando tengas aprobación)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=

# Opcionales
NEXT_PUBLIC_GA_MEASUREMENT_ID=
DEBUG=false
```

---

## Paso 7: Primer deploy y verificación

### Verificar que el deploy fue exitoso:

1. Ir a la URL que Vercel te dio (ej: `calculachile-xxxx.vercel.app`)
2. Verificar que:
   - [ ] La home carga correctamente
   - [ ] Las calculadoras funcionan
   - [ ] Los valores de UF/UTM se muestran (o fallback a constantes)
   - [ ] El blog carga
   - [ ] No hay errores en consola del browser

### Verificar con dominio personalizado:

Una vez que el DNS propague, visita `https://calculadorachile.cl` y verifica lo mismo.

### Forzar HTTPS:

En Vercel → Settings → Domains → asegúrate de que **"Force HTTPS"** esté activado.

---

## Paso 8: Google Search Console + Analytics

### Google Search Console:

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Click en **"Add Property"**
3. Ingresar: `https://calculadorachile.cl`
4. Verificar propiedad:
   - Opción recomendada: **HTML tag** (agregar meta tag en `layout.tsx`)
   - O alternativa: **DNS record** (agregar TXT en NIC Chile)
5. Una vez verificado, ir a **"Sitemaps"** y enviar: `https://calculadorachile.cl/sitemap.xml`
6. Ir a **"URL Inspection"** y solicitar indexación de las páginas principales

### Google Analytics 4:

1. Ir a [analytics.google.com](https://analytics.google.com)
2. Crear una propiedad nueva para `calculadorachile.cl`
3. Obtener el **Measurement ID** (formato `G-XXXXXXXXXX`)
4. Agregar como variable de entorno en Vercel:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
5. Redeploy para aplicar los cambios:
   ```bash
   git commit --allow-empty -m "trigger redeploy for GA4"
   git push
   ```

---

## Paso 9: Google AdSense (cuando estés listo)

1. Ir a [adsense.google.com](https://adsense.google.com)
2. Crear cuenta con tu dominio `calculadorachile.cl`
3. Agregar el código de verificación en `layout.tsx`
4. Esperar aprobación (1-2 semanas)
5. Una vez aprobado, agregar el Publisher ID como variable de entorno:
   ```
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```

---

## Checklist Final

- [ ] Código en GitHub
- [ ] Proyecto creado en Vercel Pro
- [ ] Dominio configurado en Vercel
- [ ] DNS configurado en NIC Chile
- [ ] Variables de entorno configuradas
- [ ] Primer deploy exitoso
- [ ] HTTPS activado
- [ ] Google Search Console verificado
- [ ] Sitemap enviado a GSC
- [ ] Google Analytics 4 instalado
- [ ] AdSense solicitado (cuando estés listo)

---

## Comandos útiles

```bash
# Build local para verificar que todo compila
npm run build

# Run tests
npm run test:run

# Type check
npx tsc --noEmit

# Trigger redeploy desde CLI
vercel --prod
```

---

*Guía creada el 31 de Marzo 2026*
*calculadorachile.cl — Deploy en Vercel Pro*
