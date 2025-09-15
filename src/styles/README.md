# 🎨 Arquitectura de Estilos - Wedding App

## 📁 Estructura Modular

```
src/styles/
├── index.css              # Archivo principal que importa todos los módulos
├── components/            # Estilos específicos de componentes
│   ├── hero.css          # Header principal con elementos florales
│   ├── countdown.css     # Componente de cuenta regresiva
│   ├── timeline.css      # Timeline de eventos
│   ├── cards.css         # Tarjetas de ubicaciones e info
│   ├── forms.css         # Formularios y inputs
│   ├── gallery.css       # Galería de fotos y carrusel
│   └── floating-petals.css # Pétalos flotantes y confetti
├── layout/               # Estilos de layout y estructura
│   ├── sections.css      # Secciones principales
│   ├── dividers.css      # Separadores decorativos
│   └── footer.css        # Footer con elementos florales
└── utilities/            # Utilidades y configuración
    ├── variables.css     # Variables CSS (colores, tipografías, espaciado)
    ├── animations.css    # Keyframes y clases de animación
    └── responsive.css    # Media queries y responsive design
```

## 🎯 Principios de Arquitectura

### 1. **Separación por Responsabilidad**
- **Components**: Estilos específicos de cada componente React
- **Layout**: Estilos de estructura y disposición
- **Utilities**: Variables, animaciones y utilidades reutilizables

### 2. **Variables CSS Centralizadas**
```css
:root {
  /* Colores principales */
  --accent: #ec4899;
  --text: #2d1b3d;
  
  /* Espaciado consistente */
  --space-sm: 8px;
  --space-md: 16px;
  
  /* Transiciones estandarizadas */
  --transition-normal: 0.2s ease;
}
```

### 3. **Nomenclatura BEM para Componentes**
```css
.countdown__item { }
.countdown__item:hover { }
.countdown__item::before { }
```

### 4. **Responsive Design Modular**
- Media queries centralizadas en `responsive.css`
- Breakpoints consistentes
- Elementos decorativos ocultos en móvil

## 🌸 Elementos Florales

### **Colores Florales**
- `--floral-pink: #f8b4d1`
- `--floral-purple: #d8b4e8`
- `--floral-gold: #f4d03f`

### **Animaciones Temáticas**
- `petalFall`: Pétalos cayendo
- `petalSway`: Balanceo suave
- `sparkle`: Efecto de brillo
- `float`: Flotación sutil

## 📱 Responsive Design

### **Breakpoints**
- `768px`: Ocultar elementos decorativos en móvil
- `480px`: Ajustes para pantallas muy pequeñas
- `680px`: Cambios en grid del countdown

## 🚀 Ventajas de esta Arquitectura

1. **Mantenibilidad**: Fácil localizar y modificar estilos
2. **Escalabilidad**: Agregar nuevos componentes sin afectar otros
3. **Reutilización**: Variables y utilidades compartidas
4. **Performance**: Importación modular optimizada
5. **Colaboración**: Estructura clara para equipos de desarrollo

## 🔧 Uso

```tsx
// En main.tsx
import './styles/index.css'

// Los estilos se cargan automáticamente en el orden correcto
```

## 📝 Convenciones

- **Archivos**: kebab-case (`floating-petals.css`)
- **Clases**: BEM methodology (`.component__element--modifier`)
- **Variables**: kebab-case (`--floral-pink`)
- **Comentarios**: Documentar secciones importantes
