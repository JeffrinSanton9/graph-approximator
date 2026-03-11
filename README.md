# 📈 Graph Approximator

> Turn a scatter of data points into a mathematical function — instantly visualized on an interactive canvas.

Graph Approximator is a full-stack web application that lets you plot discrete data points and approximate them to a best-fit mathematical function using three different algorithms: **Linear Regression**, **Polynomial Regression**, and **Taylor Series** approximation. Results are rendered live on a zoomable, pannable canvas plotter built from scratch.

---

## ✨ Features

- 🧮 **Three approximation algorithms** — Linear Regression, Polynomial Regression (configurable degree), and Taylor Series
- 🎨 **Interactive canvas plotter** — zoom with scroll wheel, pan by click-and-drag, renders expressions in real time
- 📍 **Data point overlay** — your raw data points are drawn directly on the same plot alongside the approximated curve
- 🗂️ **Session management** — organize data points into named sessions per user
- 🗄️ **Persistent storage** — SQLite database with cascading relationships across users → sessions → data points
- ⚡ **Fast REST API** — FastAPI backend with auto-generated docs at `/docs`
- 
---

## 🗂️ Project Structure

```
graph-approximator/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── core/
│   │   ├── linear_regression.py
│   │   ├── polynomial_regression.py
│   │   └── taylor_series.py
│   ├── routers/
│   │   ├── approximators.py
│   │   ├── datapoints.py
│   │   ├── sessions.py
│   │   └── users.py
│   ├── models/                  # SQLAlchemy ORM models
│   ├── schemas/                 # Pydantic request/response schemas
│   └── database/
│       └── database.py
└── frontend/
    └── src/app/
        ├── components/
        │   ├── PlotCanvas.js    # The star — interactive canvas plotter
        │   ├── AddDatapoint.js
        │   └── Navigator.js
        └── utils/
            ├── plot_printer.js  # Draws the approximated curve
            ├── points_printer.js
            ├── grid.js          # Draws axes and labels
            ├── zoomer.js        # Zoom + pan logic
            ├── panner.js
            ├── evaluate.js      # mathjs expression evaluator
            ├── domain_to_canvas.js
            └── canvas_to_domain.js
```

---

## 🚀 Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### Backend

```bash
# Navigate to the backend directory
cd backend

# (Recommended) Create a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy numpy

# Start the server
uvicorn main:app --reload
```

The API will be live at **http://localhost:8000**
Interactive API docs are available at **http://localhost:8000/docs**

---

### Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be live at **http://localhost:3000**

---

## 🔌 API Reference

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user` | Create a new user |
| `GET` | `/user/{id}` | Get user information |
| `PUT` | `/user/{id}` | Update user |
| `DELETE` | `/user/{id}` | Delete user |

### Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/session` | Create a new session |
| `GET` | `/session/{session_id}` | Get session by ID |
| `GET` | `/session/user/{user_id}` | Get all sessions for a user |
| `PUT` | `/session/{session_id}` | Update session |
| `DELETE` | `/session/{session_id}` | Delete session |

### Data Points
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/datapoint` | Add a data point to a session |
| `GET` | `/datapoint/{id}` | Get a single data point |
| `GET` | `/datapoint/session/{session_id}` | Get all points in a session |
| `PUT` | `/datapoint/{id}` | Update a data point |
| `DELETE` | `/datapoint/{id}` | Delete a data point |

### Approximators
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/approximate/linear/{session_id}` | Linear regression |
| `GET` | `/approximate/polynomial/{session_id}?degree=4` | Polynomial regression |
| `POST` | `/approximate/series/{session_id}` | Taylor series approximation |

---

## 🧠 How the Approximation Algorithms Work

### Linear Regression
Computes the best-fit straight line `y = mx + b` using the least squares closed-form solution — no external libraries, pure arithmetic over the data points.

### Polynomial Regression
Uses **NumPy's `linalg.lstsq`** to solve the normal equations for a polynomial of configurable degree. Returns a human-readable expression like `2.5 * (x ^ 0) + 1.3 * (x ^ 1) + ...`. Degree defaults to 4 but can be passed as a query parameter.

### Taylor Series
Numerically estimates successive derivatives using central finite differences, then builds a Taylor expansion around a user-specified point. Supports a configurable number of terms and gracefully stops early if the derivative data runs out.

---

## 🎨 The Plotter — Built From Scratch

The canvas plotter is one of the most impressive parts of this project. It is entirely hand-rolled on an HTML5 `<canvas>` element — no charting library involved.

**What it does:**
- Renders an adaptive coordinate grid that rescales labels as you zoom (19 discrete zoom levels from `0.01` spacing to `10000`)
- Evaluates any mathematical expression string (parsed by [mathjs](https://mathjs.org/)) and draws it as a smooth red curve by stepping through the x-domain in increments of `0.01`
- Overlays raw data points from your session directly on the same canvas
- Supports **smooth zoom** anchored to the cursor position using an affine domain transform
- Supports **click-and-drag panning** with correct axis inversion handling (canvas y-axis is flipped relative to math coordinates)
- Coordinate transforms between canvas pixels and math domain are handled by dedicated utility modules (`domain_to_canvas.js`, `canvas_to_domain.js`)

---

## 🗄️ Database Schema

Three tables with cascading deletes:

```
users
  └── sessions  (user_id FK)
        └── data_points  (session_id FK)
```

SQLite is used by default via SQLAlchemy ORM. Swapping to PostgreSQL or MySQL only requires changing the connection string in `database/database.py`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Math parsing | mathjs |
| Backend | FastAPI, Python 3.10+ |
| ORM | SQLAlchemy |
| Database | SQLite |
| Numerics | NumPy |

---

## 📄 License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.

---

*Built by Jeffrin Santon T*
