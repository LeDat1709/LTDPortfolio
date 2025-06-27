// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.zIndex = "-3"
    canvas.style.pointerEvents = "none"

    document.body.appendChild(canvas)

    function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = []

    for (let i = 0; i < columns; i++) {
        drops[i] = 1
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#00ff00"
        ctx.font = fontSize + "px monospace"

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)]
            ctx.fillText(text, i * fontSize, drops[i] * fontSize)

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0
            }
            drops[i]++
        }
    }

    setInterval(draw, 50)
}

// Glitch effects
function addGlitchEffects() {
    const glitchElements = document.querySelectorAll(".glitch-text, .glitch-subtitle, .glitch-name, .glitch-title")

    glitchElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            element.style.animation = "glitchText 0.1s infinite"
            setTimeout(() => {
                element.style.animation = "glitchText 0.5s infinite"
            }, 500)
        })
    })
}

// Typing effect for terminal
function typeWriter(element, text, speed = 50) {
    let i = 0
    element.innerHTML = ""

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i)
            i++
            setTimeout(type, speed)
        }
    }

    type()
}

// Random glitch effect
function randomGlitch() {
    const elements = document.querySelectorAll(".profile-image, .profile-img, .project-image img")

    setInterval(() => {
        if (Math.random() > 0.95) {
            elements.forEach((img) => {
                img.style.filter = "contrast(1.5) brightness(1.2) hue-rotate(" + Math.random() * 360 + "deg)"
                setTimeout(() => {
                    img.style.filter = "contrast(1.2) brightness(0.8) hue-rotate(90deg)"
                }, 100)
            })
        }
    }, 1000)
}

// Cursor trail effect
function createCursorTrail() {
    const trail = []
    const trailLength = 10

    document.addEventListener("mousemove", (e) => {
        trail.push({ x: e.clientX, y: e.clientY })

        if (trail.length > trailLength) {
            trail.shift()
        }

        // Remove existing trail elements
        document.querySelectorAll(".cursor-trail").forEach((el) => el.remove())

        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement("div")
            trailElement.className = "cursor-trail"
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${2 + index}px;
                height: ${2 + index}px;
                background: #00ff00;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${index / trailLength};
                transform: translate(-50%, -50%);
            `
            document.body.appendChild(trailElement)

            setTimeout(() => {
                trailElement.remove()
            }, 100)
        })
    })
}

// Screen shake effect
function screenShake() {
    const body = document.body
    const originalTransform = body.style.transform

    const shakeIntensity = 2
    let shakeCount = 0
    const maxShakes = 10

    const shake = setInterval(() => {
        if (shakeCount >= maxShakes) {
            clearInterval(shake)
            body.style.transform = originalTransform
            return
        }

        const x = (Math.random() - 0.5) * shakeIntensity
        const y = (Math.random() - 0.5) * shakeIntensity

        body.style.transform = `translate(${x}px, ${y}px)`
        shakeCount++
    }, 50)
}

// Audio effects (optional - requires audio files)
function playGlitchSound() {
    // You can add audio files and play them here
    // const audio = new Audio('glitch-sound.mp3');
    // audio.volume = 0.1;
    // audio.play();
}

// Initialize effects when page loads
document.addEventListener("DOMContentLoaded", () => {
    createMatrixRain()
    addGlitchEffects()
    randomGlitch()
    createCursorTrail()

    // Add click effects to buttons
    document.querySelectorAll(".cyber-button").forEach((button) => {
        button.addEventListener("click", () => {
            screenShake()
            playGlitchSound()
        })
    })

    // Terminal typing effect
    const terminalCommand = document.querySelector(".typing-effect")
    if (terminalCommand) {
        const originalText = terminalCommand.textContent
        typeWriter(terminalCommand, originalText, 100)
    }

    // Skill bar animations
    const skillBars = document.querySelectorAll(".skill-progress")
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "skillLoad 2s ease-in-out forwards"
            }
        })
    })

    skillBars.forEach((bar) => observer.observe(bar))

    // Project card hover effects
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            if (Math.random() > 0.7) {
                card.style.animation = "glitchText 0.2s ease"
                setTimeout(() => {
                    card.style.animation = ""
                }, 200)
            }
        })
    })

    // Random screen effects
    setInterval(() => {
        if (Math.random() > 0.98) {
            const overlay = document.querySelector(".glitch-overlay")
            overlay.style.opacity = "0.3"
            setTimeout(() => {
                overlay.style.opacity = "1"
            }, 100)
        }
    }, 2000)
})

// Konami code easter egg
let konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // Up Up Down Down Left Right Left Right B A

document.addEventListener("keydown", (e) => {
    konamiCode.push(e.keyCode)

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift()
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
        // Easter egg activated
        document.body.style.animation = "glitchText 0.1s infinite"
        alert("HORROR MODE ACTIVATED! 👻")
        setTimeout(() => {
            document.body.style.animation = ""
        }, 3000)
        konamiCode = []
    }
})

// Performance optimization
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Optimize resize events
window.addEventListener(
    "resize",
    debounce(() => {
        // Recalculate positions and sizes if needed
    }, 250),
)
