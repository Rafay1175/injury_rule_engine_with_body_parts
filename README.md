# Injury Rule Engine with Body Part Extraction

This is a simple web-based tool that analyzes accident descriptions to detect possible human injuries, their severity, and any body parts mentioned. It uses a rule-based engine written in JavaScript and provides an easy-to-use interface.

## Features

- **Injury Detection:** Identifies if an accident description indicates a fatal, severe, minor, or no injury.
- **Severity Scoring:** Assigns a severity score based on the description.
- **Body Part Extraction:** Extracts and lists any body parts mentioned in the text.
- **User-Friendly UI:** Just paste or type your accident description and click "Analyze"!

## How to Run Locally

1. **Clone or Download the Repository**

   Download this project as a ZIP or clone it using:
   ```
   git clone https://github.com/Rafay1175/injury_rule_engine_with_body_parts.git
   ```

2. **Navigate to the Project Folder**

   ```
   cd injury-rule-engine
   ```

3. **Open the App**

   Simply open the `index.html` file in your web browser (Chrome, Firefox, Edge, Safari, etc.).

   - You can double-click `index.html` or right-click and choose "Open with" your browser.

   > **No installation or server setup is required!**

## Usage

1. Enter an accident description (single sentence or multiple sentences) in the text area.
2. Click the **Analyze** button.
3. View the results for injury detection, severity, and body parts mentioned.

**Example Input:**
```
A 20 month old child was struck by a vehicle and killed. The renter, Patrick Barona, was charged with serious injury by vehicle, hit and run/leaving the scene of an accident, and homicide by vehicle.
```

## Project Structure

- `index.html` – Main web page.
- `accident_rule_engine.js` – Rule engine and UI logic.
- `style.css` – Styling for the app.
- `README.md` – Project documentation.
