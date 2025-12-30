
<div align="center">

<h2>ox_target-redesign</h2>
Casper's official redesign of ox_target, with heavy inspiration.

**A premium visual rework of ox_target with an elegant tree-branch UI**

[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)
[![Original](https://img.shields.io/badge/based%20on-ox__target-blue.svg)](https://github.com/overextended/ox_target)

</div>

---

## ✨ Features

- **Tree Branch Layout** — Options elegantly branch outward from a central trunk with smooth curved connectors
- **Staggered Animations** — Each row animates in sequence with perfectly timed delays for a polished reveal
- **Flicker-Free Rendering** — Optimized DOM batching and GPU-accelerated animations for buttery smooth performance
- **Responsive Design** — Seamlessly handles any number of options, from 2 to 20+
- **Modern Aesthetic** — Clean, minimal design with customizable accent colors

## 🎨 Preview

<div align="center">

| One Option | Two Options | Multiple Options |
|:---------:|:---------:|:---------:|
| <img width="500" alt="image" src="https://github.com/user-attachments/assets/e38f9db7-e343-46dc-b388-51d66bf60320" /> | <img width="500" alt="image" src="https://github.com/user-attachments/assets/d6852956-be73-4006-bb1e-2dc94543bb9d" /> | <img width="500" alt="image" src="https://github.com/user-attachments/assets/22bdd4da-6a22-40f8-a0f0-2439c8ab4aaf" /> |

**[Youtube Video](https://www.youtube.com/watch?v=VRpzmTYdX54)**
<p>Errors in the video are fixed, old video. :)</p>

</div>

## 📦 Installation

1. Download the latest release
2. Extract to your `resources` folder
3. Add `ensure royal_ox_target` to your `server.cfg`
4. Restart your server

## ⚙️ Configuration

Customize the appearance in `style.css`:

```css
:root {
  --color-default: #BFFF74;      /* Icon and text accent color */
  --color-branch: #BFFF74;       /* Branch/trunk line color */
  --color-bg: #101010;           /* Option background */
  --color-bg-hover: #181F00;     /* Option hover background */
  --animation-duration: 0.5s;    /* Animation speed */
}
```

## 🔧 Technical Highlights

- **Zero Flicker** — Uses `visibility: hidden` during setup with double `requestAnimationFrame` for perfectly synchronized reveals
- **GPU Optimized** — `will-change` and `contain` properties for hardware-accelerated animations
- **SVG Connectors** — Crisp vector paths that scale perfectly at any resolution
- **Document Fragments** — Batch DOM operations prevent layout thrashing

## 🙏 Credits

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/overextended">
        <img src="https://avatars.githubusercontent.com/u/82355302?s=100" width="100px;" alt="Overextended"/>
        <br />
        <sub><b>Overextended</b></sub>
      </a>
      <br />
      <sub>Original ox_target</sub>
    </td>
  </tr>
</table>

This project is a visual rework built upon the incredible **[ox_target](https://github.com/overextended/ox_target)** by the [Overextended](https://github.com/overextended) team. Their work provides the robust targeting foundation that makes this possible.

> **ox_target** is a performant and flexible targeting solution for FiveM, built by the talented developers at Overextended. We highly recommend checking out their full ecosystem of resources.

## 📄 License

This project inherits the [GPL-3.0 License](LICENSE) from the original ox_target.

---

<div align="center">

**[Discord](https://discord.gg/9PDYzEvD82)**

Made with 💚 by casper for the FiveM community

</div>
