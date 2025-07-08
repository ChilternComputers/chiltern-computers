// HTML Structure Validation Scanner
// Save this as validate-html.mjs and run with: node validate-html.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Files to scan (adjust paths as needed)
const scanDirectories = [
  './src/pages',
  './src/components', 
  './src/layouts',
  './public' // for any static HTML files
];

const fileExtensions = ['.astro', '.html', '.htm'];

const issues = {
  multipleHeads: [],
  multipleBodies: [],
  multipleHtmlTags: [],
  multipleDoctypes: [],
  invalidHeadContent: [],
  missingStructure: []
};

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(process.cwd(), filePath);
    
    // Count HTML structure tags
    const headMatches = content.match(/<head[^>]*>/gi) || [];
    const bodyMatches = content.match(/<body[^>]*>/gi) || [];
    const htmlMatches = content.match(/<html[^>]*>/gi) || [];
    const doctypeMatches = content.match(/<!DOCTYPE[^>]*>/gi) || [];
    
    // Check for multiple structure tags
    if (headMatches.length > 1) {
      issues.multipleHeads.push({
        file: fileName,
        count: headMatches.length,
        matches: headMatches
      });
    }
    
    if (bodyMatches.length > 1) {
      issues.multipleBodies.push({
        file: fileName,
        count: bodyMatches.length,
        matches: bodyMatches
      });
    }
    
    if (htmlMatches.length > 1) {
      issues.multipleHtmlTags.push({
        file: fileName,
        count: htmlMatches.length
      });
    }
    
    if (doctypeMatches.length > 1) {
      issues.multipleDoctypes.push({
        file: fileName,
        count: doctypeMatches.length
      });
    }
    
    // Check for invalid content in head sections
    if (headMatches.length > 0) {
      // Look for content that shouldn't be in head
      const headContent = content.match(/<head[^>]*>([\s\S]*?)<\/head>/gi);
      if (headContent) {
        headContent.forEach(head => {
          const invalidTags = head.match(/<(?!meta|title|link|style|script|base|noscript)[a-z][^>]*>/gi);
          if (invalidTags) {
            issues.invalidHeadContent.push({
              file: fileName,
              invalidTags: invalidTags
            });
          }
        });
      }
    }
    
    // For layout files, check they have proper structure
    if (fileName.includes('Layout') || fileName.includes('layout')) {
      const hasDoctype = doctypeMatches.length > 0;
      const hasHtml = htmlMatches.length > 0;
      const hasHead = headMatches.length > 0;
      const hasBody = bodyMatches.length > 0;
      
      if (!hasDoctype || !hasHtml || !hasHead || !hasBody) {
        issues.missingStructure.push({
          file: fileName,
          missing: {
            doctype: !hasDoctype,
            html: !hasHtml,
            head: !hasHead,
            body: !hasBody
          }
        });
      }
    }
    
    // For component files, check they DON'T have structure tags
    if (!fileName.includes('Layout') && !fileName.includes('layout') && fileName.endsWith('.astro')) {
      if (headMatches.length > 0 || bodyMatches.length > 0 || htmlMatches.length > 0 || doctypeMatches.length > 0) {
        issues.invalidHeadContent.push({
          file: fileName,
          issue: 'Component has HTML structure tags (should only be in Layout)',
          tags: [...headMatches, ...bodyMatches, ...htmlMatches, ...doctypeMatches]
        });
      }
    }
    
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} not found, skipping...`);
    return;
  }
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      scanDirectory(fullPath);
    } else if (fileExtensions.some(ext => file.name.endsWith(ext))) {
      scanFile(fullPath);
    }
  });
}

// Scan all directories
console.log('🔍 Scanning for HTML validation issues...\n');

scanDirectories.forEach(dir => {
  console.log(`Scanning ${dir}...`);
  scanDirectory(dir);
});

// Report results
console.log('\n📊 VALIDATION RESULTS\n');

// Show detailed breakdown
console.log(`Files scanned: ${scanDirectories.length} directories`);
console.log(`Total issues found: ${Object.values(issues).reduce((sum, arr) => sum + arr.length, 0)}`);
console.log('');

if (issues.multipleHeads.length > 0) {
  console.log('❌ MULTIPLE HEAD TAGS:');
  issues.multipleHeads.forEach(issue => {
    console.log(`  📄 ${issue.file}: ${issue.count} head tags found`);
    issue.matches.forEach(match => console.log(`    - ${match.trim()}`));
  });
  console.log();
}

if (issues.multipleBodies.length > 0) {
  console.log('❌ MULTIPLE BODY TAGS:');
  issues.multipleBodies.forEach(issue => {
    console.log(`  📄 ${issue.file}: ${issue.count} body tags found`);
    issue.matches.forEach(match => console.log(`    - ${match.trim()}`));
  });
  console.log();
}

if (issues.multipleHtmlTags.length > 0) {
  console.log('❌ MULTIPLE HTML TAGS:');
  issues.multipleHtmlTags.forEach(issue => {
    console.log(`  📄 ${issue.file}: ${issue.count} html tags found`);
  });
  console.log();
}

if (issues.invalidHeadContent.length > 0) {
  console.log('❌ INVALID HEAD CONTENT OR STRUCTURE:');
  issues.invalidHeadContent.forEach(issue => {
    console.log(`  📄 ${issue.file}:`);
    if (issue.invalidTags) {
      console.log(`    ⚠️  Invalid tags in head: ${issue.invalidTags.join(', ')}`);
    }
    if (issue.issue) {
      console.log(`    ⚠️  ${issue.issue}`);
    }
    if (issue.tags) {
      issue.tags.forEach(tag => console.log(`    - ${tag.trim()}`));
    }
  });
  console.log();
}

if (issues.missingStructure.length > 0) {
  console.log('❌ MISSING STRUCTURE IN LAYOUT FILES:');
  issues.missingStructure.forEach(issue => {
    console.log(`  📄 ${issue.file}:`);
    Object.keys(issue.missing).forEach(tag => {
      if (issue.missing[tag]) {
        console.log(`    ❌ Missing: <${tag}>`);
      }
    });
  });
  console.log();
}

// Summary
const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);

if (totalIssues === 0) {
  console.log('✅ No HTML structure issues found!');
} else {
  console.log(`⚠️  Found ${totalIssues} files with HTML structure issues.`);
  console.log('\n🔧 RECOMMENDED FIXES:');
  console.log('1. Remove <head>, <body>, <html>, <!DOCTYPE> from component files');
  console.log('2. Ensure only Layout.astro has complete HTML structure');  
  console.log('3. Move any invalid tags from <head> to <body>');
  console.log('4. Check that components are properly using the Layout');
  
  console.log('\n🎯 SPECIFIC ACTIONS NEEDED:');
  
  if (issues.invalidHeadContent.length > 0) {
    console.log('📝 Files that need HTML structure tags removed:');
    issues.invalidHeadContent.forEach(issue => {
      if (issue.issue && issue.issue.includes('Component has HTML structure tags')) {
        console.log(`   - ${issue.file}`);
      }
    });
  }
  
  if (issues.multipleHeads.length > 0 || issues.multipleBodies.length > 0) {
    console.log('📝 Files with duplicate structure tags:');
    [...issues.multipleHeads, ...issues.multipleBodies].forEach(issue => {
      console.log(`   - ${issue.file}`);
    });
  }
}

console.log('\n📝 Next steps:');
console.log('- Fix the issues above');
console.log('- Rebuild your site');
console.log('- Re-run HTML validation');