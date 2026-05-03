
// === Stockholm Arlanda Airport (ARN01) ===

// === Stockholm Arlanda Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/sweden/stockholm/stockholm-arlanda-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Oslo Airport (OSL01) ===

// === Oslo Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/norway/oslo/oslo-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Copenhagen Airport (CPH01) ===

// === Copenhagen Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/denmark/copenhagen/copenhagen-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Helsinki Airport (HEL01) ===

// === Helsinki Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/finland/helsinki/helsinki-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Nice Airport (NCE01) ===

// === Nice Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/france/nice/nice-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Paris CDG Airport (CDG01) ===

// === Paris CDG Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/france/roissy/paris-cdg-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Paris Orly Airport (ORY01) ===

// === Paris Orly Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/france/paris/paris-orly-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Frankfurt Airport (FRA01) ===

// === Frankfurt Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/germany/frankfurt/frankfurt-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Munich Airport (MUC01) ===

// === Munich Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/germany/munich/munich-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Hamburg Airport (HAM01) ===

// === Hamburg Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/germany/hamburg/hamburg-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Berlin Brandenburg Airport (BER01) ===

// === Berlin Brandenburg Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/germany/berlin/berlin-brandenburg-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Dusseldorf Airport (DUS01) ===

// === Dusseldorf Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/germany/dusseldorf/dusseldorf-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Zurich Airport (ZRH01) ===

// === Zurich Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/switzerland/zurich/zurich-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Geneva Airport (GVA01) ===

// === Geneva Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/switzerland/geneva/geneva-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === London Heathrow Airport (LHR01) ===

// === London Heathrow Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/united-kingdom/london/london-heathrow-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === London Gatwick Airport (LGW01) ===

// === London Gatwick Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/united-kingdom/london/london-gatwick-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Rome Fiumicino Airport (FCO01) ===

// === Rome Fiumicino Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/italy/rome/rome-fiumicino-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Milan Malpensa Airport (MXP01) ===

// === Milan Malpensa Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/italy/milan/milan-ap-malpensa-t1/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Venice Airport (VCE01) ===

// === Venice Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/italy/venice/venice-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Barcelona Airport (BCN01) ===

// === Barcelona Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/spain/barcelona/bcn-barcelona-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Madrid Barajas Airport (MAD01) ===

// === Madrid Barajas Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/spain/madrid/madrid-barajas-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Amsterdam Schiphol Airport (AMS01) ===

// === Amsterdam Schiphol Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/netherlands/amsterdam/amsterdam-schiphol-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Vienna Airport (VIE01) ===

// === Vienna Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/austria/vienna/vienna-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Prague Airport (PRG01) ===

// === Prague Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/czech-republic/prague/prague-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Warsaw Airport (WAW01) ===

// === Warsaw Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/poland/warsaw/warsaw-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Budapest Airport (BUD01) ===

// === Budapest Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/hungary/budapest/budapest-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Athens Airport (ATH01) ===

// === Athens Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/greece/athens/athens-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Lisbon Airport (LIS01) ===

// === Lisbon Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/portugal/lisbon/lisbon-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Istanbul Airport (IST01) ===

// === Istanbul Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/turkey/istanbul/istanbul-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Dubai Int. Airport Terminal 3 (DXB01) ===

// === Dubai Int. Airport Terminal 3 ===
// Step 1: Visit: https://www.sixt.com/car-rental/united-arab-emirates/dubai/dubai-int-airport-terminal-3/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Abu Dhabi Airport (AUH01) ===

// === Abu Dhabi Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/united-arab-emirates/abu-dhabi/abu-dhabi-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Doha Hamad Airport (DOH01) ===

// === Doha Hamad Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/qatar/doha/doha-hamad-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Tel Aviv Airport (TLV01) ===

// === Tel Aviv Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/israel/tel-aviv/tel-aviv-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Singapore Changi Airport (SIN01) ===

// === Singapore Changi Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/singapore/singapore/singapore-changi-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Bangkok Suvarnabhumi Airport (BKK01) ===

// === Bangkok Suvarnabhumi Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/thailand/bangkok/bangkok-suvarnabhumi-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Hong Kong Airport (HKG01) ===

// === Hong Kong Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/hong-kong/hong-kong/hong-kong-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Tokyo Narita Airport (NRT01) ===

// === Tokyo Narita Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/japan/tokyo/tokyo-narita-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Tokyo Haneda Airport (HND01) ===

// === Tokyo Haneda Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/japan/tokyo/tokyo-haneda-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Seoul Incheon Airport (ICN01) ===

// === Seoul Incheon Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/south-korea/seoul/seoul-incheon-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Kuala Lumpur Airport (KUL01) ===

// === Kuala Lumpur Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/malaysia/kuala-lumpur/kuala-lumpur-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Manila Airport (MNL01) ===

// === Manila Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/philippines/manila/manila-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Jakarta Airport (CGK01) ===

// === Jakarta Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/indonesia/jakarta/jakarta-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === New York JFK Airport (JFK01) ===

// === New York JFK Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/new-york/jfk-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === New York LaGuardia Airport (LGA01) ===

// === New York LaGuardia Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/new-york/new-york-laguardia-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Newark Airport (EWR01) ===

// === Newark Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/newark/newark-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Los Angeles Airport (LAX01) ===

// === Los Angeles Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/los-angeles/los-angeles-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === San Francisco Airport (SFO01) ===

// === San Francisco Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/san-francisco/sfo-san-francisco-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Miami Airport (MIA01) ===

// === Miami Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/miami-fl/miami-international-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Las Vegas Airport (LAS01) ===

// === Las Vegas Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/las-vegas/las-vegas-mccarran-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Chicago OHare Airport (ORD01) ===

// === Chicago OHare Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/chicago/chicago-ohare-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Dallas Fort Worth Airport (DFW01) ===

// === Dallas Fort Worth Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/dallas/dallas-fort-worth-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Denver Airport (DEN01) ===

// === Denver Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/denver/denver-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Seattle Airport (SEA01) ===

// === Seattle Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/seattle/seattle-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Atlanta Airport (ATL01) ===

// === Atlanta Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/atlanta/atlanta-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Boston Airport (BOS01) ===

// === Boston Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/boston/boston-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Phoenix Airport (PHX01) ===

// === Phoenix Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/phoenix/phoenix-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Washington Dulles Airport (IAD01) ===

// === Washington Dulles Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/usa/washington-dc/washington-dulles-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Vancouver Airport (YVR01) ===

// === Vancouver Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/canada/vancouver/vancouver-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Toronto Pearson Airport (YYZ01) ===

// === Toronto Pearson Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/canada/toronto/toronto-pearson-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Sao Paulo Guarulhos Airport (GRU01) ===

// === Sao Paulo Guarulhos Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/brazil/sao-paulo/sao-paulo-guarulhos-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Rio de Janeiro Airport (GIG01) ===

// === Rio de Janeiro Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/brazil/rio-de-janeiro/rio-de-janeiro-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Buenos Aires Airport (EZE01) ===

// === Buenos Aires Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/argentina/buenos-aires/buenos-aires-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Santiago Airport (SCL01) ===

// === Santiago Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/chile/santiago/santiago-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Bogota Airport (BOG01) ===

// === Bogota Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/colombia/bogota/bogota-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Mexico City Airport (MEX01) ===

// === Mexico City Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/mexico/mexico-city/mexico-city-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Johannesburg Airport (JNB01) ===

// === Johannesburg Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/south-africa/johannesburg/johannesburg-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Cape Town Airport (CPT01) ===

// === Cape Town Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/south-africa/cape-town/cape-town-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Cairo Airport (CAI01) ===

// === Cairo Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/egypt/cairo/cairo-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Casablanca Airport (CMN01) ===

// === Casablanca Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/morocco/casablanca/casablanca-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Sydney Airport (SYD01) ===

// === Sydney Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/australia/sydney/sydney-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Melbourne Airport (MEL01) ===

// === Melbourne Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/australia/melbourne/melbourne-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()


// === Auckland Airport (AKL01) ===

// === Auckland Airport ===
// Step 1: Visit: https://www.sixt.com/car-rental/new-zealand/auckland/auckland-airport/
// Step 2: Run to get branch ID:
const link = document.querySelector('a[href*="betafunnel"]');
const branchId = link ? link.href.match(/BRANCH:(\d+)/)?.[1] : null;
console.log('Branch:', branchId);

// Step 3: Visit betafunnel (wait 8s):
// https://www.sixt.com/betafunnel/#/offerlist?uci=' + branchId + '&uda=20260903&rda=20260906&pickupTime=10:00&returnTime=10:00

// Step 4: Extract guaranteed models:
(() => {
  const h4s = document.querySelectorAll('h4');
  const cars = [];
  h4s.forEach(h4 => {
    let btn = h4;
    for (let i = 0; i < 10; i++) {
      if (!btn.parentElement) break;
      btn = btn.parentElement;
      if (btn.tagName === 'BUTTON') break;
    }
    if (btn.tagName !== 'BUTTON') return;
    const text = btn.textContent.trim().replace(/\s+/g, ' ');
    if (!text.includes('Guaranteed model')) return;
    const priceMatch = text.match(/\$(\d+(?:\.\d+)?)\s*\/\s*day/);
    const priceStr = priceMatch ? '$' + priceMatch[1] + '/day' : 'N/A';
    const para = btn.querySelector('p');
    const category = para ? para.textContent.trim().replace('Guaranteed model | ', '') : 'Car';
    cars.push({ model: h4.textContent.trim(), category, price: priceStr });
  });
  return cars;
})()
