const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

/**
 * Script to generate React icon components from SVG files
 * Usage: node scripts/generate-icons.js
 */

const ROOT_ICONS_DIR = path.join(__dirname, '../src/icons');
const SVG_DIR = path.join(__dirname, '../assets/svg'); // Directory containing SVG files

// List of existing icons in our library
const EXISTING_ICONS = [
  'IconStar',
  'IconArrowRight',
  'IconHome',
  'IconSearch'
];

// SVGO configuration for optimizing SVGs
const svgoConfig = {
  plugins: [
    'preset-default',
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'removeXMLNS',
      active: true,
    },
  ],
};

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Extract SVG content (everything inside <svg> tags)
 */
function extractSvgContent(svgString) {
  const match = svgString.match(/<svg[^>]*>(.*?)<\/svg>/s);
  return match ? match[1].trim() : '';
}

/**
 * Extract viewBox from SVG
 */
function extractViewBox(svgString) {
  const match = svgString.match(/viewBox="([^"]+)"/);
  return match ? match[1] : '0 0 24 24';
}

/**
 * Generate React component from SVG with new directory structure
 */
function generateComponent(iconName, svgContent, viewBox) {
  const componentName = `Icon${toPascalCase(iconName)}`;
  
  return `import React from 'react';
import { Icon } from '../../components/Icon';
import { IconProps } from '../../types';

/**
 * ${toPascalCase(iconName)} icon component
 */
export const ${componentName}: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="${viewBox}" {...props}>
      ${svgContent}
    </Icon>
  );
};

export default ${componentName};
`;
}

/**
 * Generate test file for the icon
 */
function generateTestFile(iconName) {
  const componentName = `Icon${toPascalCase(iconName)}`;
  
  return `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName} />);
    
    const svg = screen.getByTestId('icon-component');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    
    const path = svg.querySelector('path,polygon,circle,line,polyline,rect');
    expect(path).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(<${componentName} size={32} color="gold" aria-label="${iconName} rating" />);
    
    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('stroke', 'gold');
    expect(svg).toHaveAttribute('role', 'img');
    
    const title = screen.getByText('${iconName} rating');
    expect(title).toBeInTheDocument();
  });

  it('renders with spin animation', () => {
    render(<${componentName} spin />);
    
    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveStyle({ animation: 'icon-spin 1s linear infinite' });
  });
});
`;
}

/**
 * Generate stories file for the icon
 */
function generateStoriesFile(iconName) {
  const componentName = `Icon${toPascalCase(iconName)}`;
  
  return `import { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/Icons/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Size of the icon (number for px, string for em/rem/etc)',
      defaultValue: '1em',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icon',
      defaultValue: 'currentColor',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
      description: 'Stroke width for outline icons',
      defaultValue: 2,
    },
    spin: {
      control: { type: 'boolean' },
      description: 'Whether the icon should spin',
      defaultValue: false,
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the icon',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

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
    color: '#FFD700',
  },
};

export const WithSpin: Story = {
  args: {
    spin: true,
  },
};

export const WithAriaLabel: Story = {
  args: {
    'aria-label': '${iconName} icon',
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 3,
  },
};

export const LargeCustom: Story = {
  args: {
    size: 48,
    color: '#FF6B6B',
    strokeWidth: 1.5,
  },
};
`;
}

/**
 * Update main index file with new exports
 */
function updateIndexFile(iconNames) {
  const indexPath = path.join(__dirname, '../src/index.ts');
  const startMarker = '// start-paste';
  const endMarker = '// end-paste';

  const iconExports = iconNames
    .map(name => {
      const componentName = `Icon${toPascalCase(name)}`;
      return `export { ${componentName} } from './icons/${componentName}/${componentName}';`;
    })
    .join('\n');

  const content = `
// Export generate icons
${iconExports}
`;

  updateFile(indexPath, content, startMarker, endMarker)
}


function updateFile(filePath, insertionText, startMarker, endMarker) {
    try {
        // Проверяем, существует ли файл
        if (!fs.existsSync(filePath)) {
            console.error(`Файл не найден: ${filePath}`);
            return;
        }

        // Читаем содержимое файла
        let content = fs.readFileSync(filePath, 'utf8');

        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);

        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            // Извлекаем часть до startMarker и после endMarker
            const before = content.substring(0, startIndex);
            const after = content.substring(endIndex + endMarker.length);

            // Формируем новое содержимое: до + вставка + маркеры
            const newContent = before + insertionText + '\n\n' + startMarker + '\n' + endMarker + after;

            content = newContent;
            console.log('✅ Код вставлен, старые маркеры удалены, новые маркеры добавлены.');
        } else {
            // Маркеры не найдены — добавляем в конец
            console.log('✅ Маркеры не найдены. Добавляем в конец файла с новыми маркерами.');
            content = content.trim() + '\n\n' + insertionText + '\n\n' + startMarker + '\n' + endMarker + '\n';
        }

        // Сохраняем обновлённый файл
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('✅ Файл успешно обновлён:', filePath);
    } catch (error) {
        console.error('❌ Ошибка при обработке файла:', error.message);
    }
}

/**
 * Main function
 */
async function generateIcons() {
  try {
    // Create directories if they don't exist
    if (!fs.existsSync(SVG_DIR)) {
      fs.mkdirSync(SVG_DIR, { recursive: true });
      console.log(`📁 Created SVG directory: ${SVG_DIR}`);
      console.log('Please add your SVG files to this directory and run this script again.');
      return;
    }

    // Read all SVG files
    const svgFiles = fs.readdirSync(SVG_DIR).filter(file => file.endsWith('.svg'));
    
    if (svgFiles.length === 0) {
      console.log('No SVG files found in assets/svg directory.');
      console.log('Please add your SVG files to this directory and run this script again.');
      return;
    }

    console.log(`🔍 Found ${svgFiles.length} SVG files`);

    const iconNames = [];

    for (const file of svgFiles) {
      const iconName = path.basename(file, '.svg');
      const svgPath = path.join(SVG_DIR, file);
      const svgContent = fs.readFileSync(svgPath, 'utf8');

      // Optimize SVG
      const result = optimize(svgContent, svgoConfig);
      const optimizedSvg = result.data;

      // Extract content and viewBox
      const content = extractSvgContent(optimizedSvg);
      const viewBox = extractViewBox(optimizedSvg);

      // Create icon directory
      const componentName = `Icon${toPascalCase(iconName)}`;
      const iconDir = path.join(ROOT_ICONS_DIR, componentName);
      if (!fs.existsSync(iconDir)) {
        fs.mkdirSync(iconDir, { recursive: true });
      }

      // Generate component
      const componentCode = generateComponent(iconName, content, viewBox);
      const componentPath = path.join(iconDir, `${componentName}.tsx`);

      // Write component file
      fs.writeFileSync(componentPath, componentCode);

      // Generate test file
      const testDir = path.join(iconDir, '__tests__');
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
      }
      
      const testCode = generateTestFile(iconName);
      const testPath = path.join(testDir, `${componentName}.test.tsx`);
      fs.writeFileSync(testPath, testCode);

      // Generate stories file
      const storiesCode = generateStoriesFile(iconName);
      const storiesPath = path.join(iconDir, `${componentName}.stories.tsx`);
      fs.writeFileSync(storiesPath, storiesCode);

      // Create package.json for the icon
      const packageJson = {
        "main": `${componentName}.tsx`
      };
      const packageJsonPath = path.join(iconDir, 'package.json');
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      iconNames.push(iconName);

      console.log(`✅ Generated ${componentName}`);
    }

    // Update index file
    updateIndexFile(iconNames);

    console.log(`🎉 Successfully generated ${iconNames.length} icon components!`);
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons };
