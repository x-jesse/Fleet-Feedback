import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { World, Body, Box, Plane, Vec3 } from 'cannon-es';
import { HttpClient } from '@angular/common/http';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


@Component({
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.less']
})
export class ViewComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private world!: World;

  private car1!: THREE.Group;
  private car2!: THREE.Group;
  private car1Body!: Body;
  private car2Body!: Body;
  private road!: THREE.Mesh;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.initCannonJS();
    this.animate();
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5).normalize();
    this.scene.add(light);
    this.scene.background = new THREE.Color('white');

    // Add a road (a simple plane)
    const roadGeometry = new THREE.PlaneGeometry(50, 10);
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.road = new THREE.Mesh(roadGeometry, roadMaterial);
    this.road.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
    this.road.position.y = 0; // Set it to y = 0, matching the Cannon.js setup
    this.scene.add(this.road);

    // Load car models
    const loader = new GLTFLoader();
    loader.load('car/scene.gltf', (gltf: any) => {
      this.car1 = gltf.scene;
      this.car1.position.set(0, 0.5, 0); // Set initial position
      this.car1.scale.set(0.5, 0.5, 0.5); // Adjust scale if necessary
      this.car1.rotation.y = Math.PI / 2; // Rotate car1 by 90 degrees around the y-axis
      this.scene.add(this.car1);
      console.log(this.car1);
    });

    loader.load('car/scene.gltf', (gltf: any) => {
      this.car2 = gltf.scene;
      this.car2.position.set(5, 0.5, 0); // Set initial position
      this.car2.scale.set(0.5, 0.5, 0.5); // Adjust scale if necessary
      this.car2.rotation.y = Math.PI / 2; // Rotate car2 by 90 degrees around the y-axis
      this.scene.add(this.car2);
    });
  }

  private initCannonJS(): void {
    this.world = new World();
    this.world.gravity.set(0, -2, 0);

    // Create the road as a static body
    const roadBody = new Body({ mass: 0 }); // mass = 0 makes it static
    const roadShape = new Plane();
    roadBody.addShape(roadShape);
    roadBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to be horizontal
    this.world.addBody(roadBody);

    // Create car bodies (approximating car models with boxes for physics)
    this.car1Body = new Body({ mass: 1500 });
    this.car1Body.addShape(new Box(new Vec3(1, 0.5, 2)));
    this.car1Body.position.set(-10, 0.5, 0);
    this.car1Body.quaternion.setFromEuler(0, Math.PI / 2, 0); // Rotate car1 body by 90 degrees around the y-axis
    this.world.addBody(this.car1Body);

    this.car2Body = new Body({ mass: 1500 });
    this.car2Body.addShape(new Box(new Vec3(1, 0.5, 2)));
    this.car2Body.position.set(5, 0.5, 0);
    this.car2Body.quaternion.setFromEuler(0, Math.PI / 2, 0); // Rotate car2 body by 90 degrees around the y-axis
    this.world.addBody(this.car2Body);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Move the vehicles (e.g., moving car1 towards car2)
    this.car1Body.position.x += 0.05;

    // Update Three.js objects to match Cannon.js bodies
    if (this.car1) {
      this.car1.position.copy(this.car1Body.position as unknown as THREE.Vector3);
      this.car1.quaternion.copy(this.car1Body.quaternion as unknown as THREE.Quaternion);
    }

    if (this.car2) {
      this.car2.position.copy(this.car2Body.position as unknown as THREE.Vector3);
      this.car2.quaternion.copy(this.car2Body.quaternion as unknown as THREE.Quaternion);
    }

    this.world.step(1 / 60);
    this.renderer.render(this.scene, this.camera);
  }
}
