---
name: Nick Lusweti Portfolio
description: A confident, technical, kinetic showcase of production software work after dark.
colors:
  signal-green: "#32d74b"
  midnight-black: "#0f0f10"
  midnight-surface: "#181819"
  floating-glass: "rgba(55, 55, 56, 0.86)"
  gallery-white: "#f4f3ef"
typography:
  display:
    fontFamily: "Titillium Web, Arial, Helvetica, sans-serif"
    fontSize: "clamp(7rem, 15.6vw, 18.5rem)"
    fontWeight: 700
    lineHeight: 0.68
    letterSpacing: "-0.075em"
  headline:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(7rem, 12.15vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(2.8rem, 4.8vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "clamp(1rem, 1.35vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.62rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.14em"
rounded:
  field: "0"
  nav-item: "0.8125rem"
  project-media: "0.9rem"
  panel: "1rem"
  floating-shell: "1.125rem"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  page-tablet: "1.5625rem"
  page-desktop: "3.125rem"
  section: "6.25rem"
  section-deep: "10rem"
components:
  button-primary:
    backgroundColor: "{colors.gallery-white}"
    textColor: "{colors.midnight-black}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    height: "3.375rem"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.midnight-black}"
    typography: "{typography.body}"
    rounded: "{rounded.panel}"
    height: "3.375rem"
    width: "100%"
  button-pill:
    backgroundColor: "rgba(15, 15, 16, 0.42)"
    textColor: "{colors.gallery-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.45rem 0.35rem 1.15rem"
    height: "3.25rem"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.gallery-white}"
    typography: "{typography.title}"
    rounded: "{rounded.field}"
    padding: "1.125rem 1rem"
    height: "3.5rem"
    width: "100%"
  nav-floating:
    backgroundColor: "{colors.floating-glass}"
    textColor: "{colors.gallery-white}"
    typography: "{typography.body}"
    rounded: "{rounded.floating-shell}"
    padding: "0.5625rem"
  card-project:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.gallery-white}"
    rounded: "{rounded.project-media}"
    width: "100%"
  capability-row:
    backgroundColor: "{colors.midnight-black}"
    textColor: "{colors.gallery-white}"
    typography: "{typography.title}"
    padding: "2.5rem 0"
    width: "100%"
  section-heading:
    textColor: "{colors.gallery-white}"
    typography: "{typography.headline}"
    width: "100%"
  availability-signal:
    textColor: "{colors.signal-green}"
    typography: "{typography.label}"
    size: "0.72rem"
---

# Design System: Nick Lusweti Portfolio

## Overview

**Creative North Star: "The Midnight Portfolio"**

The Midnight Portfolio treats the interface as a dark exhibition space where typography, project imagery, and precise technical annotations become the illuminated artifacts. Its near-black field stays continuous from hero to footer, allowing scale, alignment, and a single live signal color to create hierarchy without conventional chrome.

The system is confident, technical, and kinetic. Oversized type establishes authority, compact mono labels supply evidence, and asymmetric compositions keep the portfolio active. Motion is concentrated in the first-impression identity, live status, navigation entrance, and interaction feedback; project proof remains stable and inspectable at rest.

**Key Characteristics:**

- Near-black continuity with warm off-white type and one electric signal color.
- Monumental typography balanced by compact technical annotations.
- Persistent project and capability evidence that never depends on hover to be understood.
- Asymmetric desktop staging that resolves into direct linear flows on small screens.
- A one-time exhibition-aperture reveal for meaningful scroll milestones, with restrained glass and selective lift on an otherwise flat canvas.

## Colors

The palette is nocturnal and nearly monochrome: Midnight Black provides the exhibition field, Gallery White carries content, and Signal Green acts as a scarce indicator of life and intent.

### Primary

- **Signal Green** (#32d74b): Used for availability indicators, section markers, keyboard focus, interactive emphasis, and decisive hover states.

### Neutral

- **Midnight Black** (#0f0f10): The uninterrupted page canvas and dominant component surface.
- **Midnight Surface** (#181819): A small tonal lift behind project media and image fallbacks.
- **Floating Glass** (rgba(55, 55, 56, 0.86)): Reserved for the fixed navigation shell where translucency distinguishes a floating layer.
- **Gallery White** (#f4f3ef): The principal text, border, control, and high-contrast surface color; opacity creates the muted hierarchy.

### Named Rules

**The Signal Is Rare Rule.** Signal Green marks status, navigation intent, focus, and moments of proof; it never becomes a large decorative field.

**The Night Never Breaks Rule.** Primary surfaces stay dark so project imagery and Gallery White typography remain the brightest material.

## Typography

**Display Font:** Titillium Web (with Arial and Helvetica fallbacks)  
**Headline Font:** Bebas Neue (with Impact fallback)  
**Body Font:** Inter (with Arial and Helvetica fallbacks)  
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** The pairing moves from broad, compressed authority to highly legible explanation and then to instrument-like metadata. Display faces are assertive and uppercase; body copy remains calm enough to make the technical content credible.

### Hierarchy

- **Display** (Titillium Web, weight 700, 3.5rem–11.75rem, line-height 0.7–0.74, tracking -0.04em): Reserved for the hero identity and positioning phrases, compact header monogram, and oversized closing wordmark.
- **Headline** (Bebas Neue, weight 400, 7rem–10rem, line-height 0.99, tracking -0.015em): Creates full-width section statements and case-study titles.
- **Title** (Bebas Neue, weight 400, 2.8rem–4rem, line-height 1, tracking -0.015em): Names capabilities, projects, contact groups, and editorial subsections.
- **Body** (Inter, weight 400, 1rem–1.15rem, line-height 1.75): Handles introductions, descriptions, case-study prose, links, navigation, and controls; long-form reading stays within roughly 44rem.
- **Label** (Geist Mono, weight 400, 0.62rem, line-height 1.5, tracking 0.14em): Marks location, availability, stacks, indexes, categories, and navigation metadata in compact uppercase settings. The 0.72rem monogram and status geometry are intentional identity exceptions.

### Named Rules

**The Scale Is the Image Rule.** On text-led surfaces, oversized typography is the primary visual artifact; do not replace its authority with extra containers or ornament.

**The Mono Is Metadata Rule.** Geist Mono is reserved for status, indexing, taxonomy, and technical evidence, never sustained body copy.

## Layout

The spatial model alternates between a wide 90rem showcase canvas and a focused 68.75rem reading canvas. Desktop sections use 3.125rem page gutters and a 6.25rem primary vertical rhythm, while the hero fills at least one small viewport height. The landing sequence is Hero, About, Projects, Capabilities, then Contact.

The project gallery is an auto-height asymmetric 12-column composition: the first project begins at column one and spans seven columns, the second starts at column nine and runs to the edge, and the third begins at column three and spans nine columns. This staged irregularity preserves each project’s complete evidence block instead of forcing equal card heights. Case studies use a two-column reading layout with a 16.5rem sticky evidence rail and a flexible narrative column. Contact uses a focused information-and-form split.

At 1199px, gutters reduce to 1.5625rem and the project grid resolves to eight columns. At 809px, the gallery, case-study rail, and contact grid become linear flows with 1rem gutters. The hero has additional composition changes at 900px and 640px, and the compact header resolves at 560px. Responsive behavior changes composition rather than simply shrinking desktop geometry.

## Elevation & Depth

The system is flat and structurally layered. Depth comes from overlapping typography, tonal surfaces, hairline rules, image gradients, translucent glass, and bounded radial light fields. Conventional shadow is reserved for elements that truly float above the page.

### Shadow Vocabulary

- **Floating Navigation** (`0 1.25rem 4rem rgba(0, 0, 0, 0.28)`): Gives the fixed glass shell quiet separation from the page.
- **Live Signal** (`0 0 0.8rem rgba(50, 215, 75, 0.8)`): Makes availability feel active rather than ornamental.
- **Project Media:** Uses a one-pixel Gallery White alpha border and tonal fill, not a drop shadow.

### Named Rules

**The Flat Until Floating Rule.** Surfaces remain flat at rest; shadow appears only when an element is literally floating or when a small status signal needs ambient energy.

## Shapes

The form language mixes sharp editorial structure with selective soft containment. Fields and structural rules stay square; project media uses gently rounded clipping, major action buttons use a firmer panel curve, and floating navigation combines a rounded shell with slightly tighter inner items. True pills are reserved for the hero action and circular status geometry. The header monogram stays sharp and typographic.

Fine one-pixel rules organize capability lists, case-study metadata, galleries, and footer boundaries. The system does not use rounded cards as a default content container: curvature belongs to media, controls, and explicitly floating objects.

## Components

### Buttons

- **Primary Contact Button:** A full-width Gallery White action with Midnight Black copy and a firm rounded panel silhouette; hover and keyboard focus switch the surface to Signal Green and lift it slightly. It is currently presentational until the contact form receives its planned functional integration.
- **Explore Projects Pill:** A translucent outlined capsule with mono uppercase copy and a circular Signal Green icon well; hover adds a green-tinted surface and rotates the arrow toward the action.
- **Motion:** State transitions cluster around 180–220ms; reduced-motion preferences remove nonessential transforms and transitions.

### Project Evidence Cards

Project cards are image-first compositions with rounded media clipping and persistent evidence beneath the image. Index, category, title, summary, technologies, and the case-study link remain readable at rest; hover gently scales the media and strengthens interactive feedback without revealing required content. The media uses a 1.86 aspect ratio and `object-fit: contain` so interface evidence is not cropped.

### Capability Rows

Capability rows behave like an editorial evidence index: a compact number, a large title, a visible description, and proof links share a ruled grid. Hover adds only a subtle tonal shift. On smaller screens the grid becomes a direct stack without withholding explanatory content.

### Inputs / Fields

Fields are transparent and square, with a single low-contrast bottom rule, uppercase Bebas Neue copy, and generous vertical space. Hover strengthens the rule and focus brings it to Gallery White. Error, disabled, loading, and success treatments are not yet established in the presentational contact form.

### Navigation

The persistent navigation is a translucent, blurred, rounded shell containing About, Work, Capabilities, and the terminal Email Nick action. Links meet a 3.125rem minimum height, subtle tonal fills mark hover, and a two-pixel Signal Green outline marks keyboard focus. Optional links are progressively removed on narrow screens while the primary route remains available.

### Section Headings

A compact Geist Mono label with a square Signal Green marker precedes a monumental uppercase Bebas Neue headline. The complete heading enters as one clipped exhibition aperture on first intersection and uses balanced wrapping; the system never fragments it into per-character animation.

### Availability Signal

The header pairs a compact Titillium Web `N / L` monogram with a Signal Green slash, a pulsing green status dot, and the message “Open to software development roles.” The monogram stays static at rest and uses only a restrained hover separation; identity and live employment intent remain distinct without ornamental looping motion.

### Motion Contract

Authored motion is focused: the hero identity enters over 1.2 seconds, then its confirmed identity and software-development positioning rotate every 3.2 seconds through a bounded 550ms letter flip. The loop pauses outside the viewport or while the document is hidden, and reduced-motion visitors receive the static name. The floating navigation enters over 700ms after a 300ms delay, and the availability signal pulses every 2.4 seconds. The About statement is the focal scroll-scrub: its words move from 16% to full opacity and rise 14px as the copy travels from 85% to 35% of the viewport, with a 90/26/0.8 spring profile. Other meaningful below-fold milestones use a one-time 720ms exhibition-aperture reveal driven by IntersectionObserver with a requestAnimationFrame-batched viewport fallback, and sibling delays are capped at 180ms. Asymmetric projects enter from their grid direction, ruled capability rows scan open, and contact content resolves as a paired movement. Content stays visible by default when JavaScript is unavailable, keyboard focus forces pending content into view, and `prefers-reduced-motion: reduce` disables spatial reveals and smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** maintain Midnight Black as a continuous canvas and let spacing, rules, and scale establish sections.
- **Do** reserve Signal Green for status, focus, interactive intent, and precise moments of emphasis.
- **Do** keep project summaries, technologies, capability descriptions, and proof links visible at rest.
- **Do** pair monumental display typography with restrained Inter copy and Geist Mono metadata.
- **Do** collapse asymmetric desktop compositions into direct linear mobile flows instead of merely shrinking them.
- **Do** concentrate motion in identity, meaningful scroll milestones, status, navigation, and interaction feedback while honoring reduced-motion preferences.

### Don't:

- **Don't** hide essential project or capability evidence behind hover, scroll animation, or pointer-only interaction.
- **Don't** introduce generic SaaS dashboards, sidebars, metric tiles, or repetitive card grids into the portfolio identity.
- **Don't** soften the system with pastel friendliness or dilute its contrast with unrelated accent colors.
- **Don't** wrap every content block in a rounded container; the uninterrupted night field is part of the identity.
- **Don't** add continuous decorative project floating or motion without a clear hierarchy, state, or spatial purpose.
- **Don't** invent badges, logos, testimonials, or performance claims that the project evidence cannot support.
