# 🟡 Pac-Man (Mini Version)

A browser-based recreation of the classic **Pac-Man** game using **HTML, CSS, and JavaScript**. This project is a portfolio piece that demonstrates **game logic, AI behavior, collision detection, and front-end design**.  

Play it live here: [Pac-Man Demo](https://aarondweck.github.io/Project-1-Pac-Man/)

---

## 📖 Description

This is a mini version of the original Pac-Man, which was released worldwide in **December 1980**. In this game:  

- Pac-Man navigates a maze eating all the pellets.  
- If Pac-Man eats a **power pellet**, he can capture ghosts.  
- The goal is to clear the level without losing all lives.  

⚠️ **Key differences from the original game**:  
- No increasing level difficulty  
- No fruit bonuses  
- Ghosts do not flash at the end of frightened mode  
- Some advanced ghost logic was simplified  

---

## 🏗️ Technologies Used

**Front-End:** HTML5, CSS3, JavaScript  
**Development Tools:** GitHub, VS Code, Chrome DevTools  

---

## 🚀 Getting Started

### Installation

1. Clone the GitHub repository:

```bash
git clone https://github.com/aarondweck/Project-1-Pac-Man.git
cd Project-1-Pac-Man
```

2. Open `index.html` in your browser.  

### Controls

| Key | Action |
|-----|--------|
| ↑ ↓ ← → | Move Pac-Man |
| Click "START GAME" | Begin the game |

---

## 🧩 Game Features

- Pac-Man can eat **food pellets**  
- **Power pellets** turn ghosts blue and make them capturable  
- **Collision system**: ghosts can capture Pac-Man; Pac-Man can capture frightened ghosts  
- **Lives system**: lose a life if caught; game ends when lives run out  
- **Scoring system**: score updates in real time, high score saved locally  
- **Single-level gameplay**  

---

## 📝 Planning & Implementation

### Ghost Logic

Research on ghost AI was critical. Inspired by [The Pac-Man Dossier by James Pittman](http://www.gamasutra.com/view/feature/131501/the_pacman_dossier.php), ghosts move by:

1. Looking at the next intersection (current location + adjacent cells)  
2. Calculating **distance to Pac-Man** using **Pythagoras’ theorem**  
3. Choosing the shortest path  
4. Following special rules when frightened  

#### Ghost Movement Sketch
![Ghost Movement Sketch](images/ghost-movement-sketch.png)  
*Illustration of ghost decision-making at intersections.*

### Grid & Wireframe

- Grid system with **x/y coordinates and indexes** for each cell  
- Wireframe created with **Excalidraw**  
- Spreadsheet used to identify all open cells and generate code indexes  

#### Grid Wireframe
![Grid Wireframe](images/grid-wireframe.png)  
*Wireframe of the maze layout with cell coordinates and open spaces.*

---

## ⚔️ Challenges

- **Pac-Man moving into walls**: solved by checking next cell legality before movement  
- **Ghosts unable to turn**: solved by calculating direction based on current and preferred index  
- **Collision detection with frightened ghosts**: implemented per-ghost attribute for accurate detection  
- **Multiple ghosts in the same cell**: filtered only ghosts that are frightened for correct visual display  

---

## 🏆 Wins

- Successfully creating a **grid-based game board**  
- Implementing **ghost pathfinding AI**  
- Handling **complex collision scenarios**  
- Adding **scoring, lives, and power pellets** for full gameplay  
- High-score persistence using `localStorage`  

---

## ⏱️ Timeframe & Team

- Completed **in 1 week**  
- Solo project  

---

## 🔧 Future Improvements

- Implementing multiple levels with increasing difficulty  
- Adding fruit bonuses  
- Ghost flashing effect at the end of frightened mode  
- More accurate ghost AI based on original arcade logic  

---

## 📄 License

This project is a **portfolio project**. All rights reserved.  
No license is currently provided.  

---

## 🙌 Acknowledgments

Inspired by the original **Pac-Man** by Namco and insights from **The Pac-Man Dossier** by James Pittman.  
