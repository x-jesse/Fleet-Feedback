# Geotab IIC
- existing solutions don't leverage video telematics
- existing solutions don't have a focus on providing feedback and facilitating improvement
    - they mainly focus on passive monitoring, compared to iterative feedback/improvement
- existing solutions don't have a large focus on AI

We want to focus on establishing a path of improvement by providing dynamic and personalized feedback to drivers.

Some things to include:

- driver feedback so they can learn from their mistakes
- collision detection/reconstruction

## Technical Design:
Web Application:
Build a full-stack web app using MongoDB, Express, Angular, Node that will serve as our UI
UI should include educational feedback/training for drivers
Should include trip timeline to show exactly when and where incidents occurred, and what the incidents were (mygeotab does this, we can pull video + telematics from there)
Each incident should display separately in the UI, optionally include a table view separately from the timeline to list all incidents
Also list all trips so users can access trips individually
Should also incl some form of user authentication
Database Schema:
Trips:
Times
Locations
Incidents/collisions (should also say what type of inc. they were)
Driver
Vehicle
Video
Need to use CV + object detection + distance detection to correctly place elements in environment
We mainly care about the driver’s vehicle, other vehicles hit, and potential road/traffic signs
Can estimate other vehicle’s velocity based on video footage
Use face blurring to censor faces
Accident Reconstruction
Use three.js to construct 3D model based on extracted data


Pros:
Having a 3D render provides a better visualization and more opportunity for analysis/feedback
GEOTAB DOES NOT HAVE ACCIDENT RECONSTRUCTION (they mainly use telematics data, not video, and they def do not have 3D renders of accidents)
Cons
Third parties may have it implemented already
Errors in physics simulation may cause inaccuracies
Accuracy suffers if the colliding vehicles make/model cannot be identified
Accuracy suffers even more if the video footage is insufficient/accident does not appear on video


Potential Considerations
Using “century mode” ie taking pictures while engine off to maintain some sort of monitoring while vehicle is parked
Incl. driver facing camera for monitoring driver

## Technical Design

### Web Application
- Build a full-stack web app using MongoDB, Express, Angular, and Node that will serve as our UI.
- The UI should include:
  - Educational feedback/training for drivers.
  - A trip timeline to show exactly when and where incidents occurred, and what the incidents were (similar to MyGeotab; we can pull video and telematics from there).
  - Each incident should be displayed separately in the UI. Optionally include a table view separate from the timeline to list all incidents.
  - A list of all trips so users can access trips individually.
  - Some form of user authentication.

### Database Schema

- **Trips**
  - Times
  - Locations
  - Incidents/Collisions (should also specify the type of incidents)
  - Driver
  - Vehicle
  - Video
    - Need to use Computer Vision (CV), object detection, and distance detection to correctly place elements in the environment.
    - Focus on the driver’s vehicle, other vehicles hit, and potential road/traffic signs.
    - Estimate other vehicle’s velocity based on video footage.
    - Use face blurring to censor faces.

### Accident Reconstruction

- Use Three.js to construct a 3D model based on extracted data.

#### Pros
- A 3D render provides better visualization and more opportunities for analysis and feedback.
- GEOTAB does not have accident reconstruction (they mainly use telematics data, not video, and do not have 3D renders of accidents).

#### Cons
- Third parties may already have similar implementations.
- Errors in physics simulation may cause inaccuracies.
- Accuracy suffers if the colliding vehicles' make/model cannot be identified.
- Accuracy suffers even more if the video footage is insufficient or if the accident does not appear on video.

### Potential Considerations
- Using “century mode,” i.e., taking pictures while the engine is off to maintain some form of monitoring while the vehicle is parked.
- Including a driver-facing camera for monitoring the driver.


## Scoring

CSA scores are based on violations, however we can also quantify things that drivers are doing well by leveraging video telematics, and additionally compare them to the average across the entire fleet.

## Development

>Built on MEAN (MongoDB, Express, Angular, Node) stack.


