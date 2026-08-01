import {mkdir, readFile, writeFile} from 'node:fs/promises';

import {getSchema} from '@shopify/hydrogen-codegen';

const outputDirectory = new URL('../.graphql/', import.meta.url);

const schemas = [
  ['storefront', 'storefront.schema.json'],
  ['customer-account', 'customer-account.schema.json'],
];

await mkdir(outputDirectory, {recursive: true});

await Promise.all(
  schemas.map(async ([api, outputFile]) => {
    const schemaPath = getSchema(api);
    const schema = await readFile(schemaPath, 'utf8');
    const outputPath = new URL(outputFile, outputDirectory);

    // JetBrains' GraphQL plugin expects a complete introspection response,
    // while Hydrogen ships the __schema object at the JSON root.
    await writeFile(outputPath, `{"data":${schema}}\n`);
  }),
);
