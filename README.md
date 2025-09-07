# Шаблон для библиотеки иконок React

Современная, легковесная и доступная библиотека иконок React с поддержкой TypeScript. Создана для React 16.14+ с полной совместимостью для React 17 и 18.

## Особенности

- 🎯 **Легковесность**: Иконки с поддержкой tree-shaking для минимального размера бандла
- 🔄 **Совместимость с React 16.14+**: Работает со всеми современными версиями React
- 🎨 **Настраиваемость**: Размер, цвет, толщина линии и многое другое
- ♿ **Доступность**: Правильные ARIA-атрибуты и семантический HTML
- 📦 **Поддержка TypeScript**: Полные определения типов включены
- 🌈 **Простота использования**: Простой API с согласованными пропсами
- ⚡ **Оптимизация производительности**: Минимальные накладные расходы и быстрый рендеринг

## Установка

```bash
npm install @valeryan15/temp-react-icon-library
# или
yarn add @valeryan15/temp-react-icon-library
```

## Публикация пакета

Для публикации пакета на npm и GitHub, используйте скрипт публикации:

```bash
node scripts/publish-package.cjs
```

Скрипт автоматически:
1. Проверит, что вы находитесь в ветке main
2. Убедится, что нет незакоммиченных изменений
3. Выполнит тесты
4. Соберет пакет
5. Увеличит версию (патч)
6. Опубликует пакет на npm
7. Отправит изменения и теги на GitHub


## Использование

### Базовое использование

```jsx
import { IconStar } from '@valeryan15/temp-react-icon-library';

function App() {
  return (
    <div>
      <IconStar />
      <IconStar size={24} color="gold" />
      <IconStar spin />
    </div>
  );
}
```

### С пропсами

```jsx
import { IconHome, IconSearch } from '@valeryan15/temp-react-icon-library';

function App() {
  return (
    <div>
      {/* Размер по умолчанию (1em) и цвет (currentColor) */}
      <IconHome />
      
      {/* Пользовательский размер */}
      <IconHome size={32} />
      
      {/* Пользовательский цвет */}
      <IconSearch color="#3B82F6" />
      
      {/* Пользовательская толщина линии */}
      <IconSearch strokeWidth={1.5} />
      
      {/* Анимация вращения */}
      <IconSearch spin />
      
      {/* Доступная иконка с меткой */}
      <IconHome aria-label="Главная" />
    </div>
  );
}
```

## Доступные иконки

- `IconStar` - Иконка звезды
- `IconArrowRight` - Иконка стрелки вправо
- `IconHome` - Иконка дома
- `IconSearch` - Иконка поиска

## Пропсы

Все иконки принимают следующие пропсы:

| Пропс | Тип | По умолчанию | Описание |
|------|------|---------|-------------|
| `size` | `number \| string` | `'1em'` | Размер иконки |
| `color` | `string` | `'currentColor'` | Цвет иконки |
| `strokeWidth` | `number` | `2` | Толщина линии для контурных иконок |
| `spin` | `boolean` | `false` | Должна ли иконка вращаться |
| `aria-label` | `string` | - | Доступная метка для иконки |
| `className` | `string` | - | CSS класс |
| `style` | `React.CSSProperties` | - | Встроенные стили |

## Доступность

Иконки доступны по умолчанию:
- Декоративные иконки имеют `aria-hidden="true"`
- Семантические иконки с `aria-label` имеют правильные ARIA-атрибуты
- Иконки с метками включают элементы `<title>`

## Tree Shaking

Эта библиотека поддерживает tree shaking для оптимального размера бандла:

```jsx
// Импортируется только иконка Star, а не вся библиотека
import { IconStar } from '@valeryan15/temp-react-icon-library';
```

## Поддержка браузеров

- Современные браузеры (Chrome, Firefox, Safari, Edge)
- IE 11+ (с соответствующими полифилами)

## Разработка

### Основные библиотеки проекта

- **React** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Язык программирования со строгой типизацией
- **Vite** - Инструмент сборки нового поколения
- **Storybook** - Инструмент для разработки UI-компонентов
- **Jest** - Фреймворк для тестирования
- **ESLint/Prettier** - Инструменты для проверки кода и форматирования

### Сборка библиотеки

```bash
yarn build
```

### Запуск тестов

```bash
yarn test
```

### Запуск Storybook

```bash
yarn storybook
```

### Генерация иконок

Поместите SVG-файлы в `assets/svg/` и выполните:

```bash
yarn generate-icons
```

## Пример создания компонента

### Создание SVG-компонента

```tsx
// src/icons/IconExample.tsx
import React from 'react';
import { Icon } from '../components/Icon';
import { IconProps } from '../types';

/**
 * Пример иконки
 */
export const IconExample: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  );
};

export default IconExample;
```

### Создание Storybook-файла

```tsx
// src/icons/IconExample.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { IconExample } from './IconExample';

const meta: Meta<typeof IconExample> = {
  title: 'Components/Icons/IconExample',
  component: IconExample,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Размер иконки (число для px, строка для em/rem/etc)',
      defaultValue: '1em',
    },
    color: {
      control: { type: 'color' },
      description: 'Цвет иконки',
      defaultValue: 'currentColor',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
      description: 'Толщина линии для контурных иконок',
      defaultValue: 2,
    },
    spin: {
      control: { type: 'boolean' },
      description: 'Должна ли иконка вращаться',
      defaultValue: false,
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Доступная метка для иконки',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS класс',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconExample>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#3B82F6',
  },
};

export const WithSpin: Story = {
  args: {
    spin: true,
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 3,
  },
};
```

## Лицензия

MIT © @valeryan15

## Вклад в развитие

Вклады приветствуются! Пожалуйста, ознакомьтесь с нашими рекомендациями по внесению вкладов перед отправкой запросов на слияние.
