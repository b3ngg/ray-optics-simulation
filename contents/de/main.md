---
author:
- Ben Weber
bibliography:
- ref.bib
date: November 2021
title: Technische Realisierung einer Computer-Simulation für die
  Reflexion von Lichtstrahlen in einem zweidimensionalen Raum
---

# Einleitung

Die physikalischen Grundlagen der Reflexion von Lichtstrahlen folgen
simpler Logik. So lassen sich die Bahnen von reflektierten Lichtwellen
an einfachen geometrischen Formen nahezu intuitiv prognostizieren. In
einem komplexeren Umfeld mit einer erhöhten Anzahl an physikalisch
relevanten Entitäten wird die Prognose der Gesamtheit aller
stattfindenden Einwirkungen auf den Lichtweg jedoch für Menschen
zunehmend schwierig zu prognostizieren und vor allem zeitaufwendig. Wenn
auch der initiale Aufwand für die digitale Implementierung dieser
physikalischen optischen Grundlagen der Reflexion größer sein mag, ist
dies vor allem in erwähnten umfangreicheren Situationen praktikabel und
ermöglicht schnelle Iterationen bezüglich der Veränderung des Resultats
im Zusammenhang mit der Ausgangssituation.

Die vorliegende Arbeit beschäftigt sich mit der Frage, wie eine solche
digitale Simulation umgesetzt werden kann. Hierbei wird nicht nur auf
die Umsetzung der tatsächlichen Reflexion eingegangen, sondern auch auf
den Aufbau einer solchen Computer-Simulation, sodass eine Erweiterung
hinsichtlich weiterer strahlenoptischer Phänomene möglich ist.\
Zur Vereinfachung wird von einer idealisierten, zweidimensionalen,
evakuierten Umgebung ausgegangen, in der Lichtstrahlen nicht an
Intensität verlieren und die Oberflächen von Hindernissen störungsfrei
sind. Die Quellenlage bezüglich der hier verwendeten physikalischen
Grundlagen der geometrischen Optik ist als sehr sicher zu bewerten. Der
Aufbau und die technische Umsetzung der Simulation entstammen jedoch
fast ausschließlich aus Überlegungen des Autors. Etwaige Fehler hat
allein der Autor zu verantworten.

# Aufbau

Im Folgenden wird der Aufbau der Simulation zunächst theoretisch und
abstrahiert betrachtet. Folgende Notation soll jedoch eine Verknüpfung
mit dem Quellcode vereinfachen: (`Name im Quellcode`)

## Welt

Die Welt (`World`) ist der Grundstein für die Simulation. Zu diesem
virtuellen zweidimensionalen Raum können sämtliche Entitäten hinzugefügt
werden. Hier werden diese verwaltet, verarbeitet und zur Visualisierung
ausgegeben.

## Lichtstrahl

In der geometrischen Optik geht man bei einem Lichtstrahl (`Ray`) von
einem Strahl aus, der sich von einem Ursprung $A$ geradlinig in eine
Richtung mit dem Winkel $\alpha$ ausbreitet. [vgl. @tipler2015physik S.
1041] Mathematisch wird dieser als Halbgerade angesehen
$\overrightarrow{AB}$. In der Simulation ist es sinnvoll lediglich den
Startpunkt als Ortsvektor $\vec{O}$ (`origin`) innerhalb der Welt und
den Winkel (`angle`), in den der Strahl ausgeht, direkt zu speichern.

## Lichtweg

Es muss davon ausgegangen werden, dass ein Lichtstrahl in der die
Kollision mit anderen Objekten seine Richtung verändert. Ab einer
Richtungsänderung wird der bisherige Lichtstrahl als Lichtweg (`Line`)
gespeichert, um in später zu visualisieren. Hierbei besteht ein
Lichtstrahl aus den Ortsvektoren $\vec{O}$ (`origin`), dem Ursprung des
Lichtstrahls und $\vec{E}$ (`end`), dem Punkt der Kollision.

## Hindernis

Bei allen Entitäten in der Welt, die nicht Strahl oder Lichtweg sind,
handelt es sich um Hindernisse. Diese definieren sich durch ihre
geometrische Form und Position in der Welt und können von Lichtstrahlen
getroffen werden. Es sind verschiedene Variationen möglich. Jedes
Hindernis (`Obstacle`) hat jedoch einen Startpunkt als Ortsvektor
$\vec{A}$ (`start`) in der Welt und ein Material (`material`) (vgl.
[2.5](#material){reference-type="ref" reference="material"}). Folgende
Typen wurden für diese Arbeit ausgewählt:

### Kreis

Der Kreis (`type: ’cirlce’`) hat eine zusätzliche Angabe über den Radius
$r$ (`radius`).

### Linie

Neben einen Anfangspunkt hat die Linie (`type: ’line’`) auch einen
Ortsvektor $\vec{B}$ als Endpunkt.

### Kurve

Zusätzlich kann ein Hindernis auch eine Kurve (`type: ’curve’`) sein.
Das ermöglicht die Konstruktion verschiedener besonderer Reflektoren (z.
B. Parabolischer Reflektor). Für den Verlauf der Kurve besitzt dieser
Hindernis-Typ eine Funktion $f$. Um eine Kurve beliebig in der Welt zu
positionieren, kann ihr zusätzlich einen Winkel $\gamma$ (`rotation`)
übergeben werden, der alle Punkte auf der Kurve, relativ zum Ursprung,
rotiert.\
Im Umfang dieser Arbeit wird bewusst auf eine vollständige und genaue
Darstellung eines Graphen verzichtet. Daher werden nur Punkte in einem
Intervall $[-40, 40]$ im Abstand von einer übergebenen Skalierung $k$
(`scale`) errechnet, als Linien verbunden und als diese fortlaufend
verarbeitet. Diese Annäherung ist ausreichend, während gleichzeitig der
Umfang stark reduziert wird.

## Material

Die Existenz eines Materials (`Material`) in der Welt besteht nur in der
Verknüpfung zu einem Hindernis. Ein Material ist für die Verarbeitung
eines einfallenden, mit dem Hindernis kollidierenden, Lichtstrahls
verantwortlich und kann eine beliebige Anzahl an neuen Lichtstrahlen
zurückgeben.\
  In dieser Arbeit wird nur die Reflexion bei dem Material Spiegel
(`mirror`) behandelt. Eine Trennung von Material und Hindernis
ermöglicht jedoch eine einfache Erweiterung. Dabei können, trotz
Veränderung der strahlenoptischen Funktion, die geometrischen
Eigenschaften beibehalten werden. So könnte beispielsweise ein Kreis
einerseits als Spiegel die Lichtstrahlen reflektieren und anderseits als
Glas die Lichtstrahlen brechen; ohne das dafür die Veränderung des
Hindernisses vonnöten wäre.

# Technische Voraussetzungen

Um die Zugänglichkeit der Simulation zu erhöhen, wird diese als Web-App
programmiert. Dazu wird die Programmiersprache TypeScript genutzt und
die Applikation wird mit dem Framework „SvelteKit"[^1] kompiliert. Zur
Visualisierung wird die Library „Pts"[^2] verwendet. Diese ermöglicht
eine einfache Verwendung der Canvas-API. Zusätzlich werden aber auch
einige mathematische Hilfsfunktionen von dieser Library verwendet.

Der gesamte Quellcode für die Simulation ist auf GitHub zu finden[^3].
Im Folgenden werden nur rudimentäre Ausschnitte aus dem Code
eingebunden. Die fertige Web-App ist ebenfalls als Website
aufrufbar[^4].

# Simulationsprozess

Im Folgenden wird nun der Ablauf der Simulation vom Erstellen der Szene
bis hin zum Visualisieren des Resultats beschrieben.

## Erzeugen der Welt

Zunächst muss für die Simulation eine Umgebung errichtet werden. Dazu
wird eine Welt erstellt. Zu dieser werden in dieser Szene ein von links
oben (man beachte, dass das Koordinatensystem den Ursprung links oben
hat und die y-Achse umgekehrt ist) beginnender und diagonal nach rechts
unten strahlender Lichtstrahl hinzugefügt.\
Zudem wird auch ein Hindernis in der Form einer vertikalen Linie in der
Mitte der Szene hinzugefügt. Diese hat das Material Spiegel (`mirror`).\
  Nun wird mit `world.update()` die Simulation aktualisiert und die
Lichtwege berechnet. Diese werden zum Schluss visualisiert.

Bei dem Objekt `space` handelt es sich um ein von Pts bereitgestellte
und zur Visualisierung benötigtes Objekt. Die Klasse `Pt` ist ebenfalls
Teil von Pts und wird zur Vektormathematik verwendet.

::: verbnobox
/\*\* \* Simple reflection of a ray on a vertical line \*/ export const
lineReflection: Scene = (space) =>

const form = space.getForm(); const world = createWorld();

world.addSource('ray', createRay(new Pt(), Math.PI \* 2.25));
world.addObstacle( 'line', createLine(new Pt(800, 0), end: new Pt(800,
5000), material: mirror ) );

world.update(); space.add(() => world.draw(form); );

space.playOnce();

;
:::

## Berechnung des Lichtwegs

Bei der Berechnung eines Lichtwegs startet die Simulation nur mit einem
Ausgangs-Lichtstrahl. Zunächst muss die erste Überschneidung des Strahls
mit einem Hindernis bestimmt werden. Für die Bestimmung des
Schnittpunktes werden die üblichen Verfahren der euklidischen Geometrie
genutzt. Die Funktionen dafür werden von Pts bereitgestellt und sollen
hier nicht weiter vertieft werden.\
  Der Weg von $\vec{O}$ des Lichtstrahls bis zum Schnittpunkt $\vec{E}$
wird als Lichtweg gespeichert und später visualisiert. Aus der Kollision
mit dem Hindernis und dem entsprechenden Material können weitere
Lichtstrahlen resultieren. Diese Lichtstrahlen durchlaufen den gleichen
Prozess wie der erste Lichtstrahl. Daher wird die Funktion als rekursive
Funktion verwendet und mit den jeweils neuen Lichtstrahlen erneut
aufgerufen.

::: verbnobox
const calculateTraceLines = ( currentRay: Ray, lines: PtIterable\[\],
depth: number ): PtIterable\[\] =>

// Prevent infinite reflections if (depth \>= MAX_TRACE_DEPTH) return
lines;

// Get all collisions const allCollisions = getAllCollisions(currentRay,
obstacles);

// Get best collision const collision = getFirstCollision(allCollisions,
currentRay.origin);

// Return the lines and the current ray if not collision is found if
(!collision) return \[\...lines, rayToPts(currentRay)\];

const intersection, collider, obstacle = collision;

// Get new rays resulting of the collision const newRays =
obstacle.material.handleCollision(intersection, collider, currentRay,
obstacle);

// Trace new rays return newRays .map((ray) => return
calculateTraceLines(ray, \[\...lines, \[currentRay.origin,
intersection\]\], depth + 1); ) .flat();

;
:::

## Berechnung der Reflexion

Bei dem Material des Spiegels wird für jeden eintreffenden Lichtstrahl
ein neuer Lichtstrahl mit verändertem Winkel zurückgegeben. Hierbei gilt
das Fermat'sche-Prinzip [vgl. @hering2017optik S. 20].

### An einer Linie {#an-einer-linie .unnumbered}

Das Hindernis der Linie kann als eine ebene Grenzfläche angenommen
werden. Demnach ist der Betrag des Einfallswinkels $\varepsilon$
relative zum Lot der Grenzfläche gleich mit dem Reflexionswinkel
$\varepsilon_r$. $$-\varepsilon = \varepsilon_r$$

![Reflexion eines Lichtstrahls an einer Linie in der Simulation\
 Quelle: Eigene Darstellung](line-reflection.png){width="50%"}

Es gilt daher zunächst das Lot der Linie zu berechnen. Das Lot ist
orthogonal zur Linie. Es kann berechnet werden, indem der Vektor der
Linie in zwei Teile zerlegt wird. [vgl. @greve2006raytracing S. 1]

::: verbnobox
/\*\* Calculate the normal point of a line \*/ const getLineNormal =
(line: PtIterable): Readonly\<Pt> => const normalAngle =
line\[0\].$subtract(line[1]).angle() + Math.PI / 2;
    return new Pt(0, 1).toAngle(normalAngle).$unit(); ;
:::

Mit dem Lot $\vec{N}$ und dem Einfallsvektor $\vec{E}$ lässt sich nun
der Reflexionsvektor $\vec{R}$ berechnen. [vgl. @cross2013raytracing
Kapitel 10] $$\label{reflexion}
    \vec{R} = \vec{E} - (\vec{E} \cdot \vec{N})\vec{N}$$ Gleichung
[\[reflexion\]](#reflexion){reference-type="ref" reference="reflexion"}
implementiert, sieht wie folgt aus und gibt den neuen reflektierten
Lichtstrahl zurück. Die Klasse `Vec` ist von Pts bereitgestellt und
beinhaltet Operationen der Vektormathematik.

::: verbnobox
/\*\* Calculate the reflected ray of an incoming ray with the angle d to
a line on a point \*/ const getReflectedRayOnLine = ( incidentRay: Ray,
line: PtIterable, collisionPoint: Pt ): Readonly\<Ray> =>

const d = new Pt(1, 0).toAngle(incidentRay.angle); const lineNormal =
getLineNormal(line);

const perpendicular = 2 \* Vec.dot(d, lineNormal); const reflection =
Vec.subtract(d, Vec.multiply(lineNormal, perpendicular)); const r = new
Pt(reflection);

return createRay(collisionPoint, r.angle());

;
:::

### An einem Kreis {#an-einem-kreis .unnumbered}

Ein Kreis kann als Konvexspiegel mit dem Mittelpunkt $M$ und dem
Brennpunkt $F$ angesehen werden. [vgl. @kuchling2004taschenbuch S. 362]
Wobei bei einem Kreis Folgendes gilt: $$\label{mequalf}
    M = F$$ [\[mequalf\]](#mequalf){reference-type="ref"
reference="mequalf"} nach ergibt sich für den Reflexionsvektor $\vec{R}$
mit dem Mittelpunkt $\vec{M}$ und dem Schnittpunkt $\vec{E}$ folgende
Gleichung: $$\label{circlereflexion}
    \vec{R} = \vec{E} - \vec{M}$$ Um Gleichung
[\[circlereflexion\]](#circlereflexion){reference-type="ref"
reference="circlereflexion"} zu implementieren genügt lediglich
folgender Quellcode:

![Reflexion eines Lichtstrahls an einem Kreis in der Simulation\
 Quelle: Eigene Darstellung](circle-reflection.png){width="50%"}

# Zusatz: Komplexe Umgebungen {#zusatz-komplexe-umgebungen .unnumbered}

Im Folgenden sollen komplexere Umgebungen und deren Resultat in der
Simulation demonstriert werden. Weitere interaktive Beispiele sind
online[^5] aufzufinden.

### Parabolischer Reflektor {#parabolischer-reflektor .unnumbered}

Bei einem parabolischen Reflektor handelt es sich um einen
Konkavspiegel. [vgl. @kuchling2004taschenbuch S. 362]. Senkrecht
einfallende Strahlen werden hierbei zu einem Brennpunkt reflektiert.

::: verbnobox
/\*\* \* Reflections of multiple rays on a parabolic reflector \*/
export const parabolic: Scene = (space) => const form = space.getForm();
const world = createWorld(); for (let i = 0; i \< 10; i++)
world.addSource('ray' + i, createRay(new Pt(500 + 40 \* i, 0), Math.PI
\* 2.5)); world.addObstacle( 'reflector', createCurve(new Pt(480 + 5 \*
40, 500), f: (x) => (x / 10) \*\* 2, scale: 6, material: mirror ) );
world.update(); space.add(() => world.draw(form)).playOnce(); ;
:::

![Reflexion mehrerer Lichtstrahlen an einem parabolischen Reflektor\
 Quelle: Eigene Darstellung](parabolic.png){width="\\textwidth"}

### Feld von Kreisen {#feld-von-kreisen .unnumbered}

Bei einer großen Anzahl an Kreisen entwickeln sich sehr schnell viele
Reflexionen. Eine Art Stress-Test für die Simulation.

::: verbnobox
export const circleChaos: Scene = (space) =>

const form = space.getForm(); const world = createWorld(); space.add(

start: (bound) =>

const pts = Create.distributeRandom(bound, 30); pts.forEach((pt, i) =>
world.addObstacle('circle' + i, createCircle(pt, material: mirror,
radius: 60 )); );

world.addSource('dynamic-ray', createRay(space.center, Const.pi));

); space.playOnce();

;
:::

![Reflexion eines Lichtstrahls an vielen Kreisen\
 Quelle: Eigene Darstellung](chaos.png){width="\\textwidth"}

# Fazit

Es ist faszinierend, wie sich in der geometrischen Optik aus simpelsten
Regeln schnell spannendes und komplexes Verhalten entwickeln kann. Damit
zu experimentieren wäre ohne die Assistenz einer Computer-Simulation nur
schwer möglich.

Die aktuelle Version wird mir eine große Hilfe sein, wenn ich in meiner
Facharbeit das komplexe Verhalten von Lichtstrahlen im Bezug auf die
Chaos-Theorie behandeln werde. Dennoch ist diese Simulation noch weit
davon entfernt, vollständig zu sein. Dank der Separierung von Hindernis
und Material ist eine Erweiterung im Bezug auf die Brechung von Licht
und weiteren Phänomenen einfach möglich. Aber auch die aktuelle Version
kann noch optimiert werden. So ist die Performance bei vielen
Lichtstrahlen und/oder Hindernissen nicht sonderlich gut. Hier gilt es
in Zukunft vor allem das Testen auf Schnittpunkte zu optimieren.

[^1]: https://kit.svelte.dev

[^2]: https://ptsjs.org

[^3]: https://github.com/b3ngg/ray-optics-simulation

[^4]: https://optics.b3n.gg

[^5]: https://optics.b3n.gg