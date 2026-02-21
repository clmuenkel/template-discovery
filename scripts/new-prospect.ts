#!/usr/bin/env npx tsx
/**
 * New Prospect Setup Script
 *
 * Usage: npx tsx scripts/new-prospect.ts
 *
 * Walks you through creating a new prospect config.
 * After running, add the output to src/config/prospects.ts
 */

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function main() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  EVIOS — New Prospect Setup");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const companyName = await ask("Company name: ");
  const slug =
    (await ask(
      `URL slug (default: ${companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}): `
    )) || companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  console.log(`\n→ Site will be at: ${slug}.evioshq.com\n`);

  const contactFirst = await ask("Contact first name: ");
  const contactLast = await ask("Contact last name: ");
  const contactTitle = await ask("Contact title (e.g., Owner): ");
  const industry = await ask("Industry (e.g., Plumbing, HVAC): ");

  console.log("\n--- LinkedIn Info (leave blank to skip) ---\n");

  const linkedinUrl = await ask("LinkedIn profile URL: ");
  const university = await ask("University: ");
  const degree = await ask("Degree: ");
  const prevCompanies = await ask("Previous companies (comma-separated): ");
  const yearsInBiz = await ask("Years in business: ");
  const interests = await ask("Interests/hobbies (comma-separated): ");
  const funFact = await ask("Fun fact: ");

  console.log("\n--- Call Notes (leave blank to skip) ---\n");

  const callNotes = await ask("Brief call notes: ");
  const painPointsRaw = await ask("Pain points (comma-separated): ");
  const solutionsRaw = await ask("Suggested solutions (comma-separated): ");

  const config = {
    slug,
    companyName,
    contactFirstName: contactFirst,
    contactLastName: contactLast,
    contactTitle,
    logoUrl: `/prospects/${slug}/logo.png`,
    industry,
    linkedin: {
      ...(linkedinUrl && { profileUrl: linkedinUrl }),
      ...(university && { university }),
      ...(degree && { degree }),
      ...(prevCompanies && {
        previousCompanies: prevCompanies.split(",").map((s: string) => s.trim()),
      }),
      ...(yearsInBiz && { yearsInBusiness: parseInt(yearsInBiz) }),
      ...(interests && {
        interests: interests.split(",").map((s: string) => s.trim()),
      }),
      ...(funFact && { funFact }),
    },
    ...(callNotes && { callNotes }),
    ...(painPointsRaw && {
      painPoints: painPointsRaw.split(",").map((s: string) => s.trim()),
    }),
    ...(solutionsRaw && {
      suggestedSolutions: solutionsRaw.split(",").map((s: string) => s.trim()),
    }),
  };

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Add this to src/config/prospects.ts:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`"${slug}": ${JSON.stringify(config, null, 2)},`);

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Next steps:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  1. Add the config above to src/config/prospects.ts`);
  console.log(
    `  2. Place the company logo at: public/prospects/${slug}/logo.png`
  );
  console.log(`  3. Deploy → ${slug}.evioshq.com is live`);
  console.log(`  4. For local testing: http://localhost:3000?slug=${slug}\n`);

  rl.close();
}

main().catch(console.error);
