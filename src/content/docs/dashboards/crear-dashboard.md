---
title: Crear tu primer dashboard
description: Tutorial paso a paso para crear un dashboard profesional en Power BI
---
# 🚀 Crear tu primer dashboard

En este tutorial crearemos un dashboard de ventas completo desde cero.

## 📋 Lo que necesitas

- ✅ Power BI Desktop instalado
- ✅ [Archivo de datos de ejemplo](./assets/datos-ventas.xlsx) (descárgalo aquí)
- ✅ 30 minutos de tiempo

## 📊 Datos que vamos a usar

Nuestro dashboard mostrará:

- **Ventas totales** del año
- **Ventas por mes** (gráfico de líneas)
- **Top 5 productos** más vendidos
- **Ventas por región** (mapa)
- **Filtros interactivos** por fecha y categoría

## 🔧 Paso 1: Conectar los datos

1. Abre **Power BI Desktop**
2. Haz clic en **"Obtener datos"** → **Excel**
3. Selecciona el archivo `datos-ventas.xlsx`
4. Marca las tablas: `Ventas`, `Productos`, `Clientes`
5. Haz clic en **"Cargar"**

```dax
// Esta consulta se genera automáticamente
let
    Source = Excel.Workbook(File.Contents("C:\datos-ventas.xlsx"), null, true),
    Ventas_Sheet = Source{[Item="Ventas",Kind="Sheet"]}[Data]
in
    Ventas_Sheet
```
