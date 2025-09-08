import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	
	integrations: [
		starlight({
			title: 'Power BI Docs',
			sidebar: [
				{
					label: '🏠 Inicio',
					items: [
						{ label: 'Bienvenida', link: '/' },
					],
				},
				{
					label: '🚀 Introducción',
					items: [
						{ label: '¿Qué es Power BI?', link: '/introduccion/que-es-power-bi/' },
						{ label: 'Instalación', link: '/introduccion/instalacion/' },
					],
				},
				{
					label: '📊 Dashboards',
					items: [
						{ label: 'Mi primer dashboard', link: '/dashboards/crear-dashboard/' },
						{ label: 'Visualizaciones', link: '/dashboards/visualizaciones/' },
					],
				},
				{
					label: '🧮 Fórmulas DAX',
					items: [
						{ label: 'DAX básico', link: '/formulas/dax-basico/' },
						{ label: 'Funciones tiempo', link: '/formulas/time-intelligence/' },
					],
				},
			],
		}),
	],
});