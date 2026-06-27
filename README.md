# Secure Password Generator

A responsive, web-based password generator built using HTML, CSS, and vanilla JavaScript. 

## Features

* **Customizable Length:** Allows users to select password lengths from 6 to 32 characters using an interactive slider.
* **Character Pool Selection:** Toggleable options to include uppercase letters (`A-Z`), numbers (`0-9`), and special symbols (`!@#$...`).
* **Defensive Error Handling:** Validates form states and prevents execution if no character types are selected.
* **Responsive Dark UI:** A clean layout styled with custom CSS featuring reactive button states and conditional color-coded feedback.
* **Decoupled Architecture:** Completely separates the mathematical character generation from the browser's DOM manipulation.

## Architecture and Clean Code

The JavaScript codebase is split into  classes following the Separation of Concerns (SoC) design pattern:

1.  **`PasswordGenerator` (Core Logic):** Contains predefined character pools and handles the randomized picking algorithm. This class is completely framework-agnostic and could be reused in a Node.js backend without modification.
2.  **`UserInterface` (Presentation Layer):** Captures DOM element references, manages event listeners for inputs and button clicks, and renders results or errors dynamically.
3.  **`DOMContentLoaded` Initializer (Application Root):** Acts as the entry point that safely instantiates and connects the logic layer with the UI layer once the document is fully loaded.

## Getting Started

### Prerequisites
A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### Running the Application Locally
1. Clone this repository:
   ```bash
   git clone [https://github.com/AlexCzechRepublic/PasswordGenerator.git](https://github.com/AlexCzechRepublic/PasswordGenerator.git)
   cd PasswordGenerator
2. Open the index.html file in any web browser.

## License
This project is open-source and available under the MIT License.