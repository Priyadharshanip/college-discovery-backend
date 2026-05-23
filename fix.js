const fs = require('fs');
let code = fs.readFileSync('prisma/seed.ts', 'utf8');
code = code.replace(/topRecruiters:\s*\[(.*?)\]/g, "topRecruiters: [$1].join(', ')");
fs.writeFileSync('prisma/seed.ts', code);
