# Ray Optics Simulation

<p class="lead">
A small fun/school project to simulate the reflection of a light ray in two-dimensional space. Easily expandable to support more shapes and materials. 
</p>

Currently, the simulation supports entities such as circles, lines, and (approximated) curves, each consisting of one material, there is one material at the moment, but an extension is easily possible.

The project is written in Typescript and visualized with [pts.js](https://ptsjs.org) in [Svelte](https://svelte.dev).

@@@

## Intro

The physical principles of the reflection of light rays follow a simple logic.
The paths of reflected light waves can be predicted almost intuitively
can be predicted almost intuitively from simple geometric shapes. In
a more complex environment with an increased number of physically
relevant entities, the prediction of the totality of all effects on the
effects on the light path will be increasingly difficult for humans to predict and,
above all, time-consuming. If even the initial effort for the digital implementation of these
physical optical fundamentals of reflection may be greater, this is
especially in mentioned more extensive situations, this is practicable and
and allows fast iterations concerning the change of the result
in connection with the initial situation.

[Read the detailed work about the project (German only)](https://optics.b3n.gg/de/main.pdf)

## Structure

### World

- The world contains all obstacles and calculates the path of the light ray
- A recursive function is used here, which has a light ray as input and follows the light ray until an artificial limit is reached or no more obstacles are hit

### Light ray

- A light ray is simply stored as a straight line
- It has an origin and goes (theoretically) infinitely in a certain direction

### Light path

- As a ray of light changes course, there is the light path
- The light path consists of several light rays

### Obstacle

- Obstacles are the things that the light ray can collide with

- Circle (position, radius)
- Line (start point, end point)
- Approximated curve (position, mathematical function)

- Obstacles are always associated with a material and are independent of it

### Material

- A material processes a collision and produces new rays
- I have implemented only the mirror, which reflects the ray completely
