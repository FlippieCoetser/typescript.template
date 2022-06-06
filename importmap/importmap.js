const script = document.createElement('script');
script.type = 'importmap';
script.textContent = JSON.stringify({
    "imports": {
        "calculator": "../lib/Calculator.js"
    }
});
document.currentScript.after(script);