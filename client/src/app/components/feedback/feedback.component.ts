import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Message {
  title: string;
  issue: string;
  tips: string;
  evidence: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.less',
})
export class FeedbackComponent implements OnInit, OnChanges {
  @Input() eventType!: string;
  feedbackMessage: Message = {
    title: "default",
    issue: "",
    tips: "",
    evidence: ""
  };
  feedbackMessages: { [key: string]: Message } = {
    tailgating: {
      title: 'Tailgating',
      issue:
        'Tailgating reduces reaction time and increases the risk of collisions.',
      tips: "Maintain at least a three-second following distance under normal conditions. Increase this distance in adverse weather or poor road conditions. Use the 3-second rule: pick a stationary object on the road, and ensure there's a 3-second gap between the vehicle ahead passing the object and your vehicle doing the same.",
      evidence:
        'According to the NHTSA, rear-end collisions account for nearly 23% of all crashes, often caused by following too closely. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
    cellPhoneUse: {
      title: 'Cell Phone Use',
      issue:
        'Using a cell phone while driving diverts your attention and significantly increases the risk of accidents.',
      tips: 'Use hands-free devices if you must take a call. Better yet, pull over safely before using your phone. Utilize "Do Not Disturb" modes or apps that block notifications while you drive.',
      evidence:
        'The NHTSA reports that distracted driving claimed 3,142 lives in 2019. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
    laneDepartureWarning: {
      title: 'Lane Departure Warning',
      issue:
        'Failing to stay in your lane can lead to serious accidents, including head-on collisions.',
      tips: 'Utilize lane-keeping assist technology if your vehicle has it. Perform regular vehicle maintenance to ensure systems work correctly. Stay aware of your surroundings and avoid distractions.',
      evidence:
        'Vehicles equipped with lane-keeping assist reported a 25% reduction in lane-departure accidents. Source: [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).',
    },
    driverSeatbeltUndone: {
      title: 'Driver Seatbelt Undone',
      issue:
        'Wearing a seatbelt reduces the risk of fatal injury to front-seat passengers by 45%.',
      tips: 'Develop a habit of putting on your seatbelt as soon as you sit in the vehicle. Ensure all passengers are also buckled up before driving. Implement seatbelt warning systems if available.',
      evidence:
        'Seatbelt usage rates have been linked to a 45-60% reduction in fatalities during crashes. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
    smoking: {
      title: 'Smoking',
      issue:
        'Smoking while driving can be a dangerous distraction, taking your hands off the wheel and your eyes off the road.',
      tips: 'Plan to smoke before starting your drive or after arriving at your destination. Keep your vehicle smoke-free to reduce temptation.',
      evidence:
        'Drivers who refrain from smoking while driving can reduce their risk of accidents by up to 15%.',
    },
    distractedDrivingFoodAndDrink: {
      title: 'Distracted Driving (Food and Drink)',
      issue:
        'Eating or drinking while driving can distract you and reduce your reaction time.',
      tips: 'Pull over to a safe location if you need to eat or drink to ensure your full attention is on driving. Prepare snacks and drinks before your journey and consume them during breaks. Use spill-proof containers to avoid accidents and lessen the need for immediate clean-ups.',
      evidence:
        'Drivers who avoid eating and drinking while driving see a reduction in near-miss incidents by up to 10%.',
    },
    possibleDriverFatigue: {
      title: 'Possible Driver Fatigue',
      issue:
        'Fatigued driving is as dangerous as drunk driving. Falling asleep at the wheel is a leading cause of severe accidents.',
      tips: 'Take breaks every two hours or 100 miles during long trips. Avoid driving during hours you would typically be asleep. Share driving responsibilities on long journeys.',
      evidence:
        'Resting adequately before driving has shown to reduce fatigue-related accidents by up to 30%. Source: [National Sleep Foundation](https://www.sleepfoundation.org/).',
    },
    rollingStop: {
      title: 'Rolling Stop',
      issue: 'A rolling stop at a stop sign can lead to collisions.',
      tips: 'Always come to a complete stop at stop signs, and look left, right, and then left again before proceeding. Educate on the dangers of rolling stops through training videos or sessions.',
      evidence:
        'According to the IIHS, failure to stop at stop signs contributes to about 70% of fatal crashes at stop-controlled intersections. Make a complete stop to ensure the intersection is clear and safe before proceeding. Source: [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).',
    },
    nearCollisionWarning: {
      title: 'Near Collision Warning',
      issue:
        'Near collisions indicate risky driving behavior that could lead to accidents.',
      tips: 'Review driving practices and identify high-risk behaviors. Take corrective training courses to improve reaction times and hazard recognition. Use driver feedback systems to alert you in real-time.',
      evidence:
        'Implementing driver feedback systems can reduce near-collision warnings by up to 20%, fostering a safer driving environment. Source: [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).',
    },
    redLightTrafficViolation: {
      title: 'Red Light Traffic Violation',
      issue:
        'Running a red light is one of the most dangerous traffic violations, often leading to severe accidents.',
      tips: 'Approach intersections with caution and be prepared to stop. Use traffic light timing knowledge to anticipate light changes. Install red light cameras where violations are frequent.',
      evidence:
        'The IIHS reports that red light running caused 846 deaths and 143,000 injuries in 2019. Always stop on red to keep intersections safe. Cities with red-light cameras see a 21% reduction in the fatality rate from red-light running crashes. Source: [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).',
    },
    dashedLineViolation: {
      title: 'Dashed Line Violation',
      issue:
        'Crossing a dashed line without proper caution can result in accidents.',
      tips: 'Use your turn signals well in advance of your lane change. Check your mirrors and blind spots before maneuvering. Avoid lane changes in heavy traffic.',
      evidence:
        'According to the NHTSA, improper lane changes contribute to 4% of all crashes. Proper lane-changing techniques can reduce accidental lane changes by up to 30%. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
    solidLineViolation: {
      title: 'Solid Line Violation',
      issue:
        'Crossing a solid line is illegal and dangerous, indicating areas where lane changes are unsafe.',
      tips: 'Be mindful of road markings and obey traffic laws. Avoid unnecessary lane changes and only cross dashed lines when safe. Use lane departure warning systems if available.',
      evidence:
        'The NHTSA reports that improper lane changes and lane departures account for 10% of all crashes. Adhering to road markings can reduce lane departure incidents by up to 25%. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
    yellowLightTrafficViolation: {
      title: 'Yellow Light Traffic Violation',
      issue: 'Rushing through a yellow light can lead to accidents.',
      tips: 'Reduce speed and anticipate stopping when approaching intersections with yellow lights. Understand that yellow means prepare to stop, not speed up.',
      evidence:
        'According to the IIHS, nearly 50% of fatal intersection crashes involve drivers running red lights or failing to yield at yellow lights. Observing yellow light rules can reduce intersection collisions by up to 20%. Source: [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).',
    },
    pedestrianCollisionWarning: {
      title: 'Pedestrian Collision Warning',
      issue:
        'Failing to yield to pedestrians can result in serious accidents and fatalities.',
      tips: 'Always yield to pedestrians at crosswalks and be vigilant in areas with high pedestrian traffic. Slow down and prepare to stop in school zones and residential areas.',
      evidence:
        'Implementing pedestrian safety measures can reduce pedestrian-related accidents by up to 30%. Source: [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/).',
    },
  };

  ngOnInit(): void {
    if (this.eventType) {
      this.setFeedbackMessage(this.eventType);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // React to changes in the eventType input property
    if (changes['eventType'] && changes['eventType'].currentValue) {
      this.setFeedbackMessage(changes['eventType'].currentValue);
    }
  }

  private setFeedbackMessage(eventType: string): void {
    this.feedbackMessage = this.feedbackMessages[eventType] ?? null;
  }
}
