// Initializing variables
const backgroundColorInput = document.getElementById('background-color');
const fontFamilyInput = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const bionicReadingToggle = document.getElementById('bionic-reading');
const readOutLoudToggle = document.getElementById('read-out-loud');
const dyslexiaRulerToggle = document.getElementById('dyslexia-ruler-toggle');
const rulerHeightInput = document.getElementById('ruler-height');
const focusModeToggle = document.getElementById('focus-mode');
const dyslexiaRuler = document.createElement('div');
dyslexiaRuler.classList.add('ruler');
document.body.appendChild(dyslexiaRuler);

// Apply background color
backgroundColorInput.addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

// Apply font family
fontFamilyInput.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
});

// Apply font size
fontSizeInput.addEventListener('input', (e) => {
    document.body.style.fontSize = `${e.target.value}px`;
});

// Enable/Disable Bionic Reading Mode
bionicReadingToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('bionic-reading');
    } else {
        document.body.classList.remove('bionic-reading');
    }
});

// Enable/Disable Read Out Loud
readOutLoudToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.addEventListener('mouseup', readSelectedText);
    } else {
        document.body.removeEventListener('mouseup', readSelectedText);
    }
});

function readSelectedText() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        const utterance = new SpeechSynthesisUtterance(selectedText);
        speechSynthesis.speak(utterance);
    }
}

// Enable/Disable Dyslexia Ruler
dyslexiaRulerToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        dyslexiaRuler.style.display = 'block';
        updateRulerPosition();
        document.body.addEventListener('mousemove', updateRulerPosition);
    } else {
        dyslexiaRuler.style.display = 'none';
        document.body.removeEventListener('mousemove', updateRulerPosition);
    }
});

function updateRulerPosition() {
    const rulerHeight = rulerHeightInput.value;
    dyslexiaRuler.style.height = `${rulerHeight}px`;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        dyslexiaRuler.style.top = `${rect.top - window.scrollY}px`;
    }
}

// Enable Focus Mode
focusModeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('highlight-focus');
    } else {
        document.body.classList.remove('highlight-focus');
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        window.scrollBy(0, -50);
    }
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, 50);
    }
    if (e.key === 'ArrowLeft') {
        history.back();
    }
    if (e.key === 'ArrowRight') {
        history.forward();
    }
    if (e.key === 'Enter') {
        const clickableElement = document.querySelector(':focus');
        if (clickableElement) {
            clickableElement.click();
        }
    }
    if (e.key === 'Tab') {
        const nextFocusableElement = document.querySelector('a, button, input, select, textarea');
        if (nextFocusableElement) {
            nextFocusableElement.focus();
        }
    }
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => modal.style.display = 'none');
    }
});
