#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Check if Vercel CLI is installed
try {
  execSync("vercel --version", { stdio: "ignore" })
} catch (error) {
  console.log("Installing Vercel CLI...")
  execSync("npm i -g vercel", { stdio: "inherit" })
}

console.log("Preparing for Vercel deployment...")

// Create a README for Vercel deployment
const readmePath = path.join(__dirname, "VERCEL_DEPLOYMENT.md")
const readmeContent = `# Holy Unblocker Vercel Deployment

This is a Vercel deployment of Holy Unblocker, a web proxy service that helps you access websites that may be blocked by your network or policy extensions.

## Deployment Instructions

1. Fork this repository
2. Sign up for Vercel (https://vercel.com)
3. Import your forked repository
4. Deploy!

## Features

- Access blocked websites
- Browse securely and privately
- No downloads or setup required
- Tor/Onion sites support
- Hide browsing activity

For more information, visit [holyunblocker.org](https://holyunblocker.org)
`

fs.writeFileSync(readmePath, readmeContent)

console.log("Deployment files created successfully!")
console.log("To deploy to Vercel:")
console.log("1. Run: vercel")
console.log("2. Or use the Vercel GitHub integration")
console.log("3. Or use the Deploy Button in the README")

// Add a Deploy with Vercel button to the README
const mainReadmePath = path.join(__dirname, "README.md")
if (fs.existsSync(mainReadmePath)) {
  let mainReadme = fs.readFileSync(mainReadmePath, "utf8")
  if (!mainReadme.includes("Deploy with Vercel")) {
    const deployButton = `
## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FQuiteAFancyEmerald%2FHoly-Unblocker)
`
    mainReadme += deployButton
    fs.writeFileSync(mainReadmePath, mainReadme)
    console.log("Added Deploy with Vercel button to README.md")
  }
}

console.log("Done!")

