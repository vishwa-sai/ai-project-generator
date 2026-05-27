// ==========================
// DOM ELEMENTS
// ==========================
const branchEl = document.getElementById("branch");
const subBranchEl = document.getElementById("subBranch");
const levelEl = document.getElementById("level");
const countEl = document.getElementById("count");
const resultsEl = document.getElementById("results");
const loader = document.getElementById("loader");

const drawer = document.getElementById("drawer");
const drawerContent = document.getElementById("drawerContent");

// ==========================
// MEMORY (NO REPEAT)
// ==========================
let usedIdeas = JSON.parse(localStorage.getItem("usedIdeas")) || [];

// ==========================
// BRANCH → SUBDOMAIN MAP
// ==========================
const branchData = {
  CSE: ["Web Development","AI/ML","Cloud","DevOps","Cybersecurity","Mobile Apps"],
  IT: ["Web Apps","Cloud Systems","Data Analytics","Automation Tools"],
  AI_DS: ["Machine Learning","Deep Learning","NLP","Computer Vision"],
  CYBER: ["Ethical Hacking","Network Security","Digital Forensics"],
  ECE: ["IoT","Embedded Systems","Signal Processing","Robotics"],
  EEE: ["Power Systems","Smart Grid","Automation"],
  MECH: ["Robotics","CAD","Thermal Systems","Automobile"],
  AUTO: ["EV Systems","Vehicle Tracking","Smart Mobility"],
  AERO: ["Drone Tech","Flight Systems","Navigation"],
  CIVIL: ["Smart Cities","Structural Analysis","Construction Tech"],
  ARCH: ["3D Design","Urban Planning","Smart Interiors"],
  CHEM: ["Process Automation","Energy Systems","Industrial Safety"],
  BIOTECH: ["Bioinformatics","Healthcare Systems","Genetics"],
  AGRI: ["Smart Farming","Irrigation Systems","Crop Monitoring"],
  MARINE: ["Navigation Systems","Ship Monitoring","Marine Safety"],
  TEXTILE: ["Fabric Analysis","Production Systems","Automation"]
};

// ==========================
// LOAD SUBDOMAINS
// ==========================
function updateSubBranches() {
  const branch = branchEl.value;
  const subs = branchData[branch] || [];

  subBranchEl.innerHTML = "";

  subs.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    subBranchEl.appendChild(opt);
  });
}

branchEl.addEventListener("change", updateSubBranches);
updateSubBranches();

// ==========================
// RANDOM DATA POOLS
// ==========================
const problems = [
  "reducing operational cost",
  "improving efficiency",
  "real-time monitoring",
  "automating workflows",
  "enhancing security",
  "data-driven decision making",
  "energy optimization",
  "smart automation"
];

const industries = [
  "Healthcare",
  "Finance",
  "Education",
  "Agriculture",
  "Transport",
  "Manufacturing",
  "Smart Cities",
  "Energy"
];

const featuresPool = [
  "Real-time dashboard",
  "AI prediction engine",
  "Automated alerts",
  "User authentication",
  "Data visualization",
  "Cloud integration",
  "API-based system",
  "Analytics module"
];

const techStackPool = [
  "MERN Stack",
  "React + Node.js",
  "Python + Flask",
  "Django + PostgreSQL",
  "IoT + Arduino + Cloud",
  "TensorFlow + Python",
  "Firebase + React"
];

// ==========================
// RANDOM FUNCTION
// ==========================
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ==========================
// GENERATE UNIQUE IDEA
// ==========================
function generateIdea(sub, level) {

  let title;
  let attempts = 0;

  do {
    title = `${sub} System for ${rand(problems)} in ${rand(industries)}`;
    attempts++;
  } while (usedIdeas.includes(title) && attempts < 50);

  usedIdeas.push(title);
  localStorage.setItem("usedIdeas", JSON.stringify(usedIdeas));

  return {
    title,

    description: `A ${level} level project focused on ${rand(problems)} using ${sub} technologies in the ${rand(industries)} domain.`,

    features: [
      rand(featuresPool),
      rand(featuresPool),
      rand(featuresPool),
      "Scalable architecture"
    ],

    tech: rand(techStackPool),

    roadmap: [
      "Problem identification & research",
      "System design & architecture planning",
      "Frontend + backend development",
      "Integration of core features",
      "Testing & debugging",
      "Deployment and optimization"
    ],

    resources: [
      "YouTube tutorials",
      "Official documentation",
      "GitHub open-source projects",
      "Stack Overflow"
    ],

    resume: "Demonstrates real-world problem solving, system design, and modern tech stack usage."
  };
}

// ==========================
// GENERATE MULTIPLE IDEAS
// ==========================
function generateIdeas() {
  loader.classList.remove("hidden");
  resultsEl.innerHTML = "";

  setTimeout(() => {

    const count = parseInt(countEl.value);
    const ideas = [];

    for (let i = 0; i < count; i++) {
      ideas.push(generateIdea(subBranchEl.value, levelEl.value));
    }

    renderIdeas(ideas);
    loader.classList.add("hidden");

  }, 800);
}

// ==========================
// RENDER IDEAS
// ==========================
function renderIdeas(ideas) {
  resultsEl.innerHTML = "";

  ideas.forEach(idea => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>
    `;

    card.onclick = () => showDetails(idea);

    resultsEl.appendChild(card);
  });
}

// ==========================
// SHOW DETAILS (DRAWER)
// ==========================
function showDetails(idea) {

  drawer.classList.remove("hidden");

  drawerContent.innerHTML = `
    <h2>${idea.title}</h2>

    <h3>Description</h3>
    <p>${idea.description}</p>

    <h3>Features</h3>
    <ul>${idea.features.map(f => `<li>${f}</li>`).join("")}</ul>

    <h3>Tech Stack</h3>
    <p>${idea.tech}</p>

    <h3>Roadmap</h3>
    <ul>${idea.roadmap.map(r => `<li>${r}</li>`).join("")}</ul>

    <h3>Resources</h3>
    <ul>${idea.resources.map(r => `<li>${r}</li>`).join("")}</ul>

    <h3>Resume Value</h3>
    <p>${idea.resume}</p>
  `;
}

// ==========================
// CLOSE DRAWER
// ==========================
function closeDrawer() {
  drawer.classList.add("hidden");
}

// ==========================
// EVENTS
// ==========================
document.getElementById("generateBtn").onclick = generateIdeas;
document.getElementById("regenBtn").onclick = generateIdeas;
