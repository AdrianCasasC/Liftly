const fs = require('fs');

const files = [
  'src/app/features/calendar/calendar.ts',
  'src/app/features/training/create-template/create-template.ts',
  'src/app/features/training/template-list/template-list.ts',
  'src/app/features/weight/weight.ts'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/core/g, '../../../core');
  content = content.replace(/\.\.\/\.\.\/\.\.\/core/g, '../../core');
  
  content = content.replace(/workouts =>/g, '(workouts: any) =>');
  content = content.replace(/temps =>/g, '(temps: any) =>');
  content = content.replace(/next: \(res\) =>/g, 'next: (res: any) =>');
  content = content.replace(/exs =>/g, '(exs: any) =>');
  content = content.replace(/logs =>/g, '(logs: any) =>');
  content = content.replace(/\(a, b\)/g, '(a: any, b: any)');
  content = content.replace(/next: \(log\)/g, 'next: (log: any)');
  
  fs.writeFileSync(file, content);
});
