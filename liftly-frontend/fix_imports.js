const fs = require('fs');

const files = [
  { path: 'src/app/features/training/create-template/create-template.ts', back: '../../../core' },
  { path: 'src/app/features/training/template-list/template-list.ts', back: '../../../core' },
  { path: 'src/app/features/calendar/calendar.ts', back: '../../core' },
  { path: 'src/app/features/weight/weight.ts', back: '../../core' }
];

files.forEach(f => {
  let content = fs.readFileSync(f.path, 'utf8');
  content = content.replace(/\.\.\/core/g, 'CORE_TEMP');
  content = content.replace(/\.\.\/\.\.\/core/g, 'CORE_TEMP');
  content = content.replace(/\CORE_TEMP/g, f.back);
  // also fix models paths just in case since they too might be broken
  // Let's do a more robust string replacement
  
});
