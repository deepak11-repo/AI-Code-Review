function changeBackground() {
    
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF2"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;

    // Logging color to console unnecessarily
    console.log("Background color changed to:", randomColor);
}
