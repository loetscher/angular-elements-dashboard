const fs = require('fs');
const path = require('path');
const css = require('css');
const packageJsonPath = require.resolve('ag-grid-community/package.json');
const agGridPath = path.dirname(packageJsonPath);
const outputFile = './projects/external-dashboard-tile/src/app/components/b9e-ag-grid-encapsulated/configuration/fontface-style.ts';

//extract ag grid version
const packageJson = fs.readFileSync(packageJsonPath, { encoding: "utf8" });
const agGridVersion = JSON.parse(packageJson).version;

//read stylesheet
console.log('parse balham css file');
var fileContents = fs.readFileSync(`${agGridPath}/dist/styles/ag-theme-balham.css`, { encoding: "utf8" });
const ast = css.parse(fileContents);
//extract font-face rule(s)
ast.stylesheet.rules = ast.stylesheet.rules.filter(param => param.type === 'font-face');
const cssString = css.stringify(ast);

// fs.writeFileSync('fontface.css', cssString);


//generate new typescript class

const tsFontFaceFile = `
/* tslint:disable */
//see https://bugs.chromium.org/p/chromium/issues/detail?id=336876
//todo: extract it from ag-grid css at build time and provide it in a ts class which will be compiled

export const balhamVersion = '${agGridVersion}';
export const balhamFontFace = \`${cssString}\`;
`;

console.log('write font-face for balham theme');
fs.writeFileSync(outputFile, tsFontFaceFile);


