import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");
const trunk = document.getElementById("trunk");

function onClick() {
  this.style.pointerEvents = "none";
  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

// Create left branch SVG - bows outward from trunk like (
function createLeftBranch() {
  // Wrapper to clip the connector at the trunk line
  const wrapper = document.createElement("div");
  wrapper.className = "branch-connector-wrapper branch-connector-wrapper-left";
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "branch-connector branch-connector-left");
  svg.setAttribute("viewBox", "0 0 20 28");
  
  // Curved bow: starts at trunk (right edge, bottom+4), bows outward to the left, ends at option (left edge, middle)
  // Path extends past viewBox bottom to ensure overlap with trunk
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M20,32 C20,14 0,28 0,14");
  svg.appendChild(path);
  wrapper.appendChild(svg);
  
  return wrapper;
}

// Create right branch SVG - bows outward from trunk like )
function createRightBranch() {
  // Wrapper to clip the connector at the trunk line
  const wrapper = document.createElement("div");
  wrapper.className = "branch-connector-wrapper branch-connector-wrapper-right";
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "branch-connector branch-connector-right");
  svg.setAttribute("viewBox", "0 0 20 28");
  
  // Curved bow: starts at trunk (left edge, bottom+4), bows outward to the right, ends at option (right edge, middle)
  // Path extends past viewBox bottom to ensure overlap with trunk
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,32 C0,14 20,28 20,14");
  svg.appendChild(path);
  wrapper.appendChild(svg);
  
  return wrapper;
}

// Create vertical connector for single/centered options
function createVerticalConnector() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "vertical-connector");
  svg.setAttribute("viewBox", "0 0 2 24");
  
  // Draw from bottom (trunk) to top (option)
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "1");
  line.setAttribute("y1", "24");
  line.setAttribute("x2", "1");
  line.setAttribute("y2", "0");
  svg.appendChild(line);
  
  return svg;
}

// Create a single option element
function createOptionElement(optionData) {
  const option = document.createElement("div");
  option.className = "option-container";
  
  const iconColor = optionData.data.iconColor || "currentColor";
  option.innerHTML = `
    <span class="option-icon" style="border-color: ${iconColor}; color: ${iconColor};">
      <i class="fas fa-fw ${optionData.data.icon}"></i>
    </span>
    <p class="option-label">${optionData.data.label}</p>
  `;
  
  option.targetType = optionData.type;
  option.targetId = optionData.id;
  option.zoneId = optionData.zoneId;
  option.addEventListener("click", onClick);
  
  return option;
}

// Create the tree layout with branches extending outward from center
export function createTreeLayout(options) {
  // Hide during setup to prevent flickering
  optionsWrapper.classList.add("preparing");
  trunk.classList.add("preparing");
  trunk.classList.remove("animate");
  optionsWrapper.innerHTML = "";
  
  if (!options || options.length === 0) {
    trunk.style.height = "0";
    trunk.classList.remove("preparing");
    optionsWrapper.classList.remove("preparing");
    return;
  }

  const rows = [];
  const baseDelay = 0.12;
  
  // Pair options into rows (left, right)
  for (let i = 0; i < options.length; i += 2) {
    rows.push({ 
      left: options[i], 
      right: options[i + 1] || null 
    });
  }

  // Build all rows first using document fragment
  const fragment = document.createDocumentFragment();
  
  // Collect all elements that need animation delays
  const animationTargets = [];

  rows.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.className = "option-row";
    
    const delay = rowIndex * baseDelay;
    const isSingleOption = !row.right;
    
    if (isSingleOption) {
      // Single centered option
      rowElement.classList.add("single-option");
      
      const branch = document.createElement("div");
      branch.className = "branch branch-center";
      
      // Vertical connector
      const connector = createVerticalConnector();
      const line = connector.querySelector("line");
      // Pre-set animation delay immediately
      line.style.animationDelay = `${delay}s`;
      animationTargets.push(line);
      
      const optionEl = createOptionElement(row.left);
      optionEl.style.animationDelay = `${delay + 0.15}s`;
      animationTargets.push(optionEl);
      
      branch.appendChild(optionEl);
      branch.appendChild(connector);
      rowElement.appendChild(branch);
    } else {
      // Create grid structure for proper alignment
      const leftContainer = document.createElement("div");
      leftContainer.className = "option-row-left";
      
      const centerContainer = document.createElement("div");
      centerContainer.className = "option-row-center";
      
      const rightContainer = document.createElement("div");
      rightContainer.className = "option-row-right";
      
      // Left branch: [option] [connector-->]
      const leftBranch = document.createElement("div");
      leftBranch.className = "branch branch-left";
      
      const leftOption = createOptionElement(row.left);
      leftOption.style.animationDelay = `${delay + 0.2}s`;
      animationTargets.push(leftOption);
      
      const leftConnector = createLeftBranch();
      const leftPath = leftConnector.querySelector("path");
      leftPath.style.animationDelay = `${delay}s`;
      animationTargets.push(leftPath);
      
      leftBranch.appendChild(leftOption);
      leftBranch.appendChild(leftConnector);
      leftContainer.appendChild(leftBranch);
      
      // Right branch: [<--connector] [option]
      const rightBranch = document.createElement("div");
      rightBranch.className = "branch branch-right";
      
      const rightConnector = createRightBranch();
      const rightPath = rightConnector.querySelector("path");
      rightPath.style.animationDelay = `${delay}s`;
      animationTargets.push(rightPath);
      
      const rightOption = createOptionElement(row.right);
      rightOption.style.animationDelay = `${delay + 0.2}s`;
      animationTargets.push(rightOption);
      
      rightBranch.appendChild(rightConnector);
      rightBranch.appendChild(rightOption);
      rightContainer.appendChild(rightBranch);
      
      rowElement.appendChild(leftContainer);
      rowElement.appendChild(centerContainer);
      rowElement.appendChild(rightContainer);
    }
    
    fragment.appendChild(rowElement);
  });

  // Append all at once
  optionsWrapper.appendChild(fragment);

  // Use double RAF to ensure layout is fully calculated before animating
  requestAnimationFrame(() => {
    // First frame: calculate layout while hidden
    updateTrunkHeight(rows);
    
    requestAnimationFrame(() => {
      // Second frame: reveal and start all animations together
      trunk.classList.remove("preparing");
      optionsWrapper.classList.remove("preparing");
      
      // Start all animations
      animationTargets.forEach(el => el.classList.add("animate"));
      trunk.classList.add("animate");
    });
  });
}

// Update trunk height based on actual rendered content
function updateTrunkHeight(rows) {
  const allRows = optionsWrapper.querySelectorAll(".option-row");
  if (allRows.length === 0) return;
  
  // Check if top row is a single option
  const hasTopSingle = rows.length > 0 && !rows[rows.length - 1].right;
  
  // Get the topmost row element (last in DOM due to column-reverse)
  const topRow = allRows[allRows.length - 1];
  const topRowRect = topRow.getBoundingClientRect();
  
  // Get trunk dot position (center of screen)
  const trunkDot = document.getElementById("trunk-dot");
  const dotRect = trunkDot.getBoundingClientRect();
  const dotCenterY = dotRect.top + dotRect.height / 2;
  
  // Calculate trunk height: from dot to the connection point of topmost row
  let trunkEndY;
  
  if (hasTopSingle) {
    // For single option, trunk goes to bottom of the vertical connector
    const verticalConnector = topRow.querySelector(".vertical-connector");
    if (verticalConnector) {
      const connectorRect = verticalConnector.getBoundingClientRect();
      trunkEndY = connectorRect.bottom;
    } else {
      trunkEndY = topRowRect.bottom;
    }
  } else {
    // For paired options, trunk goes to where the branch connectors attach (bottom of connector)
    const connector = topRow.querySelector(".branch-connector");
    if (connector) {
      const connectorRect = connector.getBoundingClientRect();
      // The path starts below the viewBox (y=32 in a 28pt viewBox) to ensure overlap
      // Trunk extends 4pt higher than connector bottom to create overlap
      trunkEndY = connectorRect.bottom - 4;
    } else {
      trunkEndY = topRowRect.bottom;
    }
  }
  
  // Trunk height is from dot center to the top connection point
  let trunkHeight = dotCenterY - trunkEndY;
  
  if (trunkHeight <= 0) return;
  
  // Set trunk SVG dimensions using pixels
  trunk.setAttribute("width", "2");
  trunk.setAttribute("height", `${trunkHeight}px`);
  trunk.setAttribute("viewBox", `0 0 2 ${trunkHeight}`);
  
  const trunkLine = trunk.querySelector("line");
  trunkLine.setAttribute("x1", "1");
  trunkLine.setAttribute("y1", trunkHeight);
  trunkLine.setAttribute("x2", "1");
  trunkLine.setAttribute("y2", "0");
  
  // Update dash array for animation
  trunkLine.style.strokeDasharray = trunkHeight + 50;
  trunkLine.style.strokeDashoffset = trunkHeight + 50;
  
  // Remove animate class - animation will be triggered when class is re-added
  trunk.classList.remove("animate");
}

// Legacy function for backwards compatibility
export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  const iconElement = `<i class="fa-fw ${data.icon} option-icon" ${
    data.iconColor ? `style = color:${data.iconColor} !important` : null
  }"></i>`;

  option.innerHTML = `${iconElement}<p class="option-label">${data.label}</p>`;
  option.className = "option-container";
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;

  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
}