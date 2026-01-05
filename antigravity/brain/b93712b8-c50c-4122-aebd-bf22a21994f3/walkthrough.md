# Refinement: Realistic Fusuma Entrance

## Changes Implemented

### 1. Visual Overhaul
- **Texture**: Replaced simple gradients with a layered approach.
    - **Washi Layer**: Uses a subtle noise texture (`url("https://www.transparenttextures.com/patterns/washi.png")`) overlaid on an off-white base to simulate paper grain.
    - **Wood Frame**: Uses specific linear gradients to simulate wood rails and internal latticework (Kumiko/San).
- **Shadows**: Deepened the shadows between the doors (`10px 0 30px`) to add 3D depth.
- **Hikite (Handle)**:
    - **Design**: Shifted from simple brown rectangles to ornate "Black Iron + Gold" style.
    - **Detail**: Added inner shadows and a "Kamon" (Crest) simulation in gold.

### 2. Animation
- **Ease**: Adjusted transition to `ease: [0.22, 1, 0.36, 1]` for a heavier, friction-based slide effect.
- **Duration**: Increased to 2.5s for a majestic opening.

## Verification Checklist

### User Verification Steps
Reload the page and check:
1.  **Texture**: Does the door look like real paper/wood now?
2.  **Handle**: Is the handle more detailed (black/gold)?
3.  **Opening**: Does it feel heavier and more dramatic?

*(Note: If the texture URL fails to load, it will degrade gracefully to the base color)*
