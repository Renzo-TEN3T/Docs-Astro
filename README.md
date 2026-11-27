# Aliv Telecom · Sitio web

Sitio estático multipágina (HTML puro, sin frameworks) generado con un script de Node.

## Comandos
- `npm install`  → una sola vez (instala los íconos)
- `npm run build` → genera el sitio completo en `dist/`
- `npm run dev`   → build + servidor local en http://localhost:8000

## Dónde se edita qué
| Quiero cambiar…                          | Archivo                  |
|------------------------------------------|--------------------------|
| Dominio, WhatsApp, teléfono, redes, **IDs de Google Analytics/Ads** | `site.config.mjs` |
| Planes, precios, distritos, FAQ, valores | `src/data.mjs`           |
| Menús, header, footer                    | `src/layout.mjs`         |
| Textos de cada página                    | `src/pages.mjs`          |
| Estilos                                  | `src/assets/style.css`   |
| Comportamiento / eventos de tracking     | `src/assets/app.js`      |

Tras cualquier cambio: `npm run build` y publicar la carpeta `dist/`.

## Google Analytics + Ads
1. Pega tus IDs en `site.config.mjs` (`gaId`, `adsId`, `adsLabels`).
2. `npm run build`. Con IDs cargados aparece el banner de cookies (Consent Mode v2).
3. Eventos que ya se envían: `generate_lead` (en /gracias/), `select_item`, `whatsapp_click`,
   `click_to_call`, `cta_click`, `form_start`, `speed_sim_complete`.
4. En GA4 marca `generate_lead` como evento clave. En Google Ads crea la conversión y pega su etiqueta en `adsLabels.lead`.
5. Para campañas usa como URL final `/contratar/` o `/internet-fibra-optica/<distrito>/`.


## Logos
- Los originales están en `img/` (Aliv_logo.svg y Win_logo.svg).
- El sitio usa copias en `src/assets/img/`. Las versiones `-dark` solo aclaran el texto "Telecom" y "WINNERS" para que se lean sobre fondo negro.
- Si cambias un logo, reemplaza el archivo en `src/assets/img/` y corre `npm run build`.

## Ventas web -> SQL Server (tabla ventas, etapa REFERIDO)
Cuando alguien llena "Contratar servicio", la web envía los datos a un puente local (`server/`) que inserta una venta en `Aliv_DB.dbo.ventas` con `etapa = REFERIDO` (aparece en "Ventas Aliv Referidos" de Sistema_Aliv) y deja la fila "CREADA" en `venta_historial`.

**Encender el puente** (debe estar corriendo para que se guarde):
```
npm run api
```
- Valores: estado_venta_id 7 (Contactado - Interesado), canal_venta_id 8 (Ecommerce), canal_empresa WIN, Lima/Lima, distrito según el formulario, tipo_servicio Hogar (o Condominio/Edificio si cotiza edificio), paquete_id según el plan y su precio. Vendedor, supervisor, creado_por, DNI y tipo de documento quedan vacios para que el asesor los complete. El plan elegido y la fuente del anuncio (utm/gclid) van en `observacion`.
- Los codigos de plan -> paquete y distrito -> id estan en `server/index.mjs` (PAQUETES y DISTRITOS). Si cambias planes en la web, actualiza esa tabla.
- Usuario SQL `web_leads`: solo INSERT en `ventas` y `venta_historial`, y SELECT en el catalogo `paquetes`. No puede leer, editar ni borrar ventas. Su contraseña esta en `server/.env` (no se sube a git).
- Si el puente esta apagado, el formulario sigue funcionando por WhatsApp (la pantalla de gracias lo indica).
- Respaldo previo a la integracion: `Aliv_DB_antes_web_20261119.bak` en la carpeta Backup de SQL Server.
- Al publicar el sitio: en `site.config.mjs` pon la URL publica del puente en `leadsApi`, y en `server/.env` agrega tu dominio a `ALLOWED_ORIGINS`.
- Las postulaciones de "Trabaja con nosotros" no se guardan en la base; siguen por WhatsApp.
