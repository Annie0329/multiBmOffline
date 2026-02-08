// ===============================
// Canvas setup
// ===============================
const canvas = document.getElementById("drawingCanvas");
const realCtx = canvas.getContext("2d");

// SVG context (canvas2svg)
const svgCtx = new C2S(canvas.width, canvas.height);

// ===============================
// Config
// ===============================
const LINE_WIDTH = 2;
const DOT_RADIUS = 5;
const MOVE_THRESHOLD = 3; // px

// ===============================
// State
// ===============================
let drawing = false;
let hasMoved = false;
let startX = 0;
let startY = 0;
let currentColor = "red"; // default

// ===============================
// Style
// ===============================
function applyBaseStyle(ctx) {
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

// Apply base styles once
applyBaseStyle(realCtx);
applyBaseStyle(svgCtx);

// ===============================
// Color selector
// ===============================
const colorSelect = document.getElementById("color");

colorSelect.addEventListener("change", () => {
    currentColor = colorSelect.value;
});

// ===============================
// Pointer Events
// ===============================
canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    drawing = true;
    hasMoved = false;

    // Apply CURRENT color at stroke start
    realCtx.strokeStyle = currentColor;
    realCtx.fillStyle = currentColor;

    svgCtx.strokeStyle = currentColor;
    svgCtx.fillStyle = currentColor;

    canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - startX;
    const dy = y - startY;

    // Start line only after movement threshold
    if (!hasMoved && Math.hypot(dx, dy) > MOVE_THRESHOLD) {
        hasMoved = true;

        realCtx.beginPath();
        realCtx.moveTo(startX, startY);

        svgCtx.beginPath();
        svgCtx.moveTo(startX, startY);
    }

    if (hasMoved) {
        realCtx.lineTo(x, y);
        realCtx.stroke();

        svgCtx.lineTo(x, y);
        svgCtx.stroke();
    }
});

canvas.addEventListener("pointerup", finishStroke);
canvas.addEventListener("pointercancel", finishStroke);
canvas.addEventListener("pointerleave", finishStroke);

function finishStroke(e) {
    if (!drawing) return;

    // TAP → DOT
    if (!hasMoved) {
        realCtx.beginPath();
        realCtx.arc(startX, startY, DOT_RADIUS, 0, Math.PI * 2);
        realCtx.fill();

        svgCtx.beginPath();
        svgCtx.arc(startX, startY, DOT_RADIUS, 0, Math.PI * 2);
        svgCtx.fill();
    }

    drawing = false;
    hasMoved = false;

    if (e?.pointerId !== undefined) {
        canvas.releasePointerCapture(e.pointerId);
    }
}

// ===============================
// Export SVG
// ===============================
document.getElementById("exportBtn").addEventListener("click", () => {
    const svgString = svgCtx.getSerializedSvg(true);

    const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "drawing.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
});
