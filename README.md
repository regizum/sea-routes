# Marcura Test Task

This project is a test task to showcase my skills in Front End Development. It is a simple application that allows the user to upload a CSV file with sea routes, display them on a map and show the chart with the speed changes.

## 0. Demo Link

[https://marcura-test-task.herokuapp.com/](https://marcura-test-task.herokuapp.com/)

## 1. Usage

### 1.1. Installation

Run `npm install` to install all dependencies.

### 1.2. Development

Run `ng serve` to start the development server. The server will automatically reload if you change any of the source files.

### 1.3. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 2. Project Structure

### 2.1. Overview

The project is structured as follows:

``` bash
├── src/                        # Source files
│   ├── app/                    # Application files
│   │   ├── components/         # Components
│   │   ├── modules/            # Modules
│   │   ├── shared/             # Shared components and types
│   │   ├── app.component.*     # App component
│   │   └── app.module.ts       # App module
│   ├── assets/                 # Assets
│   ├── favicon.ico             # Favicon
│   ├── importer.scss           # Styles
│   ├── index.html              # Index file
│   ├── index.d.ts              # Types
│   └─── main.ts                # Main file
├── .editorconfig               # Editor config
├── .gitignore                  # Git ignore
├── angular.json                # Angular config
├── package.json                # Package config
├── README.md                   # Readme file
├── tsconfig.app.json           # TypeScript config
├── tsconfig.json               # TypeScript config
└── tsconfig.spec.json          # TypeScript config
```

### 2.2. Features

The application has the following features:

- Upload CSV file with vessel routes `csv-importer.module.ts`
- Display sea routes on a map `g-map.component.ts`
- Display chart with speed changes `chart.component.ts`

### 2.3. CSV Importer

The CSV importer is a module that allows the user to upload a CSV file with sea routes. The file should have the following columns:

- `route_id` - some arbitrary route id
- `from_port` - route origin
- `to_port` - route destination
- `leg_duration` - trip duration in milliseconds
- `points` - an array of vessel observations from GPS where observation is [longitude, latitude, timestamp in epoch milliseconds, actual vessel speed in knots]

## 3. Libraries

The application uses the following libraries:

### 3.1. Angular

Angular is a platform for building mobile and desktop web applications.

### 3.2. Bootstrap

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.

### 3.3. Font Awesome

Font Awesome is a font and icon toolkit based on CSS and LESS.

### 3.4. Google Maps

Google Maps is a web mapping service developed by Google.

### 3.5. Chart.js

Chart.js is a JavaScript library for data visualization.

## 4. Author

Author: Regina Nigmatullina

Email: nigmatullinaregina@gmail.com
